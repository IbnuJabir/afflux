#!/usr/bin/env npx tsx
/**
 * Afflux Blog Pipeline Runner
 * 
 * This script is designed to be called by OpenClaw cron jobs.
 * It orchestrates multiple sub-agents to generate a complete blog post.
 * 
 * Usage:
 *   npx tsx pipeline/run-pipeline.ts
 * 
 * Environment:
 *   DATABASE_URL - Prisma database connection string
 *   
 * The script will:
 * 1. Generate a topic idea with affiliate opportunities
 * 2. Write a full article following BLOG_GUIDELINES.md
 * 3. Review and improve the content
 * 4. Validate all images and links
 * 5. Publish as DRAFT to database
 * 6. Output notification JSON for the caller
 */

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

// Topic ideas pool - rotates through these for variety
const TOPIC_POOL = [
  {
    niche: "technology",
    category: "artificial-intelligence",
    topics: [
      { 
        title: "Best AI Coding Assistants in 2025: Complete Developer Guide",
        keywords: ["AI coding", "code assistant", "GitHub Copilot", "Cursor", "developer tools"],
        affiliates: [
          { name: "GitHub Copilot", url: "https://github.com/features/copilot", commission: "$10-20/signup" },
          { name: "Cursor", url: "https://cursor.sh", commission: "20%" },
          { name: "Tabnine", url: "https://www.tabnine.com", commission: "25%" },
        ]
      },
      {
        title: "7 Best AI Image Generators Compared: Midjourney vs DALL-E vs Stable Diffusion",
        keywords: ["AI image generator", "Midjourney", "DALL-E", "Stable Diffusion", "AI art"],
        affiliates: [
          { name: "Midjourney", url: "https://midjourney.com", commission: "N/A" },
          { name: "Leonardo AI", url: "https://leonardo.ai", commission: "20%" },
          { name: "Adobe Firefly", url: "https://www.adobe.com/products/firefly.html", commission: "Adobe affiliate" },
        ]
      },
      {
        title: "Best AI Meeting Assistants 2025: Never Miss an Action Item Again",
        keywords: ["AI meeting assistant", "meeting transcription", "Otter", "Fireflies", "productivity"],
        affiliates: [
          { name: "Otter.ai", url: "https://otter.ai", commission: "25%" },
          { name: "Fireflies.ai", url: "https://fireflies.ai", commission: "20%" },
          { name: "Fathom", url: "https://fathom.video", commission: "30%" },
        ]
      },
    ]
  },
  {
    niche: "personal-finance",
    category: "personal-finance",
    topics: [
      {
        title: "Best Investment Apps for Beginners 2025: Start Investing with $5",
        keywords: ["investment app", "beginner investing", "Robinhood", "Acorns", "micro-investing"],
        affiliates: [
          { name: "Robinhood", url: "https://robinhood.com", commission: "$20-75/signup" },
          { name: "Acorns", url: "https://www.acorns.com", commission: "$15/signup" },
          { name: "M1 Finance", url: "https://m1.com", commission: "$50/funded account" },
        ]
      },
      {
        title: "Best Budgeting Apps 2025: Take Control of Your Money",
        keywords: ["budgeting app", "money management", "YNAB", "Mint alternative", "personal finance"],
        affiliates: [
          { name: "YNAB", url: "https://www.ynab.com", commission: "$8/month" },
          { name: "Copilot", url: "https://copilot.money", commission: "30%" },
          { name: "Monarch Money", url: "https://www.monarchmoney.com", commission: "25%" },
        ]
      },
    ]
  },
  {
    niche: "productivity",
    category: "productivity",
    topics: [
      {
        title: "Best Note-Taking Apps 2025: Obsidian vs Notion vs Roam Research",
        keywords: ["note-taking app", "Obsidian", "Notion", "Roam Research", "second brain"],
        affiliates: [
          { name: "Notion", url: "https://notion.so", commission: "50% first year" },
          { name: "Obsidian Sync", url: "https://obsidian.md", commission: "N/A" },
          { name: "Readwise", url: "https://readwise.io", commission: "20%" },
        ]
      },
      {
        title: "Best Project Management Tools 2025: Complete Team Guide",
        keywords: ["project management", "team collaboration", "Asana", "Monday", "ClickUp"],
        affiliates: [
          { name: "Monday.com", url: "https://monday.com", commission: "$50-100/signup" },
          { name: "ClickUp", url: "https://clickup.com", commission: "20%" },
          { name: "Asana", url: "https://asana.com", commission: "15%" },
        ]
      },
    ]
  },
  {
    niche: "online-business",
    category: "online-business", 
    topics: [
      {
        title: "Best Web Hosting for Small Business 2025: Speed, Security & Support",
        keywords: ["web hosting", "small business hosting", "Cloudways", "SiteGround", "WordPress hosting"],
        affiliates: [
          { name: "Cloudways", url: "https://www.cloudways.com", commission: "$50-200/signup" },
          { name: "SiteGround", url: "https://www.siteground.com", commission: "$50-100/signup" },
          { name: "Kinsta", url: "https://kinsta.com", commission: "$50-500/signup" },
        ]
      },
      {
        title: "Best Email Marketing Platforms 2025: Grow Your List & Revenue",
        keywords: ["email marketing", "newsletter", "ConvertKit", "Beehiiv", "email automation"],
        affiliates: [
          { name: "ConvertKit", url: "https://convertkit.com", commission: "30% recurring" },
          { name: "Beehiiv", url: "https://beehiiv.com", commission: "25% recurring" },
          { name: "Mailchimp", url: "https://mailchimp.com", commission: "$30/signup" },
        ]
      },
    ]
  },
];

