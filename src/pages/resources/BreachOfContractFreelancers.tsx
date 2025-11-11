import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Home, Scale } from "lucide-react";
import { Helmet } from "react-helmet";

const BreachOfContractFreelancers = () => {
  return (
    <>
      <Helmet>
        <title>Breach of Contract: Freelancer's Legal Guide | Legal Compass</title>
        <meta name="description" content="What to do when clients breach contracts. Learn about demand letters, legal remedies, and how freelancers can recover unpaid fees." />
        <meta name="keywords" content="breach of contract freelance, unpaid freelance work, freelancer legal rights, demand letter, contract dispute, recover unpaid fees" />
        <link rel="canonical" href="https://legalcompass.shop/resources/breach-of-contract-freelancers" />
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
                <span className="text-sm font-semibold">Contract Law</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Breach of Contract: Freelancer's Legal Guide
              </h1>
              <p className="text-lg text-muted-foreground">
                What to do when clients breach contracts, including demand letters and legal remedies.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <p className="text-lg font-medium text-foreground/90 bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                In this guide, you'll learn exactly what to do when a client violates your freelance contract. We cover the legal definition of breach, how to send a proper demand letter, available legal remedies, and proven strategies to recover your unpaid fees.
              </p>
              
              <p className="text-muted-foreground/90 italic">
                What makes this guide different: Unlike generic contract law resources, this guide is specifically tailored for freelancers and independent contractors. We focus on practical, cost-effective solutions that don't require expensive attorneys—helping you get paid without breaking the bank.
              </p>

              <p>
                As a freelancer, you rely on contracts to define project scope, payment terms, and deliverables. When clients fail to pay, refuse to accept work, or otherwise violate the agreement, they have committed a breach of contract. Understanding your legal rights and remedies can help you recover unpaid fees and protect your business.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">What Constitutes Breach of Contract?</h2>
              <p>
                A breach occurs when one party fails to fulfill their contractual obligations without a legal excuse. Common breaches freelancers face include nonpayment for completed work, late payment beyond agreed terms, refusal to pay the full amount, early termination without cause (when contract prohibits it), and rejection of work that meets contract specifications.
              </p>
              <p>
                For a breach claim to succeed, you must prove: (1) a valid contract existed (written or oral), (2) you performed your obligations under the contract, (3) the client failed to perform their obligations, and (4) you suffered damages as a result. Written contracts are strongly preferred because they're easier to prove in court.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Types of Breaches</h2>
              <p>
                <strong>Material breach:</strong> A significant violation that goes to the heart of the contract, such as complete nonpayment or refusing all deliverables. This allows you to terminate the contract and sue for damages.
              </p>
              <p>
                <strong>Minor breach:</strong> A small violation that doesn't destroy the contract's value, such as paying one day late. You can still sue for damages but typically can't terminate the contract.
              </p>
              <p>
                <strong>Anticipatory breach:</strong> When the client indicates in advance they won't fulfill their obligations (e.g., "We decided not to pay you"). You can sue immediately without waiting for the deadline.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Step 1: Send a Demand Letter</h2>
              <p>
                Before suing, send a formal demand letter. This demonstrates professionalism, creates a written record, and often resolves disputes without litigation. Your demand letter should include: your contact information and the client's details, the contract date and relevant terms, a clear description of the breach (with specific dates and amounts), the total amount owed (including any late fees per contract), a deadline to pay (typically 7-14 days), and a statement that you'll pursue legal action if not resolved.
              </p>
              <p>
                Send the letter via certified mail with return receipt, and keep a copy for your records. In your tone, be professional but firm—avoid emotional language and stick to facts. Reference specific contract clauses that were violated.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Legal Remedies Available to Freelancers</h2>
              <p>
                <strong>Compensatory damages:</strong> The amount you lost due to the breach, including unpaid fees, out-of-pocket expenses, and lost profits on related work.
              </p>
              <p>
                <strong>Liquidated damages:</strong> If your contract includes a clause specifying damages for breach (e.g., late payment penalties), courts will enforce reasonable amounts.
              </p>
              <p>
                <strong>Specific performance:</strong> Rarely available in service contracts, but possible if you're seeking the return of work product or intellectual property rights.
              </p>
              <p>
                <strong>Attorney's fees:</strong> Only recoverable if your contract includes an attorney's fees provision. Otherwise, you'll pay your own legal costs even if you win.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Small Claims Court for Freelancers</h2>
              <p>
                For unpaid invoices under your state's small claims limit ($3,000-$10,000), small claims court is fast, affordable, and doesn't require an attorney. To succeed, bring your contract or email agreements, invoices and payment records, proof of work delivery (emails, files, client acknowledgments), your demand letter and proof of delivery, and any communications showing the client accepted your work.
              </p>
              <p>
                Most freelancer breach cases are straightforward: you delivered work per the contract, the client didn't pay, and you're owed the invoice amount plus any contractual late fees. Judges understand these cases and often rule quickly.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">When to Hire an Attorney</h2>
              <p>
                Consider hiring a lawyer if the amount owed exceeds small claims limits, the contract involves complex terms or multiple parties, the client raises defenses like "work didn't meet specifications," you need to enforce intellectual property rights, or you're dealing with a business that might declare bankruptcy.
              </p>
              <p>
                Many lawyers offer contingency fees (they take a percentage if you win) or flat fees for demand letters ($300-$800). Get a free consultation to assess whether hiring counsel is cost-effective.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Preventing Future Breaches</h2>
              <p>
                <strong>Always use written contracts:</strong> Even simple agreements are better than verbal ones. Include payment terms, deliverable specifications, and dispute resolution clauses.
              </p>
              <p>
                <strong>Require deposits:</strong> Ask for 25-50% upfront, especially with new clients. This reduces your risk and demonstrates client commitment.
              </p>
              <p>
                <strong>Use milestone payments:</strong> For large projects, break payments into milestones tied to deliverables rather than doing all work upfront.
              </p>
              <p>
                <strong>Include late fees and interest:</strong> Add contract provisions for late payment (e.g., 1.5% monthly interest) to incentivize timely payment and compensate you for delays.
              </p>
              <p>
                <strong>Retain work until paid:</strong> Don't deliver final files until final payment clears. Provide previews or watermarked versions for client review.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Personalized Legal Research</h2>
              <p>
                Every contract breach is unique. If you're dealing with a client who won't pay or is disputing your work quality, <Link to="/auth" className="text-primary hover:underline font-semibold">Legal Compass AI</Link> can help you research contract law in your jurisdiction, draft an effective demand letter, and understand your legal options with case law citations.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/small-claims-court-process" className="text-primary hover:underline">
                  Small Claims Court Process
                </Link>
                <Link to="/resources/write-cease-desist-letter" className="text-primary hover:underline">
                  How to Write a Cease and Desist Letter
                </Link>
                <Link to="/resources/consumer-refund-rights" className="text-primary hover:underline">
                  Consumer Refund Rights
                </Link>
                <Link to="/" className="text-primary hover:underline">
                  Legal Compass Home
                </Link>
              </div>
            </div>

            <div className="mt-12 bg-primary/10 border-2 border-primary/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Client Won't Pay?</h3>
              <p className="text-muted-foreground mb-6">
                Get legal research on breach of contract remedies and demand letter templates.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Try Legal Compass AI Free
                </Button>
              </Link>
            </div>
          </article>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BreachOfContractFreelancers;
