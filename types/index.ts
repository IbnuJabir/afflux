import type { Post, Category, Tag, User, PostTag } from "@prisma/client";

export type PostStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED";
export type UserRole = "ADMIN" | "EDITOR";

export interface PostWithRelations extends Post {
  author: User;
  category: Category | null;
  tags: (PostTag & { tag: Tag })[];
}

export interface PostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  status: string;
  publishedAt: Date | null;
  createdAt: Date;
  author: {
    name: string | null;
  };
  category: {
    name: string;
    slug: string;
  } | null;
}

export interface CategoryWithCount extends Category {
  _count: {
    posts: number;
  };
}

export interface TagWithCount extends Tag {
  _count: {
    posts: number;
  };
}

// TipTap JSON content types
export interface TipTapContent {
  type: string;
  content?: TipTapNode[];
}

export interface TipTapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  text?: string;
  marks?: TipTapMark[];
}

export interface TipTapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

// API response types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form types
export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  status: PostStatus;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  categoryId: string;
  tagIds: string[];
  featured: boolean;
  publishedAt: string | null;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
}

export interface TagFormData {
  name: string;
  slug: string;
}
