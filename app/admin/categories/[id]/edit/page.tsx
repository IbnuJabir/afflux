import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { CategoryForm } from "@/components/Admin/CategoryForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
