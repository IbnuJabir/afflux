import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create or get category
  let techCategory = await prisma.category.findUnique({
    where: { slug: "artificial-intelligence" },
  });

  if (!techCategory) {
    techCategory = await prisma.category.create({
      data: {
        name: "Artificial Intelligence",
        slug: "artificial-intelligence",
        description: "Latest news, tools, and guides about AI and machine learning",
      },
    });
  }

  // Create tags
  const tagNames = ["AI Tools", "Productivity", "ChatGPT", "Automation", "2025"];
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

  // Rich content in TipTap JSON format
  const content = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Why AI Tools Are Dominating 2025" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Artificial Intelligence has evolved from a futuristic concept to an everyday productivity powerhouse. In 2025, AI tools are no longer optional—they're essential for anyone looking to work smarter, not harder. Whether you're a content creator, developer, marketer, or entrepreneur, there's an AI tool designed to supercharge your workflow.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "In this comprehensive guide, we'll explore the ",
          },
          { type: "text", marks: [{ type: "bold" }], text: "7 best AI tools" },
          {
            type: "text",
            text: " that are transforming how people work in 2025. Each tool has been tested extensively and selected based on real-world performance, user reviews, and value for money.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "1. ChatGPT Plus — The All-Round Champion" }],
      },
      {
        type: "image",
        attrs: {
          src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
          alt: "ChatGPT AI Assistant Interface",
        },
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "OpenAI's ChatGPT remains the undisputed king of conversational AI. With GPT-4 Turbo and the new GPT-4o model, it offers lightning-fast responses, image understanding, and code execution capabilities that make it indispensable for knowledge workers.",
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
                  { type: "text", marks: [{ type: "bold" }], text: "Best for: " },
                  { type: "text", text: "Writing, coding, research, brainstorming" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Pricing: " },
                  { type: "text", text: "$20/month for Plus, $200/month for Pro" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Standout feature: " },
                  { type: "text", text: "Custom GPTs and plugin ecosystem" },
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
            marks: [{ type: "link", attrs: { href: "https://chat.openai.com" } }],
            text: "Try ChatGPT Plus",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "2. Claude 3.5 — Best for Long-Form Content" }],
      },
      {
        type: "image",
        attrs: {
          src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
          alt: "AI Brain Neural Network",
        },
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Anthropic's Claude has emerged as the go-to AI for professionals who need nuanced, thoughtful responses. With a 200K context window, Claude can process entire books, lengthy documents, and complex codebases without breaking a sweat.",
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
                  { type: "text", marks: [{ type: "bold" }], text: "Best for: " },
                  { type: "text", text: "Document analysis, long-form writing, research" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Pricing: " },
                  { type: "text", text: "$20/month for Pro" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Standout feature: " },
                  { type: "text", text: "Artifacts for interactive content creation" },
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
            marks: [{ type: "link", attrs: { href: "https://claude.ai" } }],
            text: "Try Claude Pro",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "3. Midjourney v6 — AI Image Generation Perfected" }],
      },
      {
        type: "image",
        attrs: {
          src: "https://images.unsplash.com/photo-1686191128892-3b37add4e762?w=1200&q=80",
          alt: "AI Generated Art Example",
        },
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Midjourney v6 has set a new standard for AI image generation. The photorealistic capabilities, improved text rendering, and artistic flexibility make it the top choice for designers, marketers, and content creators who need stunning visuals on demand.",
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
                  { type: "text", marks: [{ type: "bold" }], text: "Best for: " },
                  { type: "text", text: "Marketing visuals, concept art, social media content" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Pricing: " },
                  { type: "text", text: "$10-$120/month depending on plan" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Standout feature: " },
                  { type: "text", text: "Web interface with style references" },
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
            marks: [{ type: "link", attrs: { href: "https://midjourney.com" } }],
            text: "Try Midjourney",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "4. Notion AI — Your Second Brain, Supercharged" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Notion's built-in AI transforms the popular workspace tool into an intelligent assistant. Summarize meeting notes, generate content, extract action items, and organize information—all without leaving your workspace.",
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
                  { type: "text", marks: [{ type: "bold" }], text: "Best for: " },
                  { type: "text", text: "Project management, note-taking, team collaboration" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Pricing: " },
                  { type: "text", text: "$10/month add-on to any Notion plan" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Standout feature: " },
                  { type: "text", text: "Q&A over your entire workspace" },
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
            marks: [{ type: "link", attrs: { href: "https://notion.so" } }],
            text: "Try Notion AI",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "5. GitHub Copilot — The Developer's Best Friend" }],
      },
      {
        type: "image",
        attrs: {
          src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
          alt: "Developer Coding with AI",
        },
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "GitHub Copilot has revolutionized software development. With intelligent code suggestions, natural language to code conversion, and context-aware completions, developers report 40-55% faster coding speeds.",
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
                  { type: "text", marks: [{ type: "bold" }], text: "Best for: " },
                  { type: "text", text: "Coding, debugging, learning new languages" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Pricing: " },
                  { type: "text", text: "$10/month individual, $19/month business" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Standout feature: " },
                  { type: "text", text: "Chat mode for explaining and refactoring code" },
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
            marks: [{ type: "link", attrs: { href: "https://github.com/features/copilot" } }],
            text: "Try GitHub Copilot",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "6. Perplexity AI — Research Made Effortless" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Perplexity combines the power of large language models with real-time web search. Every answer comes with citations, making it the perfect tool for researchers, journalists, and anyone who needs accurate, up-to-date information.",
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
                  { type: "text", marks: [{ type: "bold" }], text: "Best for: " },
                  { type: "text", text: "Research, fact-checking, current events" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Pricing: " },
                  { type: "text", text: "Free tier available, $20/month for Pro" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Standout feature: " },
                  { type: "text", text: "Focus modes for academic, code, and writing" },
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
            marks: [{ type: "link", attrs: { href: "https://perplexity.ai" } }],
            text: "Try Perplexity AI",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "7. Runway ML — Video Editing Goes AI-Native" }],
      },
      {
        type: "image",
        attrs: {
          src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80",
          alt: "Video Editing AI Interface",
        },
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Runway ML brings Hollywood-grade AI tools to everyone. From text-to-video generation with Gen-3 Alpha to seamless background removal and video inpainting, it's reshaping what's possible in video production.",
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
                  { type: "text", marks: [{ type: "bold" }], text: "Best for: " },
                  { type: "text", text: "Video editing, content creation, visual effects" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Pricing: " },
                  { type: "text", text: "$15-$95/month depending on credits" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "Standout feature: " },
                  { type: "text", text: "Gen-3 Alpha text-to-video generation" },
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
            marks: [{ type: "link", attrs: { href: "https://runwayml.com" } }],
            text: "Try Runway ML",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Quick Comparison Table" }],
      },
      {
        type: "table",
        content: [
          {
            type: "tableRow",
            content: [
              { type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Tool" }] }] },
              { type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Best For" }] }] },
              { type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Starting Price" }] }] },
              { type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Free Tier" }] }] },
            ],
          },
          {
            type: "tableRow",
            content: [
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "ChatGPT Plus" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "All-round assistant" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "$20/mo" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "✅ Yes" }] }] },
            ],
          },
          {
            type: "tableRow",
            content: [
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Claude Pro" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Long documents" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "$20/mo" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "✅ Yes" }] }] },
            ],
          },
          {
            type: "tableRow",
            content: [
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Midjourney" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Image generation" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "$10/mo" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "❌ No" }] }] },
            ],
          },
          {
            type: "tableRow",
            content: [
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Notion AI" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Workspace AI" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "$10/mo" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "✅ Limited" }] }] },
            ],
          },
          {
            type: "tableRow",
            content: [
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "GitHub Copilot" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Coding" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "$10/mo" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "✅ Students" }] }] },
            ],
          },
          {
            type: "tableRow",
            content: [
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Perplexity" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Research" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "$20/mo" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "✅ Yes" }] }] },
            ],
          },
          {
            type: "tableRow",
            content: [
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Runway ML" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Video editing" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "$15/mo" }] }] },
              { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "✅ Limited" }] }] },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Final Verdict: Which AI Tool Should You Choose?" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The best AI tool depends entirely on your use case. Here's our quick recommendation:",
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
                  { type: "text", marks: [{ type: "bold" }], text: "For general productivity: " },
                  { type: "text", text: "Start with ChatGPT Plus" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "For developers: " },
                  { type: "text", text: "GitHub Copilot is non-negotiable" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "For creatives: " },
                  { type: "text", text: "Midjourney + Runway ML is a killer combo" },
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
                  { type: "text", marks: [{ type: "bold" }], text: "For researchers: " },
                  { type: "text", text: "Perplexity AI is unmatched" },
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
            text: "The AI revolution is here, and these tools are just the beginning. The professionals who master them today will have a significant advantage tomorrow. Start with one, master it, then expand your AI toolkit as needed.",
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
                text: "\"AI won't replace you. But someone using AI will.\" — The new reality of work in 2025.",
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
            text: "Which AI tool are you most excited to try? Let us know in the comments below!",
          },
        ],
      },
    ],
  };

  // Create the post
  const post = await prisma.post.create({
    data: {
      title: "7 Best AI Tools for Productivity in 2025: Complete Guide & Comparison",
      slug: "best-ai-tools-productivity-2025",
      excerpt:
        "Discover the top 7 AI tools transforming productivity in 2025. From ChatGPT to Midjourney, we compare features, pricing, and use cases to help you choose the perfect AI assistant for your workflow.",
      content: JSON.stringify(content),
      featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
      status: "PUBLISHED",
      metaTitle: "7 Best AI Tools for Productivity in 2025 | Complete Comparison Guide",
      metaDescription:
        "Compare the top AI productivity tools of 2025: ChatGPT, Claude, Midjourney, Copilot & more. Expert reviews, pricing, and recommendations.",
      keywords: "AI tools, productivity, ChatGPT, Claude, Midjourney, GitHub Copilot, AI 2025, best AI",
      readTime: 8,
      featured: true,
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: techCategory.id,
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
