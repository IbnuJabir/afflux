import prisma from "@/lib/prisma";
import { PostForm } from "@/components/Admin/PostForm";

async function getData() {
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  return { categories, tags };
}

export default async function NewPostPage() {
  const { categories, tags } = await getData();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Create New Post</h1>
      <PostForm categories={categories} tags={tags} />
    </div>
  );
}
