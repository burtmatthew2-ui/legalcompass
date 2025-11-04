import { Link2 } from "lucide-react";

interface CitationFooterProps {
  sources: Array<{
    title: string;
    url?: string;
    description: string;
  }>;
}

export const CitationFooter = ({ sources }: CitationFooterProps) => {
  return (
    <section className="border-t pt-8 mt-12">
      <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
        <Link2 className="h-5 w-5" />
        Sources & References
      </h3>
      <ul className="space-y-3">
        {sources.map((source, index) => (
          <li key={index} className="text-sm">
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground mt-1">[{index + 1}]</span>
              <div>
                {source.url ? (
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    {source.title}
                  </a>
                ) : (
                  <span className="font-medium text-foreground">{source.title}</span>
                )}
                <p className="text-muted-foreground">{source.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
