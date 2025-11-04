import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ArticleAuthor = () => {
  return (
    <Card className="mb-8 border-primary/20 bg-primary/5">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Legal Research Team</h3>
            <p className="text-sm text-muted-foreground">
              Our legal research team compiles information from authoritative sources including federal and state statutes, 
              court rules, legal databases, and government publications. All content is reviewed for accuracy and updated regularly 
              to reflect current laws and procedures.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
