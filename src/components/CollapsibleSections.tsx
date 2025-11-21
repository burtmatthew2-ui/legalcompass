import { useState } from "react";
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
import { FAQ } from "@/components/FAQ";
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
      {/* Featured FAQ Section - Prominent and Always Visible */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Everything You Need to Know About Legal Compass
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12">
            Quick answers to common questions
          </p>
          <FAQ />
        </div>
      </section>

      {/* Collapsible Sections */}
      <Section id="how-it-works" title="How It Works">
        <HowItWorks />
      </Section>

      <Section id="lawyer-matching" title="How Lawyer Matching Works">
        <HowLawyerMatchingWorks />
      </Section>

      <Section id="why-lawyers" title="Why Lawyers Use Legal Compass">
        <WhyLawyersUse />
      </Section>

      <Section id="mission" title="Our Mission">
        <MissionStatement />
      </Section>

      <Section id="what-makes-different" title="What Makes Us Different">
        <WhatMakesUsDifferent />
      </Section>

      <Section id="direction-finder" title="Legal Direction Finder">
        <LegalDirectionFinder />
      </Section>

      <Section id="templates" title="Document Templates">
        <DocumentHub />
      </Section>

      <Section id="local-help" title="Find Local Help">
        <LocalHelpFinder />
      </Section>

      <Section id="trust" title="Trust & Security">
        <TrustBadges />
      </Section>

      <Section id="demo" title="See It In Action">
        <div className="py-8 px-6">
          <InstantDemoWidget />
        </div>
      </Section>

      <Section id="example-chat" title="Example Conversation">
        <ExampleChatWidget />
      </Section>

      <Section id="comparison" title="Compare Our Value">
        <ComparisonTable />
      </Section>
    </div>
  );
};
