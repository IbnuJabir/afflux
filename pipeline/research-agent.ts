#!/usr/bin/env npx tsx
/**
 * Product Research Agent
 * 
 * Uses browser automation to search Amazon and extract high-potential
 * affiliate products for blog content.
 * 
 * Outputs a JSON file with product data and article suggestions
 * that the writing pipeline can consume.
 */

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

// Product research categories with Amazon URLs
const RESEARCH_CATEGORIES = [
  {
    name: "Electronics - Headphones",
    url: "https://www.amazon.com/gp/bestsellers/electronics/12097479011",
    commission: "4%",
    priority: "HIGH",
  },
  {
    name: "Office Products - Desk Accessories", 
    url: "https://www.amazon.com/gp/bestsellers/office-products/1069626",
    commission: "5%",
    priority: "HIGH",
  },
  {
    name: "Software",
    url: "https://www.amazon.com/gp/bestsellers/software",
    commission: "5%",
    priority: "HIGH",
  },
  {
    name: "Computers - Monitors",
    url: "https://www.amazon.com/gp/bestsellers/computers/1292115011",
    commission: "4%",
    priority: "MEDIUM",
  },
  {
    name: "Home & Kitchen - Smart Home",
    url: "https://www.amazon.com/gp/bestsellers/hi/6563140011",
    commission: "4%",
    priority: "MEDIUM",
  },
];

interface ProductData {
  name: string;
  price: string;
  rating: string;
  reviewCount: string;
  url: string;
  imageUrl: string;
  category: string;
  affiliatePotential: "HIGH" | "MEDIUM" | "LOW";
}

interface ResearchResult {
  researchDate: string;
  productsFound: number;
  products: ProductData[];
  suggestedArticles: {
    type: string;
    title: string;
    products: string[];
    category: string;
  }[];
}

function runBrowserCommand(command: string): string {
  try {
    const result = execSync(command, {
      encoding: "utf-8",
      timeout: 60000,
      cwd: process.cwd(),
    });
    return result;
  } catch (error) {
    console.error(`Browser command failed: ${command}`);
    return "";
  }
}

function wait(ms: number): void {
  execSync(`sleep ${ms / 1000}`);
}

async function scrapeCategory(category: typeof RESEARCH_CATEGORIES[0]): Promise<ProductData[]> {
  console.log(`\n📦 Scraping: ${category.name}`);
  
  const products: ProductData[] = [];
  
  // Open the category page
  runBrowserCommand(`agent-browser open "${category.url}"`);
  wait(3000);
  runBrowserCommand(`agent-browser wait --load networkidle`);
  
  // Take snapshot to see what's available
  const snapshot = runBrowserCommand(`agent-browser snapshot -i`);
  
  // Try to extract product information using JavaScript evaluation
  const extractScript = `
    JSON.stringify(
      Array.from(document.querySelectorAll('[data-asin]'))
        .slice(0, 10)
        .map(el => {
          const nameEl = el.querySelector('span.a-size-medium, span.a-size-base-plus, .p13n-sc-truncate-desktop-type2');
          const priceEl = el.querySelector('.p13n-sc-price, span.a-price span.a-offscreen');
          const ratingEl = el.querySelector('.a-icon-alt, span[aria-label*="star"]');
          const reviewEl = el.querySelector('span.a-size-small, span[aria-label*="ratings"]');
          const linkEl = el.querySelector('a.a-link-normal[href*="/dp/"]');
          const imgEl = el.querySelector('img');
          
          return {
            asin: el.dataset.asin || '',
            name: nameEl?.textContent?.trim() || '',
            price: priceEl?.textContent?.trim() || '',
            rating: ratingEl?.textContent?.trim()?.match(/[\\d.]+/)?.[0] || '',
            reviewCount: reviewEl?.textContent?.trim() || '',
            url: linkEl?.href || '',
            imageUrl: imgEl?.src || ''
          };
        })
        .filter(p => p.asin && p.name)
    )
  `;
  
  try {
    // Use heredoc to avoid shell escaping issues
    const scriptFile = "/tmp/extract-products.js";
    fs.writeFileSync(scriptFile, extractScript);
    
    const evalResult = runBrowserCommand(`agent-browser eval --stdin < ${scriptFile}`);
    
    if (evalResult) {
      const rawProducts = JSON.parse(evalResult);
      
      for (const p of rawProducts) {
        if (p.name && p.asin) {
          products.push({
            name: p.name.substring(0, 100),
            price: p.price || "N/A",
            rating: p.rating || "N/A",
            reviewCount: p.reviewCount || "N/A",
            url: p.url || `https://www.amazon.com/dp/${p.asin}`,
            imageUrl: p.imageUrl || "",
            category: category.name,
            affiliatePotential: category.priority as "HIGH" | "MEDIUM" | "LOW",
          });
        }
      }
    }
  } catch (error) {
    console.error(`Failed to extract products from ${category.name}:`, error);
  }
  
  console.log(`   Found ${products.length} products`);
  wait(2000); // Rate limiting
  
  return products;
}