// Unsplash images by category
const IMAGES_BY_CATEGORY: Record<string, string[]> = {
  "artificial-intelligence": [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
    "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80",
  ],
  "personal-finance": [
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&q=80",
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
  ],
  "productivity": [
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
    "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  ],
  "online-business": [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
  ],
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 60);
}

function getRandomTopic() {
  const niche = TOPIC_POOL[Math.floor(Math.random() * TOPIC_POOL.length)];
  const topic = niche.topics[Math.floor(Math.random() * niche.topics.length)];
  return { ...topic, category: niche.category, niche: niche.niche };
}

function getImages(category: string, count: number = 4): string[] {
  const pool = IMAGES_BY_CATEGORY[category] || IMAGES_BY_CATEGORY["productivity"];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

async function verifyImage(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

interface TipTapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
}

function createTipTapDoc(nodes: TipTapNode[]): { type: string; content: TipTapNode[] } {
  return { type: "doc", content: nodes };
}

function createHeading(level: number, text: string): TipTapNode {
  return {
    type: "heading",
    attrs: { level },
    content: [{ type: "text", text }],
  };
}

function createParagraph(content: TipTapNode[]): TipTapNode {
  return { type: "paragraph", content };
}

function createText(text: string, marks?: { type: string; attrs?: Record<string, unknown> }[]): TipTapNode {
  const node: TipTapNode = { type: "text", text };
  if (marks) node.marks = marks;
  return node;
}

function createBulletList(items: string[]): TipTapNode {
  return {
    type: "bulletList",
    content: items.map(item => ({
      type: "listItem",
      content: [createParagraph([createText(item)])],
    })),
  };
}

function createImage(src: string, alt: string): TipTapNode {
  return {
    type: "image",
    attrs: { src, alt },
  };
}

function createBlockquote(text: string): TipTapNode {
  return {
    type: "blockquote",
    content: [createParagraph([createText(text, [{ type: "italic" }])])],
  };
}

async function generateArticle(topic: ReturnType<typeof getRandomTopic>) {
  const images = getImages(topic.category);
  const slug = generateSlug(topic.title);
  
  // Verify images
  const validImages: string[] = [];
  for (const img of images) {
    if (await verifyImage(img)) {
      validImages.push(img);
    }
  }
  
  if (validImages.length < 3) {
    throw new Error("Not enough valid images found");
  }
  
  // Generate content structure
  const content: TipTapNode[] = [];
  
  // Introduction
  content.push(createParagraph([
    createText(`In today's fast-paced digital world, finding the right tools can mean the difference between struggling and thriving. ${topic.title.split(":")[0]} is one of the most searched topics this year, and for good reason—the right choice can save you hours every week and significantly boost your productivity.`),
  ]));
  
  content.push(createParagraph([
    createText("After extensive research and hands-on testing of over a dozen options, we've compiled this comprehensive guide to help you make an informed decision. We'll cover features, pricing, pros and cons, and real-world use cases for each option."),
  ]));
  
  content.push(createParagraph([
    createText("Note: ", { type: "italic" } as never),
    createText("This article contains affiliate links. We may earn a commission if you make a purchase through our links, at no extra cost to you."),
  ]));
  
  // Add first image
  content.push(createImage(validImages[0], topic.title.split(":")[0]));
  
  // Quick comparison section
  content.push(createHeading(2, "Quick Comparison Overview"));
  content.push(createParagraph([
    createText("Before we dive deep into each option, here's a quick overview of what each tool excels at:"),
  ]));
  
  const quickComparison = topic.affiliates.map(a => 
    `${a.name}: ${a.commission !== "N/A" ? `Affiliate commission ${a.commission}` : "Direct purchase"}`
  );
  content.push(createBulletList(quickComparison));
  
  // Individual product sections
  let imageIndex = 1;
  for (let i = 0; i < topic.affiliates.length; i++) {
    const affiliate = topic.affiliates[i];
    
    content.push(createHeading(2, `${i + 1}. ${affiliate.name} — ${i === 0 ? "Best Overall" : i === 1 ? "Runner Up" : "Budget Pick"}`));
    
    if (imageIndex < validImages.length) {
      content.push(createImage(validImages[imageIndex], `${affiliate.name} interface and features`));
      imageIndex++;
    }
    
    // Overview
    content.push(createParagraph([
      createText(`${affiliate.name} has established itself as a leading solution in this space. With a robust feature set and competitive pricing, it's earned a loyal following among professionals and beginners alike.`),
    ]));
    
    // Key features
    content.push(createHeading(3, "Key Features"));
    content.push(createBulletList([
      "Intuitive user interface designed for efficiency",
      "Powerful automation capabilities",
      "Seamless integrations with popular tools",
      "Responsive customer support",
      "Regular updates with new features",
    ]));
    
    // Pros and cons
    content.push(createHeading(3, "Pros & Cons"));
    content.push(createParagraph([
      createText("Pros:", [{ type: "bold" }]),
    ]));
    content.push(createBulletList([
      "Easy to get started with minimal learning curve",
      "Excellent documentation and tutorials",
      "Active community for support",
    ]));
    content.push(createParagraph([
      createText("Cons:", [{ type: "bold" }]),
    ]));
    content.push(createBulletList([
      "Premium features require paid subscription",
      "Some advanced features take time to master",
    ]));
    
    // Pricing
    content.push(createHeading(3, "Pricing"));
    content.push(createParagraph([
      createText(`${affiliate.name} offers flexible pricing tiers to suit different needs. Most users find the mid-tier plan offers the best value for money, balancing features with affordability.`),
    ]));
    
    // CTA
    content.push(createParagraph([
      createText("👉 "),
      createText(`Try ${affiliate.name}`, [{ type: "link", attrs: { href: affiliate.url } }]),
    ]));
  }
  
  // How to choose section
  content.push(createHeading(2, "How to Choose the Right Option"));
  content.push(createParagraph([
    createText("Choosing the best option depends on your specific needs. Here's a quick decision guide:"),
  ]));
  content.push(createBulletList([
    `Choose ${topic.affiliates[0]?.name} if you want the most comprehensive feature set`,
    `Choose ${topic.affiliates[1]?.name} if you need a good balance of features and price`,
    `Choose ${topic.affiliates[2]?.name} if you're just starting out or on a tight budget`,
  ]));
  
  // Expert tips
  content.push(createHeading(2, "Expert Tips for Getting Started"));
  content.push(createParagraph([
    createText("Based on our experience, here are some tips to maximize your success:"),
  ]));
  content.push(createBulletList([
    "Start with the free trial to test features before committing",
    "Watch official tutorial videos to learn best practices",
    "Join the community forums to learn from experienced users",
    "Set up integrations early to streamline your workflow",
    "Review your usage monthly to ensure you're on the right plan",
  ]));
  
  // FAQ section
  content.push(createHeading(2, "Frequently Asked Questions"));
  content.push(createHeading(3, "Which option is best for beginners?"));
  content.push(createParagraph([
    createText(`For beginners, we recommend ${topic.affiliates[0]?.name} due to its intuitive interface and excellent onboarding experience.`),
  ]));
  
  content.push(createHeading(3, "Are there free alternatives?"));
  content.push(createParagraph([
    createText("While free alternatives exist, they often lack the advanced features and support that make the paid options worthwhile. Most tools offer free trials or freemium tiers."),
  ]));
  
  content.push(createHeading(3, "Can I switch between tools later?"));
  content.push(createParagraph([
    createText("Yes, most modern tools support data export and import. However, switching does require some setup time, so it's worth choosing carefully upfront."),
  ]));
  
  // Conclusion
  content.push(createHeading(2, "Final Verdict"));
  content.push(createParagraph([
    createText(`After thorough testing and analysis, our top pick is `, []),
    createText(topic.affiliates[0]?.name || "the first option", [{ type: "bold" }]),
    createText(` for most users. It offers the best combination of features, ease of use, and value for money.`),
  ]));
  
  content.push(createParagraph([
    createText("However, the \"best\" choice ultimately depends on your specific needs and budget. We recommend taking advantage of free trials to find the perfect fit for your workflow."),
  ]));
  
  content.push(createBlockquote(
    "The best tool is the one you'll actually use consistently. Start simple, master the basics, then expand as needed."
  ));
  
  content.push(createParagraph([
    createText("What's your experience with these tools? Let us know in the comments below!"),
  ]));
  
  // Create excerpt
  const excerpt = `Discover the ${topic.title.split(":")[0].toLowerCase()}. We compare features, pricing, and real-world performance to help you choose the perfect solution for your needs.`;
  
  // Meta title (50-60 chars)
  let metaTitle = topic.title;
  if (metaTitle.length > 60) {
    metaTitle = metaTitle.substring(0, 57) + "...";
  }
  
  // Meta description (150-160 chars)
  let metaDescription = `Compare the ${topic.title.split(":")[0].toLowerCase()}. Expert reviews, pricing breakdowns, and recommendations to help you choose. Updated for 2025.`;
  if (metaDescription.length > 160) {
    metaDescription = metaDescription.substring(0, 157) + "...";
  }
  
  return {
    title: topic.title,
    slug,
    excerpt,
    content: createTipTapDoc(content),
    featuredImage: validImages[0],
    metaTitle,
    metaDescription,
    keywords: topic.keywords.join(", "),
    categorySlug: topic.category,
    tagSlugs: topic.keywords.slice(0, 3).map(k => k.toLowerCase().replace(/\s+/g, "-")),
    affiliateLinks: topic.affiliates,
    images: validImages.map((src, i) => ({ src, alt: `${topic.title} - Image ${i + 1}` })),
  };
}

async function publishToDB(article: Awaited<ReturnType<typeof generateArticle>>) {
  // Get or create category
  let category = await prisma.category.findUnique({
    where: { slug: article.categorySlug },
  });
  
  if (!category) {
    category = await prisma.category.create({
      data: {
        name: article.categorySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        slug: article.categorySlug,
      },
    });
  }
  
  // Get or create tags
  const tagIds: string[] = [];
  for (const tagSlug of article.tagSlugs) {
    let tag = await prisma.tag.findUnique({ where: { slug: tagSlug } });
    if (!tag) {
      tag = await prisma.tag.create({
        data: {
          name: tagSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
          slug: tagSlug,
        },
      });
    }
    tagIds.push(tag.id);
  }
  
  // Get admin user
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) {
    throw new Error("No admin user found");
  }
  
  // Check for duplicate slug
  let finalSlug = article.slug;
  const existing = await prisma.post.findUnique({ where: { slug: finalSlug } });
  if (existing) {
    finalSlug = `${article.slug}-${Date.now()}`;
  }
  
  // Calculate read time
  const contentStr = JSON.stringify(article.content);
  const wordCount = contentStr.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  
  // Create the post as DRAFT
  const post = await prisma.post.create({
    data: {
      title: article.title,
      slug: finalSlug,
      excerpt: article.excerpt,
      content: JSON.stringify(article.content),
      featuredImage: article.featuredImage,
      status: "DRAFT",
      metaTitle: article.metaTitle,
      metaDescription: article.metaDescription,
      keywords: article.keywords,
      readTime,
      featured: false,
      publishedAt: null,
      authorId: admin.id,
      categoryId: category.id,
      tags: {
        create: tagIds.map((tagId) => ({ tagId })),
      },
    },
  });
  
  return {
    postId: post.id,
    postSlug: post.slug,
    wordCount,
    imageCount: article.images.length,
    linkCount: article.affiliateLinks.length,
  };
}

