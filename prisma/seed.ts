import { hash } from "bcryptjs";
import prisma from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@afflux.dev" },
    update: {},
    create: {
      email: "admin@afflux.dev",
      password: adminPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "technology" },
      update: {},
      create: {
        name: "Technology",
        slug: "technology",
        description: "Latest tech news, reviews, and tutorials",
      },
    }),
    prisma.category.upsert({
      where: { slug: "lifestyle" },
      update: {},
      create: {
        name: "Lifestyle",
        slug: "lifestyle",
        description: "Tips for better living and productivity",
      },
    }),
    prisma.category.upsert({
      where: { slug: "reviews" },
      update: {},
      create: {
        name: "Reviews",
        slug: "reviews",
        description: "In-depth product reviews and comparisons",
      },
    }),
  ]);
  console.log("✅ Categories created:", categories.length);

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: "affiliate" },
      update: {},
      create: { name: "Affiliate", slug: "affiliate" },
    }),
    prisma.tag.upsert({
      where: { slug: "guide" },
      update: {},
      create: { name: "Guide", slug: "guide" },
    }),
    prisma.tag.upsert({
      where: { slug: "comparison" },
      update: {},
      create: { name: "Comparison", slug: "comparison" },
    }),
    prisma.tag.upsert({
      where: { slug: "best-of" },
      update: {},
      create: { name: "Best Of", slug: "best-of" },
    }),
    prisma.tag.upsert({
      where: { slug: "tutorial" },
      update: {},
      create: { name: "Tutorial", slug: "tutorial" },
    }),
  ]);
  console.log("✅ Tags created:", tags.length);

  // Create sample posts
  const sampleContent = JSON.stringify({
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Introduction" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Welcome to this comprehensive guide. We'll explore everything you need to know about this topic, with practical tips and real-world examples.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Key Features" }],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Feature one with detailed explanation" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Feature two that makes this stand out" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Feature three for power users" }],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Conclusion" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This product delivers exceptional value for its price point. Highly recommended for anyone looking to upgrade their setup.",
          },
        ],
      },
    ],
  });

  const posts = await Promise.all([
    prisma.post.upsert({
      where: { slug: "best-laptops-for-developers-2026" },
      update: {},
      create: {
        title: "Best Laptops for Developers in 2026: Complete Buying Guide",
        slug: "best-laptops-for-developers-2026",
        excerpt:
          "Discover the top laptops for software development in 2026. We compare performance, battery life, and value to help you choose the perfect coding machine.",
        content: sampleContent,
        featuredImage: "/images/sample-laptop.jpg",
        status: "PUBLISHED",
        metaTitle: "Best Laptops for Developers 2026 | Top Picks & Reviews",
        metaDescription:
          "Find the best laptops for developers in 2026. Expert reviews of MacBook Pro, ThinkPad, Dell XPS and more. Compare specs, prices & features.",
        keywords: "best laptops developers, coding laptops, programming laptops 2026",
        readTime: 8,
        featured: true,
        publishedAt: new Date(),
        authorId: admin.id,
        categoryId: categories[0].id,
      },
    }),
    prisma.post.upsert({
      where: { slug: "how-to-start-affiliate-marketing-guide" },
      update: {},
      create: {
        title: "How to Start Affiliate Marketing: A Beginner's Complete Guide",
        slug: "how-to-start-affiliate-marketing-guide",
        excerpt:
          "Learn how to start affiliate marketing from scratch. This comprehensive guide covers choosing a niche, building an audience, and maximizing your commissions.",
        content: sampleContent,
        featuredImage: "/images/sample-marketing.jpg",
        status: "PUBLISHED",
        metaTitle: "How to Start Affiliate Marketing | Beginner's Guide 2026",
        metaDescription:
          "Complete beginner's guide to affiliate marketing. Learn how to choose profitable niches, build traffic, and earn passive income online.",
        keywords: "affiliate marketing guide, start affiliate marketing, make money online",
        readTime: 12,
        featured: true,
        publishedAt: new Date(),
        authorId: admin.id,
        categoryId: categories[1].id,
      },
    }),
    prisma.post.upsert({
      where: { slug: "airpods-pro-3-review" },
      update: {},
      create: {
        title: "AirPods Pro 3 Review: Worth the Upgrade?",
        slug: "airpods-pro-3-review",
        excerpt:
          "Our in-depth review of the new AirPods Pro 3. We test audio quality, noise cancellation, and battery life to see if they're worth your money.",
        content: sampleContent,
        featuredImage: "/images/sample-airpods.jpg",
        status: "PUBLISHED",
        metaTitle: "AirPods Pro 3 Review | Sound Quality, ANC & Value",
        metaDescription:
          "Honest AirPods Pro 3 review with audio tests, ANC comparison, and battery analysis. Find out if Apple's latest earbuds are worth buying.",
        keywords: "airpods pro 3 review, apple earbuds, wireless earbuds review",
        readTime: 6,
        featured: false,
        publishedAt: new Date(),
        authorId: admin.id,
        categoryId: categories[2].id,
      },
    }),
  ]);
  console.log("✅ Posts created:", posts.length);

  // Connect posts to tags
  const postTagConnections = [
    { postId: posts[0].id, tagId: tags[0].id },
    { postId: posts[0].id, tagId: tags[3].id },
    { postId: posts[1].id, tagId: tags[0].id },
    { postId: posts[1].id, tagId: tags[1].id },
    { postId: posts[2].id, tagId: tags[0].id },
    { postId: posts[2].id, tagId: tags[2].id },
  ];
  
  for (const conn of postTagConnections) {
    await prisma.postTag.upsert({
      where: { postId_tagId: conn },
      update: {},
      create: conn,
    });
  }
  console.log("✅ Post tags connected");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
