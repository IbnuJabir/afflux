import Link from "next/link";
import { cn } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { CategoriesDropdown } from "./CategoriesDropdown";

interface HeaderProps {
  className?: string;
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });
}

export async function Header({ className }: HeaderProps) {
  const categories = await getCategories();

  return (
    <header className={cn("border-b border-border bg-card", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-foreground">
            Afflux
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <CategoriesDropdown categories={categories} />
          </nav>
          <div className="flex items-center gap-4">
            {/* Search or other public actions can go here */}
          </div>
        </div>
      </div>
    </header>
  );
}
