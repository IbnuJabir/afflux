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

async function getTag(slug: string) {
  return prisma.tag.findUnique({
    where: { slug },
  });
}

async function getTagPosts(tagId: string, page: number) {
  const skip = (page - 1) * PAGE_SIZE;

  const [postTags, total] = await Promise.all([
    prisma.postTag.findMany({
      where: {
        tagId,
        post: { status: "PUBLISHED" },
      },
      include: {
        post: {
          include: {
            author: { select: { name: true } },
            category: { select: { name: true, slug: true } },
          },
        },
      },
      orderBy: { post: { publishedAt: "desc" } },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.postTag.count({
      where: {
        tagId,
        post: { status: "PUBLISHED" },
      },
    }),
  ]);

  return {
    posts: postTags.map((pt) => pt.post),
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTag(slug);

  if (!tag) return {};

  return generateSEO({
    title: `Articles tagged "${tag.name}"`,
    description: `Browse all articles tagged with "${tag.name}" on Afflux.`,
    url: `/tag/${tag.slug}`,
  });
}

export async function generateStaticParams() {
  const tags = await prisma.tag.findMany({
    select: { slug: true },
  });

  return tags.map((tag) => ({ slug: tag.slug }));
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1", 10);

  const tag = await getTag(slug);
  if (!tag) notFound();

  const { posts, total, totalPages } = await getTagPosts(tag.id, page);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: `Tag: ${tag.name}`, url: `/tag/${tag.slug}` },
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
          <div className="inline-block px-4 py-2 bg-muted rounded-full mb-4">
            <span className="text-sm font-medium text-muted-foreground">Tag</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {tag.name}
          </h1>
          <p className="text-sm text-muted-foreground">
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
            <p className="text-muted-foreground">No articles found with this tag yet.</p>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath={`/tag/${tag.slug}`}
        />
      </div>
    </>
  );
}
