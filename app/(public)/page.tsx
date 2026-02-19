import { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { generateSEO, generateOrganizationSchema } from "@/lib/seo";
import { PostCard } from "@/components/Blog";

export const metadata: Metadata = generateSEO({
  title: "Afflux Blog",
  description:
    "Your trusted source for honest reviews, buying guides, and recommendations. Make informed purchasing decisions with our expert insights.",
  keywords: "reviews, buying guides, affiliate, product comparisons, best products",
  url: "/",
});

async function getFeaturedPosts() {
  return prisma.post.findMany({
    where: { status: "PUBLISHED", featured: true },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 2,
  });
}

async function getLatestPosts() {
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 6,
  });
}

async function getCategories() {
  return prisma.category.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { name: "asc" },
  });
}

export default async function HomePage() {
  const [featuredPosts, latestPosts, categories] = await Promise.all([
    getFeaturedPosts(),
    getLatestPosts(),
    getCategories(),
  ]);

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome to Afflux
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted source for honest reviews, buying guides, and expert recommendations.
          </p>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured Posts</h2>
            <div className="grid gap-8">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} featured />
              ))}
            </div>
          </section>
        )}

        {/* Latest Posts */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Latest Posts</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-8">Browse by Category</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-foreground">{category.name}</h3>
                {category.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                )}
                <p className="mt-3 text-sm text-primary">
                  {category._count.posts} {category._count.posts === 1 ? "post" : "posts"}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
