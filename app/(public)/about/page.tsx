import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Afflux",
  description: "Learn more about Afflux - your trusted source for honest reviews, guides, and recommendations.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">About Us</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          Welcome to <strong className="text-foreground">Afflux</strong> — your trusted destination for honest, 
          in-depth reviews and recommendations that help you make smarter purchasing decisions.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          We believe everyone deserves access to unbiased, well-researched information before making a purchase. 
          Our team spends countless hours testing products, comparing features, and analyzing real user experiences 
          to bring you content you can trust.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">What We Cover</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Technology & Software Reviews</li>
          <li>Productivity Tools & Apps</li>
          <li>Online Business Resources</li>
          <li>Personal Finance Tools</li>
          <li>Lifestyle Products & Services</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Our Commitment</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Transparency is at the core of everything we do. When we recommend a product, it&apos;s because we 
          genuinely believe it provides value. We clearly disclose our affiliate relationships and never 
          let partnerships influence our honest assessments.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Affiliate Disclosure</h2>
        <p className="text-muted-foreground leading-relaxed">
          Some links on this site are affiliate links, meaning we may earn a commission if you make a 
          purchase through them — at no extra cost to you. This helps us keep the site running and 
          continue producing quality content. We only recommend products we&apos;ve personally vetted 
          and believe will genuinely help our readers.
        </p>
      </div>
    </div>
  );
}
