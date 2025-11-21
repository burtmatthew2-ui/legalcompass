import { Card, CardContent } from "./ui/card";

export const ReviewsSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="bg-card border-border h-full">
          <CardContent className="p-6">
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="h-4 w-4 bg-muted animate-pulse rounded" />
              ))}
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-muted animate-pulse rounded w-full" />
              <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
              <div className="h-4 bg-muted animate-pulse rounded w-4/6" />
            </div>
            <div className="border-t border-border pt-4">
              <div className="h-4 bg-muted animate-pulse rounded w-2/3 mb-2" />
              <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
