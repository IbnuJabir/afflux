import Link from "next/link";

export function Footer() {
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
              <li>
                <Link href="/category/technology" className="text-sm text-muted-foreground hover:text-foreground">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/reviews" className="text-sm text-muted-foreground hover:text-foreground">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/category/lifestyle" className="text-sm text-muted-foreground hover:text-foreground">
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
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
