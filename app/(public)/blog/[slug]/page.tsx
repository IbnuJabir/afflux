import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { generateSEO, generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { TableOfContents, ContentRenderer, PostCard } from "@/components/Blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true, slug: true } },
      tags: { include: { tag: true } },
    },
  });

  if (post) {
    // Increment view count
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });
  }

  return post;
}

async function getRelatedPosts(postId: string, categoryId: string | null) {
  if (!categoryId) return [];

  return prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      categoryId,
      id: { not: postId },
    },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });

  if (!post) return {};

  return generateSEO({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || "",
    keywords: post.keywords || undefined,
    image: post.featuredImage || undefined,
    url: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt?.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    author: post.author.name || undefined,
  });
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.id, post.categoryId);

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt || "",
    slug: post.slug,
    image: post.featuredImage || undefined,
    publishedAt: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    author: post.author.name || "Anonymous",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    ...(post.category
      ? [{ name: post.category.name, url: `/category/${post.category.slug}` }]
      : []),
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          {post.category && (
            <>
              <Link href={`/category/${post.category.slug}`} className="hover:text-foreground">
                {post.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground truncate">{post.title}</span>
        </nav>

        <div className="lg:flex lg:gap-12">
          {/* Main Content */}
          <div className="lg:flex-1 max-w-3xl">
            {/* Header */}
            <header className="mb-8">
              {post.category && (
                <Link
                  href={`/category/${post.category.slug}`}
                  className="inline-block text-sm font-medium text-primary hover:underline mb-4"
                >
                  {post.category.name}
                </Link>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {post.author.name && <span>By {post.author.name}</span>}
                {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                {post.readTime && <span>{post.readTime} min read</span>}
                <span>{post.views} views</span>
              </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <ContentRenderer content={post.content} />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(({ tag }) => (
                    <Link
                      key={tag.id}
                      href={`/tag/${tag.slug}`}
                      className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Share this article</h3>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm bg-muted text-muted-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm bg-muted text-muted-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm bg-muted text-muted-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block lg:w-80">
            <TableOfContents content={post.content} />
          </aside>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