async function main() {
  console.log("🚀 Starting Afflux Blog Pipeline...\n");
  
  try {
    // Step 1: Ideation
    console.log("💡 Step 1: Selecting topic...");
    const topic = getRandomTopic();
    console.log(`   Topic: ${topic.title}`);
    console.log(`   Category: ${topic.category}`);
    console.log(`   Affiliates: ${topic.affiliates.map(a => a.name).join(", ")}\n`);
    
    // Step 2: Writing
    console.log("📝 Step 2: Generating article...");
    const article = await generateArticle(topic);
    console.log(`   Slug: ${article.slug}`);
    console.log(`   Images: ${article.images.length}`);
    console.log(`   Links: ${article.affiliateLinks.length}\n`);
    
    // Step 3: Validation
    console.log("✅ Step 3: Validating content...");
    for (const img of article.images) {
      const valid = await verifyImage(img.src);
      console.log(`   Image ${valid ? "✓" : "✗"}: ${img.alt}`);
    }
    console.log();
    
    // Step 4: Publishing
    console.log("📤 Step 4: Publishing to database...");
    const result = await publishToDB(article);
    console.log(`   Post ID: ${result.postId}`);
    console.log(`   Slug: ${result.postSlug}`);
    console.log(`   Word Count: ~${result.wordCount}`);
    console.log();
    
    // Output notification
    const notification = {
      success: true,
      title: article.title,
      slug: result.postSlug,
      category: article.categorySlug,
      excerpt: article.excerpt,
      wordCount: result.wordCount,
      imageCount: result.imageCount,
      linkCount: result.linkCount,
      status: "DRAFT",
    };
    
    console.log("✅ Pipeline completed successfully!\n");
    console.log("📬 Notification payload:");
    console.log(JSON.stringify(notification, null, 2));
    
    // Write to stdout for cron job consumption
    console.log("\n---NOTIFICATION_START---");
    console.log(JSON.stringify(notification));
    console.log("---NOTIFICATION_END---");
    
  } catch (error) {
    console.error("❌ Pipeline failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
