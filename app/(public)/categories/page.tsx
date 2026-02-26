import Link from "next/link";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Categories | Afflux",
  description: "Browse all content categories on Afflux",
};

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">All Categories</h1>

      {categories.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="block p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors"
            >
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {category.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {category._count.posts} {category._count.posts === 1 ? "article" : "articles"}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No categories found.</p>
      )}
    </div>
  );
}
