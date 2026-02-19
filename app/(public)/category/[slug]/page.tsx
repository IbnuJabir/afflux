import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { PostCard, Pagination } from "@/components/Blog";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 9;

async function getCategory(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
  });
}

async function getCategoryPosts(categoryId: string, page: number) {
  const skip = (page - 1) * PAGE_SIZE;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED", categoryId },
      include: {
        author: { select: { name: true } },
        category: { select: { name: true, slug: true } },
      },
      orderBy: { publishedAt: "desc" },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.post.count({ where: { status: "PUBLISHED", categoryId } }),
  ]);

  return {
    posts,
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) return {};

  return generateSEO({
    title: `${category.name} Articles`,
    description: category.description || `Browse all ${category.name} articles and guides on Afflux.`,
    url: `/category/${category.slug}`,
  });
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });

  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1", 10);

  const category = await getCategory(slug);
  if (!category) notFound();

  const { posts, total, totalPages } = await getCategoryPosts(category.id, page);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: category.name, url: `/category/${category.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-muted-foreground max-w-2xl">
              {category.description}
            </p>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            {total} {total === 1 ? "article" : "articles"}
          </p>
        </header>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No articles found in this category yet.</p>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath={`/category/${category.slug}`}
        />
      </div>
    </>
  );
}
