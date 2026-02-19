import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { PostForm } from "@/components/Admin/PostForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getData(id: string) {
  const [post, categories, tags] = await Promise.all([
    prisma.post.findUnique({
      where: { id },
      include: { tags: { select: { tagId: true } } },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  return { post, categories, tags };
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const { post, categories, tags } = await getData(id);

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Edit Post</h1>
      <PostForm post={post} categories={categories} tags={tags} />
    </div>
  );
}
