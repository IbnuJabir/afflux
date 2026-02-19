import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { calculateReadTime } from "@/lib/seo";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { name: true } },
      category: true,
      tags: { include: { tag: true } },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      status,
      metaTitle,
      metaDescription,
      keywords,
      categoryId,
      tagIds,
      featured,
    } = body;

    // Check for duplicate slug (excluding current post)
    const existing = await prisma.post.findFirst({
      where: { slug, id: { not: id } },
    });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    // Get current post to check status change
    const currentPost = await prisma.post.findUnique({ where: { id } });
    if (!currentPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Calculate read time
    let readTime = 1;
    try {
      const parsed = JSON.parse(content);
      const text = JSON.stringify(parsed);
      readTime = calculateReadTime(text);
    } catch {
      // fallback
    }

    // Determine publishedAt
    let publishedAt = currentPost.publishedAt;
    if (status === "PUBLISHED" && currentPost.status !== "PUBLISHED") {
      publishedAt = new Date();
    } else if (status !== "PUBLISHED") {
      publishedAt = null;
    }

    // Update post and tags in a transaction
    const post = await prisma.$transaction(async (tx) => {
      // Delete existing tags
      await tx.postTag.deleteMany({ where: { postId: id } });

      // Update post
      return tx.post.update({
        where: { id },
        data: {
          title,
          slug,
          excerpt,
          content,
          featuredImage,
          status,
          metaTitle,
          metaDescription,
          keywords,
          categoryId: categoryId || null,
          featured,
          readTime,
          publishedAt,
          tags: tagIds?.length
            ? {
                create: tagIds.map((tagId: string) => ({ tagId })),
              }
            : undefined,
        },
      });
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Update post error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
