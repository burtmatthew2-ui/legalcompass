import { useState, lazy, Suspense } from "react";
import { ChevronDown } from "lucide-react";
import { HowItWorks } from "@/components/HowItWorks";
import { LegalDirectionFinder } from "@/components/LegalDirectionFinder";
import { DocumentHub } from "@/components/DocumentHub";
import { LocalHelpFinder } from "@/components/LocalHelpFinder";
import { HowLawyerMatchingWorks } from "@/components/HowLawyerMatchingWorks";
import { WhyLawyersUse } from "@/components/WhyLawyersUse";
import { MissionStatement } from "@/components/MissionStatement";
import { WhatMakesUsDifferent } from "@/components/WhatMakesUsDifferent";
import { TrustBadges } from "@/components/TrustBadges";
import { InstantDemoWidget } from "@/components/InstantDemoWidget";
import { ExampleChatWidget } from "@/components/ExampleChatWidget";
import { ComparisonTable } from "@/components/ComparisonTable";
import { TrustReviews } from "@/components/TrustReviews";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const CollapsibleSections = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    about: true, // FAQ open by default
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const Section = ({ 
    id, 
    title, 
    children,
    defaultOpen = false 
  }: { 
    id: string; 
    title: string; 
    children: React.ReactNode;
    defaultOpen?: boolean;
  }) => (
    <Collapsible 
      open={openSections[id] ?? defaultOpen}
      onOpenChange={() => toggleSection(id)}
      className="border-b border-border"
    >
      <CollapsibleTrigger className="w-full py-6 px-4 md:px-8 flex items-center justify-between hover:bg-muted/50 transition-colors group">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-left group-hover:text-primary transition-colors">
          {title}
        </h2>
        <ChevronDown 
          className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${
            openSections[id] ? 'rotate-180' : ''
          }`} 
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="py-4">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <div className="w-full">
      {/* Trust Reviews - Always Visible */}
      <TrustReviews />

      {/* Collapsible Sections - Lazy Load Content */}
      <Section id="how-it-works" title="How It Works" defaultOpen={true}>
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading...</div>}>
          <HowItWorks />
        </Suspense>
      </Section>

      <Section id="comparison" title="Compare Our Value">
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading...</div>}>
          <ComparisonTable />
        </Suspense>
      </Section>

      <Section id="demo" title="See It In Action">
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading...</div>}>
          <div className="py-8 px-6">
            <InstantDemoWidget />
          </div>
        </Suspense>
      </Section>
    </div>
  );
};
