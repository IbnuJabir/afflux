import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: {
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: string | null;
    publishedAt: Date | null;
    readTime: number | null;
    author: { name: string | null };
    category: { name: string; slug: string } | null;
  };
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article
      className={`group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow ${
        featured ? "md:flex" : ""
      }`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`block relative ${
          featured ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video"
        }`}
      >
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </Link>
      <div className={`p-6 ${featured ? "md:w-1/2 md:flex md:flex-col md:justify-center" : ""}`}>
        {post.category && (
          <Link
            href={`/category/${post.category.slug}`}
            className="inline-block text-xs font-medium text-primary hover:underline mb-2"
          >
            {post.category.name}
          </Link>
        )}
        <Link href={`/blog/${post.slug}`}>
          <h2
            className={`font-bold text-foreground group-hover:text-primary transition-colors ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {post.title}
          </h2>
        </Link>
        {post.excerpt && (
          <p className="mt-2 text-muted-foreground line-clamp-2">{post.excerpt}</p>
        )}
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          {post.author.name && <span>By {post.author.name}</span>}
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          {post.readTime && <span>{post.readTime} min read</span>}
        </div>
      </div>
    </article>
  );
}
