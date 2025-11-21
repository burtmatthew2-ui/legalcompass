import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this actual legal advice?",
    answer: "No, Legal Compass provides informational research and analysis only. It's not a substitute for licensed legal counsel. Always consult with a qualified attorney for specific legal matters."
  },
  {
    question: "How accurate is the AI research?",
    answer: "Our AI analyzes public legal databases, statutes, and case law to provide comprehensive research. However, laws vary by jurisdiction and change frequently. Always verify information with current local laws and legal professionals."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel your subscription at any time. You'll retain access until the end of your current billing period with no further charges."
  },
  {
    question: "What types of legal questions can I ask?",
    answer: "You can research contract law, business regulations, tenant rights, intellectual property basics, and general legal frameworks. Complex litigation or criminal law matters should be handled by licensed attorneys."
  },
  {
    question: "Is my conversation data private?",
    answer: "Yes, all conversations are encrypted and private. We use enterprise-grade security and never share your research queries or legal questions with third parties."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 7-day money-back guarantee if you're not satisfied with the service. Just contact us within 7 days of your subscription start."
  }
];

export { faqs };

export const FAQ = () => {
  return (
    <div className="py-8 md:py-16 px-6 bg-card/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-[var(--gradient-primary)]">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Everything you need to know about Legal Compass
        </p>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card/70 border border-border/50 rounded-lg px-6 hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