function generateArticleSuggestions(products: ProductData[]): ResearchResult["suggestedArticles"] {
  const suggestions: ResearchResult["suggestedArticles"] = [];
  
  // Group products by category
  const byCategory = products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, ProductData[]>);
  
  // Generate comparison articles for each category
  for (const [category, categoryProducts] of Object.entries(byCategory)) {
    if (categoryProducts.length >= 3) {
      const top3 = categoryProducts.slice(0, 3);
      const shortCategory = category.split(" - ").pop() || category;
      
      suggestions.push({
        type: "comparison",
        title: `Best ${shortCategory} 2025: Top ${top3.length} Picks Compared`,
        products: top3.map(p => p.name.substring(0, 50)),
        category: shortCategory.toLowerCase().replace(/\s+/g, "-"),
      });
    }
    
    // Individual review for top product
    if (categoryProducts.length > 0) {
      const topProduct = categoryProducts[0];
      suggestions.push({
        type: "review",
        title: `${topProduct.name.substring(0, 60)} Review: Is It Worth It?`,
        products: [topProduct.name.substring(0, 50)],
        category: category.split(" - ").pop()?.toLowerCase().replace(/\s+/g, "-") || "general",
      });
    }
  }
  
  return suggestions;
}

async function main() {
  console.log("🔍 Starting Product Research Agent...\n");
  console.log("📚 Reading guidelines from RESEARCH_GUIDELINES.md");
  
  const allProducts: ProductData[] = [];
  
  // Select 2-3 random categories to research (avoid doing all every time)
  const shuffled = [...RESEARCH_CATEGORIES].sort(() => Math.random() - 0.5);
  const selectedCategories = shuffled.slice(0, 3);
  
  console.log(`\n🎯 Selected categories for this run:`);
  selectedCategories.forEach(c => console.log(`   - ${c.name}`));
  
  // Initialize browser
  console.log("\n🌐 Starting browser...");
  runBrowserCommand(`agent-browser close 2>/dev/null || true`);
  wait(1000);
  
  // Scrape each category
  for (const category of selectedCategories) {
    const products = await scrapeCategory(category);
    allProducts.push(...products);
  }
  
  // Close browser
  console.log("\n🔒 Closing browser...");
  runBrowserCommand(`agent-browser close`);
  
  // Generate article suggestions
  console.log("\n📝 Generating article suggestions...");
  const suggestions = generateArticleSuggestions(allProducts);
  
  // Create research result
  const result: ResearchResult = {
    researchDate: new Date().toISOString().split("T")[0],
    productsFound: allProducts.length,
    products: allProducts,
    suggestedArticles: suggestions,
  };
  
  // Save to file
  const outputPath = path.join(__dirname, "research-output.json");
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  
  console.log(`\n✅ Research complete!`);
  console.log(`   Products found: ${result.productsFound}`);
  console.log(`   Article suggestions: ${result.suggestedArticles.length}`);
  console.log(`   Output saved to: ${outputPath}`);
  
  // Print summary
  console.log("\n📊 Article Suggestions:");
  for (const article of result.suggestedArticles.slice(0, 5)) {
    console.log(`   - [${article.type}] ${article.title}`);
  }
  
  // Output JSON for pipeline consumption
  console.log("\n---RESEARCH_START---");
  console.log(JSON.stringify(result));
  console.log("---RESEARCH_END---");
}

main().catch(console.error);
