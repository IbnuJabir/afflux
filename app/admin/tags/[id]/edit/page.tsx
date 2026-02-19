import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { TagForm } from "@/components/Admin/TagForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTagPage({ params }: PageProps) {
  const { id } = await params;
  const tag = await prisma.tag.findUnique({ where: { id } });

  if (!tag) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Edit Tag</h1>
      <TagForm tag={tag} />
    </div>
  );
}
