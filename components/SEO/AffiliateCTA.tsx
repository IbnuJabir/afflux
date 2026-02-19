import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface AffiliateCTAProps {
  title: string;
  description?: string;
  buttonText: string;
  affiliateUrl: string;
  variant?: "default" | "sticky";
}

export function AffiliateCTA({
  title,
  description,
  buttonText,
  affiliateUrl,
  variant = "default",
}: AffiliateCTAProps) {
  if (variant === "sticky") {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50 lg:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-foreground text-sm">{title}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <Link
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm whitespace-nowrap"
          >
            {buttonText}
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 my-8">
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
        <Link
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          {buttonText}
          <ExternalLink className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
