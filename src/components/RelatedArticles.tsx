import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RelatedArticle {
  title: string;
  slug: string;
  description: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  if (articles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t">
      <h3 className="text-2xl font-semibold mb-6 text-foreground">Related Articles</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to={`/resources/${article.slug}`}
            className="group"
          >
            <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {article.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};