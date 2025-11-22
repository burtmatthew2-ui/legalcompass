import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Home, Scale } from "lucide-react";
import { Helmet } from "react-helmet";
import { FloatingAIButton } from "@/components/FloatingAIButton";

const ConsumerRefundRights = () => {
  return (
    <>
      <Helmet>
        <title>Consumer Refund Rights: Products & Services Guide | Legal Compass</title>
        <meta name="description" content="Know your rights to refunds, returns, and chargebacks under consumer protection laws. Learn how to get your money back for defective products and services." />
        <meta name="keywords" content="consumer refund rights, return policy laws, chargeback rights, defective product refund, consumer protection laws" />
        <link rel="canonical" href="https://legalcompass.shop/resources/consumer-refund-rights" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <div className="flex-1">
          <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <Link to="/resources" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  <span>All Resources</span>
                </Link>
                <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Home className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <article className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Scale className="h-5 w-5" />
                <span className="text-sm font-semibold">Consumer Law</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Consumer Refund Rights: Products & Services
              </h1>
              <p className="text-lg text-muted-foreground">
                Understand your rights to refunds, returns, and chargebacks under consumer protection laws.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <p className="text-lg font-medium text-foreground/90 bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                In this guide, you'll discover your legal rights to refunds under federal and state consumer protection laws. Learn when you're entitled to your money back, how to file chargebacks, and the exact steps to take when companies refuse refunds.
              </p>
              
              <p className="text-muted-foreground/90 italic">
                How this guide helps you: Beyond explaining general consumer rights, we provide actionable tactics for getting refunds from stubborn companies—including credit card chargeback strategies, escalation techniques, and small claims court procedures. You'll get real-world solutions, not just legal theory.
              </p>

              <p>
                As a consumer, you have legal protections when purchasing products and services. While many people believe all sales are final, federal and state consumer protection laws provide rights to refunds and returns in various situations. Understanding these rights can help you recover money for defective products, undelivered goods, and unsatisfactory services.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Federal Consumer Protection Laws</h2>
              <p>
                <strong>Magnuson-Moss Warranty Act:</strong> Governs written warranties on consumer products. If a product comes with a warranty and fails within the warranty period, the manufacturer must repair, replace, or refund it. Companies cannot require you to use specific repair services or parts to maintain warranty coverage (unless provided free of charge).
              </p>
              <p>
                <strong>Federal Trade Commission (FTC) Cooling-Off Rule:</strong> Gives consumers 3 business days to cancel certain sales made at your home, workplace, dormitory, or seller's temporary location (like hotel rooms, convention centers, or fairgrounds). This applies to sales of $25 or more. You must receive two copies of a cancellation form and a notice explaining your right to cancel. Exceptions include sales made entirely online or by phone.
              </p>
              <p>
                <strong>Fair Credit Billing Act:</strong> Protects credit card users from billing errors and unauthorized charges. You can dispute charges for goods not delivered, defective items, or services not provided as agreed. The credit card company must investigate and temporarily remove the charge while investigating.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">State Consumer Protection Laws</h2>
              <p>
                Every state has consumer protection statutes (often called "Unfair and Deceptive Acts and Practices" or UDAP laws) that prohibit false advertising, misrepresentation, and unfair business practices. These laws often provide stronger protections than federal law and allow consumers to sue for damages, attorney's fees, and sometimes triple damages for willful violations.
              </p>
              <p>
                Many states have specific lemon laws for defective vehicles, requiring manufacturers to replace or refund cars with substantial defects that can't be repaired after a reasonable number of attempts (typically 3-4). Some states extend lemon law protections to other products like appliances or electronics.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">When Are You Entitled to a Refund?</h2>
              <p>
                <strong>Defective or nonconforming goods:</strong> If a product doesn't work as advertised, has defects, or doesn't match the description, you're entitled to a refund or replacement under implied warranty of merchantability. This applies even without a written warranty.
              </p>
              <p>
                <strong>Undelivered goods:</strong> If you paid for an item that was never delivered, you can demand a refund. The FTC Mail/Internet Order Rule requires companies to ship within the time stated or, if no time is stated, within 30 days.
              </p>
              <p>
                <strong>Services not provided:</strong> If you paid for services that were never performed or were performed inadequately (not meeting industry standards), you can demand a refund.
              </p>
              <p>
                <strong>Fraudulent or deceptive practices:</strong> If you were misled about product features, terms of sale, or hidden fees, you may be entitled to a full refund under consumer protection laws.
              </p>
              <p>
                <strong>Store return policies:</strong> Many stores offer return policies beyond legal requirements (e.g., 30-day money-back guarantees). These policies create enforceable contracts, so if a store promises a refund within 30 days, they must honor it.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Credit Card Chargebacks</h2>
              <p>
                A chargeback allows you to dispute a credit card charge through your card issuer. You're protected under the Fair Credit Billing Act when: goods were not delivered as promised, goods were defective or not as described, you were billed for the wrong amount, unauthorized charges appear on your statement, or a company charged you after you canceled a subscription.
              </p>
              <p>
                To file a chargeback, contact your credit card company within 60 days of the statement date showing the charge. Provide documentation: receipts, order confirmations, emails with the merchant, photos of defective products, and proof you attempted to resolve with the merchant. The credit card company must investigate within two billing cycles (typically 60-90 days) and temporarily remove the charge during investigation.
              </p>
              <p>
                Note that chargebacks are not a substitute for resolving disputes directly with merchants. Always attempt to resolve issues with the seller first—many credit card companies require evidence of your attempt to resolve before approving a chargeback.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">PayPal and Online Payment Disputes</h2>
              <p>
                PayPal and similar payment platforms offer buyer protection for eligible purchases. You can file a dispute if: the item didn't arrive, the item is significantly different than described, or you were charged the wrong amount. PayPal's protection covers physical goods and some digital goods but typically doesn't cover services, real estate, vehicles, or custom-made items.
              </p>
              <p>
                Open a dispute within 180 days of payment through your PayPal account. If the seller doesn't respond or you can't reach an agreement, escalate to a claim. PayPal will investigate and may issue a full refund if they rule in your favor.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Steps to Get a Refund</h2>
              <p>
                <strong>Step 1: Contact the seller.</strong> Start with customer service via phone, email, or chat. Be polite but firm. Explain the issue, state your legal right to a refund, and provide documentation (receipts, order numbers, photos of defects). Keep records of all communications.
              </p>
              <p>
                <strong>Step 2: Escalate within the company.</strong> If customer service refuses, ask to speak with a supervisor or manager. Many companies have executive customer service teams that handle escalated complaints—find the CEO's email and send a detailed complaint.
              </p>
              <p>
                <strong>Step 3: File a complaint with agencies.</strong> Report to the Better Business Bureau (BBB), your state attorney general's consumer protection division, and the Federal Trade Commission (FTC.gov/complaint). These complaints can pressure companies to resolve issues and may trigger investigations.
              </p>
              <p>
                <strong>Step 4: Dispute the charge.</strong> File a chargeback with your credit card company if payment was made by credit card. For other payment methods, check their dispute resolution processes.
              </p>
              <p>
                <strong>Step 5: Small claims court.</strong> If the amount is significant and other methods fail, sue in small claims court. You don't need a lawyer, and filing fees are typically under $100. Bring all documentation: receipts, communications, photos, and evidence of your attempts to resolve the issue.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Personalized Legal Research</h2>
              <p>
                Consumer protection laws vary by state and situation. If you're having trouble getting a refund or dealing with an unresponsive company, <Link to="/auth" className="text-primary hover:underline font-semibold">Legal Compass AI</Link> can help you research applicable consumer protection statutes, understand your refund rights, and prepare a demand letter with legal citations.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/breach-of-contract-freelancers" className="text-primary hover:underline">
                  Breach of Contract Guide
                </Link>
                <Link to="/resources/small-claims-court-process" className="text-primary hover:underline">
                  Small Claims Court Process
                </Link>
                <Link to="/resources/write-cease-desist-letter" className="text-primary hover:underline">
                  How to Write a Cease and Desist Letter
                </Link>
                <Link to="/" className="text-primary hover:underline">
                  Legal Compass Home
                </Link>
              </div>
            </div>

            <div className="mt-12 bg-primary/10 border-2 border-primary/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Company Won't Refund You?</h3>
              <p className="text-muted-foreground mb-6">
                Research your consumer rights and learn how to get your money back.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Try Legal Compass AI Free
                </Button>
              </Link>
            </div>
          </article>
        </div>
        <FloatingAIButton topicContext="Consumer Refund Rights" />
        <Footer />
      </div>
    </>
  );
};

export default ConsumerRefundRights;
