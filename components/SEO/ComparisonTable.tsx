import Link from "next/link";
import { Check, X, ExternalLink } from "lucide-react";

interface Product {
  name: string;
  affiliateUrl: string;
  price: string;
  rating: number;
  features: Record<string, boolean | string>;
  badge?: "Best Pick" | "Budget Choice";
}

interface ComparisonTableProps {
  products: Product[];
  featureLabels: Record<string, string>;
}

export function ComparisonTable({ products, featureLabels }: ComparisonTableProps) {
  const featureKeys = Object.keys(featureLabels);

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 bg-card border border-border p-4 text-left font-semibold">
              Feature
            </th>
            {products.map((product, index) => (
              <th key={index} className="border border-border p-4 text-center min-w-[150px]">
                {product.badge && (
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded mb-2 ${
                      product.badge === "Best Pick"
                        ? "bg-accent text-accent-foreground"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
                <div className="font-semibold text-foreground">{product.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Price Row */}
          <tr>
            <td className="sticky left-0 bg-card border border-border p-4 font-medium">
              Price
            </td>
            {products.map((product, index) => (
              <td key={index} className="border border-border p-4 text-center">
                <span className="font-bold text-foreground">{product.price}</span>
              </td>
            ))}
          </tr>

          {/* Rating Row */}
          <tr>
            <td className="sticky left-0 bg-card border border-border p-4 font-medium">
              Rating
            </td>
            {products.map((product, index) => (
              <td key={index} className="border border-border p-4 text-center">
                <span className="font-medium text-foreground">{product.rating}/5</span>
              </td>
            ))}
          </tr>

          {/* Feature Rows */}
          {featureKeys.map((key) => (
            <tr key={key}>
              <td className="sticky left-0 bg-card border border-border p-4 font-medium">
                {featureLabels[key]}
              </td>
              {products.map((product, index) => {
                const value = product.features[key];
                return (
                  <td key={index} className="border border-border p-4 text-center">
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-foreground">{value}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}

          {/* Action Row */}
          <tr>
            <td className="sticky left-0 bg-card border border-border p-4"></td>
            {products.map((product, index) => (
              <td key={index} className="border border-border p-4 text-center">
                <Link
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Buy Now
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
