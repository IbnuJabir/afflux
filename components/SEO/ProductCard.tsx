import Link from "next/link";
import Image from "next/image";
import { Star, ExternalLink } from "lucide-react";

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  affiliateUrl: string;
  badge?: "Best Pick" | "Budget Choice" | "Editor's Choice";
}

export function ProductCard({
  name,
  description,
  image,
  price,
  originalPrice,
  rating,
  affiliateUrl,
  badge,
}: ProductCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {badge && (
        <div
          className={`px-3 py-1 text-xs font-medium text-center ${
            badge === "Best Pick"
              ? "bg-accent text-accent-foreground"
              : badge === "Editor's Choice"
              ? "bg-primary text-primary-foreground"
              : "bg-green-600 text-white"
          }`}
        >
          {badge}
        </div>
      )}
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2">{name}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        {rating && (
          <div className="mt-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">{rating}</span>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
        </div>

        <Link
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-4 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Check Price
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
