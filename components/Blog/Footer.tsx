import Link from "next/link";
import prisma from "@/lib/prisma";

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    take: 6,
    select: { id: true, name: true, slug: true },
  });
}

export async function Footer() {
  const categories = await getCategories();

  return (
    <footer className="border-t border-border bg-card py-12 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold text-foreground">
              Afflux
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              Your trusted source for honest reviews, guides, and recommendations. 
              We help you make informed purchasing decisions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.length > 0 ? (
                <>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link 
                        href={`/category/${category.slug}`} 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link 
                      href="/categories" 
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      View all →
                    </Link>
                  </li>
                </>
              ) : (
                <li className="text-sm text-muted-foreground">No categories yet</li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Afflux. All rights reserved. 
            <span className="mx-2">•</span>
            Affiliate Disclosure: We may earn a commission from purchases made through links on this site.
          </p>
        </div>
      </div>
    </footer>
  );
}
