import { Helmet } from "react-helmet";

interface ProductSchemaProps {
  name: string;
  description: string;
  price: string;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  rating?: {
    value: number;
    count: number;
  };
  url?: string;
  imageUrl?: string;
}

/**
 * Product Schema Markup Component
 * 
 * Implements rich snippet schema for product pages (Phase 1: CTR Optimization)
 * Enhances search result appearance with pricing, ratings, and availability
 */
export const ProductSchemaMarkup = ({
  name,
  description,
  price,
  currency = "USD",
  availability = "InStock",
  rating,
  url,
  imageUrl,
}: ProductSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    ...(imageUrl && {
      image: imageUrl,
    }),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      ...(url && { url }),
    },
    ...(rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.value,
        reviewCount: rating.count,
      },
    }),
    brand: {
      "@type": "Organization",
      name: "Legal Compass",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: Array<{
    name: string;
    text: string;
    url?: string;
    image?: string;
  }>;
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    value: string;
  };
}

/**
 * HowTo Schema Markup Component
 * 
 * For how-to guides and tutorials (Phase 1: CTR Optimization)
 * Can appear as rich snippets in search results
 */
export const HowToSchemaMarkup = ({
  name,
  description,
  steps,
  totalTime,
  estimatedCost,
}: HowToSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime && { totalTime }),
    ...(estimatedCost && { estimatedCost }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
      ...(step.image && { image: step.image }),
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
