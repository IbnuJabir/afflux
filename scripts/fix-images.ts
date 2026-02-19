import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Find the post by slug
  const post = await prisma.post.findUnique({
    where: { slug: "best-ai-tools-productivity-2025" },
  });

  if (!post) {
    console.log("Post not found!");
    return;
  }

  // Parse and update the content
  const content = JSON.parse(post.content);
  
  // New working image URLs
  const imageUpdates: Record<string, string> = {
    "AI Generated Art Example": "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=1200&q=80",
  };

  // Traverse and update image nodes
  function updateImages(nodes: unknown[]) {
    for (const node of nodes) {
      const n = node as { type?: string; attrs?: { alt?: string; src?: string }; content?: unknown[] };
      if (n.type === "image" && n.attrs?.alt && imageUpdates[n.attrs.alt]) {
        n.attrs.src = imageUpdates[n.attrs.alt];
        console.log(`Updated image: ${n.attrs.alt}`);
      }
      if (n.content) {
        updateImages(n.content);
      }
    }
  }

  updateImages(content.content || []);

  // Save updated content
  await prisma.post.update({
    where: { slug: "best-ai-tools-productivity-2025" },
    data: { content: JSON.stringify(content) },
  });

  console.log("✅ Image URLs updated!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
