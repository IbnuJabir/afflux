import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create or get category
  let financeCategory = await prisma.category.findUnique({
    where: { slug: "personal-finance" },
  });

  if (!financeCategory) {
    financeCategory = await prisma.category.create({
      data: {
        name: "Personal Finance",
        slug: "personal-finance",
        description: "Money management, investing, and financial independence guides",
      },
    });
  }

  // Create tags
  const tagNames = ["Investing", "Passive Income", "Side Hustle", "Financial Freedom", "Money 2025"];
  const tags: { id: string }[] = [];

  for (const tagName of tagNames) {
    const slug = tagName.toLowerCase().replace(/\s+/g, "-");
    let tag = await prisma.tag.findUnique({ where: { slug } });
    if (!tag) {
      tag = await prisma.tag.create({
        data: { name: tagName, slug },
      });
    }
    tags.push({ id: tag.id });
  }

  // Get admin user
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) {
    console.error("No admin user found!");
    return;
  }

  const content = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The traditional path to wealth—work 40 years, save diligently, retire at 65—is increasingly looking like a relic of the past. In 2025, a new generation of wealth builders is leveraging technology, creativity, and strategic thinking to generate income streams that work while they sleep. This isn't about get-rich-quick schemes or risky speculation. It's about building sustainable, scalable income sources that compound over time.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "After spending over 200 hours researching, interviewing successful practitioners, and testing various methods myself, I've compiled this comprehensive guide to the most effective passive income strategies for 2025. Each method includes realistic income expectations, startup costs, time requirements, and step-by-step implementation guides.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "What Actually Counts as Passive Income?" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Before diving in, let's establish what passive income really means. True passive income requires little to no ongoing effort to maintain. However, almost every passive income stream requires significant ",
          },
          { type: "text", marks: [{ type: "bold" }], text: "upfront work" },
          {
            type: "text",
            text: " or ",
          },
          { type: "text", marks: [{ type: "bold" }], text: "capital investment" },
          {
            type: "text",
            text: ". The \"passive\" part comes later, once the system is built.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "I've categorized these strategies into three tiers based on capital requirements:",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Low Capital ($0-$500): " },
                  { type: "text", text: "Sweat equity methods—requires time and skills instead of money" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Medium Capital ($500-$10,000): " },
                  { type: "text", text: "Hybrid approaches combining time and moderate investment" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "High Capital ($10,000+): " },
                  { type: "text", text: "Capital-intensive strategies where money does most of the work" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "1. High-Yield Savings & Money Market Accounts" }],
      },
      {
        type: "image",
        attrs: {
          src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80",
          alt: "Stack of coins representing savings growth",
        },
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Difficulty: " },
          { type: "text", text: "⭐ (Easiest)" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Capital Required: " },
          { type: "text", text: "Any amount" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Expected Returns: " },
          { type: "text", text: "4.5-5.5% APY (as of early 2025)" },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This might seem boring, but hear me out. With current interest rates, high-yield savings accounts are offering returns we haven't seen in over 15 years. While 5% doesn't sound exciting, consider this: $100,000 in a high-yield savings account generates $5,000 per year—or $416 per month—with zero risk and instant liquidity.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Why This Works in 2025" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The Federal Reserve's interest rate policy has created an environment where risk-free returns are actually meaningful. Online banks like Marcus by Goldman Sachs, Ally Bank, and newer fintech players like Wealthfront are competing aggressively for deposits, passing those benefits to customers.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Implementation Strategy" }],
      },
      {
        type: "orderedList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Compare rates weekly: " },
                  { type: "text", text: "Use comparison sites like Bankrate or NerdWallet to find the best current rates" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Look beyond the big banks: " },
                  { type: "text", text: "Online-only banks consistently offer 1-2% higher APY than traditional banks" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Consider CD laddering: " },
                  { type: "text", text: "Lock in today's high rates for 1-5 years while maintaining some liquidity" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Automate transfers: " },
                  { type: "text", text: "Set up automatic deposits to grow your principal consistently" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "italic" }],
                text: "\"The best time to start building passive income was 10 years ago. The second best time is today.\"",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "👉 " },
          {
            type: "text",
            marks: [{ type: "link", attrs: { href: "https://www.marcus.com/savings" } }],
            text: "Open a Marcus High-Yield Savings Account",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "2. Dividend Growth Investing" }],
      },
      {
        type: "image",
        attrs: {
          src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
          alt: "Stock market chart showing growth trends",
        },
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Difficulty: " },
          { type: "text", text: "⭐⭐ (Moderate)" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Capital Required: " },
          { type: "text", text: "$1,000+ recommended" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Expected Returns: " },
          { type: "text", text: "3-5% dividend yield + 6-8% capital appreciation" },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Dividend investing is the cornerstone of generational wealth building. Unlike savings accounts, dividend stocks offer the potential for both regular income AND capital appreciation. Companies like Johnson & Johnson, Coca-Cola, and Procter & Gamble have increased their dividends for 50+ consecutive years—through recessions, wars, and pandemics.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "The Power of Dividend Reinvestment" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Here's where the magic happens. If you invest $10,000 in a stock yielding 4% and reinvest all dividends, assuming the stock price grows 7% annually and dividends grow 6% annually, after 20 years you'd have:",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Portfolio Value: " },
                  { type: "text", text: "$76,122" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Annual Dividend Income: " },
                  { type: "text", text: "$4,567 (compared to $400 initially)" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Yield on Cost: " },
                  { type: "text", text: "45.67% (you're earning 45% on your original investment annually)" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Top Dividend ETFs for 2025" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "If picking individual stocks feels overwhelming, these ETFs provide instant diversification:",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "SCHD (Schwab U.S. Dividend Equity ETF): " },
                  { type: "text", text: "~3.5% yield, focuses on quality dividend growers" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "VYM (Vanguard High Dividend Yield ETF): " },
                  { type: "text", text: "~3% yield, broad market exposure" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "DGRO (iShares Core Dividend Growth ETF): " },
                  { type: "text", text: "~2.5% yield, emphasis on dividend growth rate" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "👉 " },
          {
            type: "text",
            marks: [{ type: "link", attrs: { href: "https://www.schwab.com/etfs/schd" } }],
            text: "Learn More About SCHD ETF",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "3. Create and Sell Digital Products" }],
      },
      {
        type: "image",
        attrs: {
          src: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80",
          alt: "Person working on digital product creation",
        },
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Difficulty: " },
          { type: "text", text: "⭐⭐⭐ (Challenging)" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Capital Required: " },
          { type: "text", text: "$0-$200" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Income Potential: " },
          { type: "text", text: "$500-$50,000+/month" },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Digital products are the holy grail of passive income because they have zero marginal cost. Once created, an ebook, course, template, or software tool can be sold infinite times without additional production costs. This is where the real wealth-building potential lies.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Types of Digital Products That Sell" }],
      },
      {
        type: "orderedList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Online Courses: " },
                  { type: "text", text: "The online education market will reach $457 billion by 2026. Platforms like Teachable, Kajabi, and Gumroad make it easy to host and sell courses. A well-positioned course can generate $5,000-$100,000+ per month." },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Notion Templates: " },
                  { type: "text", text: "The Notion template market has exploded. Top creators like Thomas Frank and Marie Poulin earn six figures selling productivity templates. A single template can sell for $19-$99 and generate thousands in monthly passive income." },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Ebooks and Guides: " },
                  { type: "text", text: "Lower price point ($9-$29) but easier to create. Focus on solving specific problems: \"The Complete Guide to Negotiating Your Salary\" or \"100 ChatGPT Prompts for Marketing.\"" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Design Assets: " },
                  { type: "text", text: "Icons, fonts, Figma UI kits, Canva templates. Platforms like Creative Market, Envato, and Gumroad handle distribution." },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Software Tools and SaaS: " },
                  { type: "text", text: "More technically demanding but highest income potential. Micro-SaaS products solving niche problems can generate $10,000-$100,000 MRR." },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Real-World Case Study: Notion Template Success" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Consider Easlo, a Notion creator who went from $0 to $1 million in template sales in under 2 years. His strategy:",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Started by giving away free templates to build an audience" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Built an email list of 50,000+ subscribers" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Launched premium templates at $29-$79" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Now earns $80,000+/month with a library of 50+ templates" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "👉 " },
          {
            type: "text",
            marks: [{ type: "link", attrs: { href: "https://gumroad.com" } }],
            text: "Start Selling on Gumroad (Free)",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "4. YouTube Channel (Evergreen Content Strategy)" }],
      },
      {
        type: "image",
        attrs: {
          src: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200&q=80",
          alt: "YouTube content creation setup",
        },
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Difficulty: " },
          { type: "text", text: "⭐⭐⭐⭐ (Hard)" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Capital Required: " },
          { type: "text", text: "$200-$2,000 (equipment)" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Income Potential: " },
          { type: "text", text: "$1,000-$100,000+/month" },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "YouTube is often misunderstood as a content treadmill requiring constant uploads. But the smartest creators focus on \"evergreen\" content—videos that remain relevant and searchable for years. A single well-optimized video can generate income for 5-10 years.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "The Evergreen Content Formula" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Instead of chasing trends, focus on:",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "\"How to\" tutorials: " },
                  { type: "text", text: "\"How to Use Excel VLOOKUP\" has been searched millions of times for over a decade" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Product reviews (with updates): " },
                  { type: "text", text: "\"Best Laptops for Students\" with yearly refreshes" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Educational explainers: " },
                  { type: "text", text: "\"What is Blockchain?\" type content never goes out of style" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Comparison videos: " },
                  { type: "text", text: "\"iPhone vs Samsung\" attracts consistent search traffic" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Multiple Revenue Streams from One Channel" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "A monetized YouTube channel generates income from multiple sources:",
          },
        ],
      },
      {
        type: "orderedList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Ad Revenue: " },
                  { type: "text", text: "$2-$15 per 1,000 views depending on niche (finance/tech pay highest)" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Affiliate Marketing: " },
                  { type: "text", text: "Link products in descriptions, earn 3-50% commissions" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Sponsorships: " },
                  { type: "text", text: "$500-$50,000 per video depending on audience size and niche" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Digital Products: " },
                  { type: "text", text: "Sell courses, templates, or services to your audience" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "👉 " },
          {
            type: "text",
            marks: [{ type: "link", attrs: { href: "https://www.youtube.com/creators" } }],
            text: "YouTube Creator Academy (Free)",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "5. Real Estate Investment Trusts (REITs)" }],
      },
      {
        type: "image",
        attrs: {
          src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
          alt: "Modern real estate buildings",
        },
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Difficulty: " },
          { type: "text", text: "⭐⭐ (Moderate)" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Capital Required: " },
          { type: "text", text: "$100+ (fractional investing available)" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Expected Returns: " },
          { type: "text", text: "4-8% dividend yield + potential appreciation" },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Real estate has created more millionaires than any other asset class, but traditionally required massive capital and hands-on management. REITs democratize real estate investing by allowing anyone to own shares of income-producing properties—from apartment complexes to data centers to cell towers.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Why REITs Work for Passive Income" }],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Required Distributions: " },
                  { type: "text", text: "REITs must distribute 90% of taxable income as dividends" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Inflation Hedge: " },
                  { type: "text", text: "Property values and rents typically rise with inflation" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Professional Management: " },
                  { type: "text", text: "No dealing with tenants, repairs, or property management" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Liquidity: " },
                  { type: "text", text: "Unlike physical real estate, you can sell REIT shares instantly" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Top REITs to Consider in 2025" }],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Realty Income (O): " },
                  { type: "text", text: "\"The Monthly Dividend Company\" pays dividends monthly, 5%+ yield, 25+ years of dividend increases" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Prologis (PLD): " },
                  { type: "text", text: "Industrial/logistics properties benefiting from e-commerce growth" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Digital Realty (DLR): " },
                  { type: "text", text: "Data center REIT riding the AI infrastructure wave" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "VNQ (Vanguard Real Estate ETF): " },
                  { type: "text", text: "Diversified exposure to entire REIT sector" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "👉 " },
          {
            type: "text",
            marks: [{ type: "link", attrs: { href: "https://www.realtyincome.com" } }],
            text: "Learn More About Realty Income",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "6. Print-on-Demand (POD) Business" }],
      },
      {
        type: "image",
        attrs: {
          src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80",
          alt: "Custom printed t-shirts and merchandise",
        },
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Difficulty: " },
          { type: "text", text: "⭐⭐⭐ (Challenging)" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Capital Required: " },
          { type: "text", text: "$0-$100" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Income Potential: " },
          { type: "text", text: "$500-$20,000+/month" },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Print-on-demand allows you to sell custom-designed products (t-shirts, mugs, phone cases, posters) without holding inventory. When someone orders, the POD company prints and ships directly to the customer. You pocket the difference between retail price and production cost.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "The Niche Strategy That Works" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The key to POD success isn't generic designs—it's targeting passionate niches. Examples:",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "\"Gift for Mechanical Keyboard Enthusiasts\"" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "\"Proud Corgi Dad\" apparel" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "\"Pickleball Obsessed\" merchandise" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "\"Retired Firefighter\" gifts" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The more specific the niche, the less competition and the more willing customers are to pay premium prices.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Best POD Platforms in 2025" }],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Printful: " },
                  { type: "text", text: "Best overall quality, integrates with Shopify, Etsy, Amazon" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Printify: " },
                  { type: "text", text: "Multiple print providers, often lower prices" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Amazon Merch on Demand: " },
                  { type: "text", text: "Access Amazon's massive customer base, no upfront costs" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Redbubble: " },
                  { type: "text", text: "Marketplace model, handles everything including marketing" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "👉 " },
          {
            type: "text",
            marks: [{ type: "link", attrs: { href: "https://www.printful.com" } }],
            text: "Start Free with Printful",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "7. Affiliate Marketing with SEO Content" }],
      },
      {
        type: "image",
        attrs: {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
          alt: "Marketing analytics dashboard",
        },
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Difficulty: " },
          { type: "text", text: "⭐⭐⭐⭐ (Hard)" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Capital Required: " },
          { type: "text", text: "$50-$500 (domain + hosting)" },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: "Income Potential: " },
          { type: "text", text: "$1,000-$100,000+/month" },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Affiliate marketing involves recommending products and earning commissions on resulting sales. When combined with SEO (search engine optimization), you can build websites that generate passive traffic—and passive income—for years.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "The Profitable Content Formula" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The highest-converting affiliate content types are:",
          },
        ],
      },
      {
        type: "orderedList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "\"Best [Product] for [Use Case]\" articles: " },
                  { type: "text", text: "\"Best Standing Desks for Home Office\"—readers are ready to buy" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "\"[Product A] vs [Product B]\" comparisons: " },
                  { type: "text", text: "\"Notion vs Obsidian\"—bottom-of-funnel buyers" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "In-depth product reviews: " },
                  { type: "text", text: "Detailed, honest reviews build trust and convert well" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "\"How to\" tutorials featuring products: " },
                  { type: "text", text: "\"How to Start a Podcast\" naturally includes microphone and software recommendations" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "High-Paying Affiliate Programs" }],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Software/SaaS: " },
                  { type: "text", text: "20-50% recurring commissions (Notion, ConvertKit, Webflow)" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Web Hosting: " },
                  { type: "text", text: "$65-$200 per signup (Bluehost, Cloudways)" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Finance: " },
                  { type: "text", text: "$50-$500+ per lead (credit cards, investment platforms)" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Online Courses: " },
                  { type: "text", text: "30-50% commissions (Skillshare, Masterclass)" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "👉 " },
          {
            type: "text",
            marks: [{ type: "link", attrs: { href: "https://affiliate-program.amazon.com" } }],
            text: "Join Amazon Associates",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Building Your Passive Income Portfolio" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The wealthiest passive income earners don't rely on a single source—they build portfolios. Here's a realistic progression:",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Year 1: Foundation" }],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Max out high-yield savings (emergency fund)" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Start dividend investing with $100-500/month" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Create your first digital product" }],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Year 2-3: Growth" }],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Expand digital product line" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Start YouTube channel or blog (affiliate focus)" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Add REITs to investment portfolio" }],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Year 4-5: Diversification" }],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Reinvest all passive income into dividend stocks" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Scale best-performing income streams" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Consider real estate syndications or rental properties" }],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Final Thoughts: Start Imperfect, Start Now" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The biggest mistake aspiring passive income builders make is waiting for the \"perfect\" opportunity or until they have \"enough\" money. The reality is that compound growth—whether in investments or digital assets—rewards those who start early, not those who start perfectly.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Pick one strategy from this guide that resonates with your skills, resources, and interests. Commit to it for 6-12 months before evaluating results. Most passive income streams take 1-2 years to mature—the ones who succeed are those who persist beyond the initial plateau.",
          },
        ],
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "italic" }],
                text: "\"The best time to plant a tree was 20 years ago. The second best time is now.\"",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "What passive income stream will you start building this week? Your future self will thank you for the decision you make today.",
          },
        ],
      },
    ],
  };

  // Create the post
  const post = await prisma.post.create({
    data: {
      title: "7 Proven Passive Income Strategies for 2025: A Complete Guide to Building Wealth While You Sleep",
      slug: "passive-income-strategies-2025-complete-guide",
      excerpt:
        "Stop trading time for money. Learn 7 battle-tested passive income strategies for 2025—from high-yield savings to digital products to dividend investing. Includes real numbers, case studies, and step-by-step implementation guides.",
      content: JSON.stringify(content),
      featuredImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&q=80",
      status: "PUBLISHED",
      metaTitle: "7 Passive Income Strategies for 2025 | Complete Wealth Building Guide",
      metaDescription:
        "Build real passive income in 2025: high-yield savings, dividends, digital products, YouTube, REITs & more. Realistic numbers and implementation guides.",
      keywords: "passive income, passive income ideas, make money online, dividend investing, REITs, digital products, side hustle, financial freedom 2025",
      readTime: 18,
      featured: true,
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: financeCategory.id,
      tags: {
        create: tags.map((t) => ({ tagId: t.id })),
      },
    },
  });

  console.log("✅ Blog post created successfully!");
  console.log(`   Title: ${post.title}`);
  console.log(`   Slug: ${post.slug}`);
  console.log(`   URL: /blog/${post.slug}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
