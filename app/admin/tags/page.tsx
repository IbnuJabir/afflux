import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DeleteTagButton } from "@/components/Admin/DeleteTagButton";

async function getTags() {
  return prisma.tag.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });
}

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tags</h1>
          <p className="text-muted-foreground">{tags.length} tags</p>
        </div>
        <Link
          href="/admin/tags/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="h-5 w-5" />
          New Tag
        </Link>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                Posts
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id} className="border-b border-border last:border-0">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">{tag.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">/{tag.slug}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{tag._count.posts}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/tags/${tag.id}/edit`}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteTagButton tagId={tag.id} tagName={tag.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
