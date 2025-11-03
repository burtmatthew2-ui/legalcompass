import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Home, Scale } from "lucide-react";
import { Helmet } from "react-helmet";

const SmallClaimsCourtProcess = () => {
  return (
    <>
      <Helmet>
        <title>Small Claims Court Process: Complete Guide for All 50 States | Legal Compass</title>
        <meta name="description" content="Step-by-step guide to filing and winning in small claims court. Learn about filing fees, claim limits, evidence, and trial procedures." />
        <meta name="keywords" content="small claims court process, how to file small claims, small claims lawsuit, small claims court guide, sue in small claims" />
        <link rel="canonical" href="https://legalcompass.shop/resources/small-claims-court-process" />
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
                <span className="text-sm font-semibold">Court Procedures</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Small Claims Court: Complete Guide to Filing and Winning
              </h1>
              <p className="text-lg text-muted-foreground">
                Step-by-step instructions for navigating small claims court in all 50 states.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <p>
                Small claims court provides an affordable, streamlined way to resolve disputes without hiring an attorney. Whether you're suing for property damage, breach of contract, unpaid wages, or security deposit issues, small claims court offers a simplified process designed for everyday people. This guide walks you through every step, from filing to winning your case.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Understanding Small Claims Court Limits</h2>
              <p>
                Small claims courts have maximum dollar limits that vary by state, typically ranging from $2,500 to $25,000. California allows claims up to $10,000 (or $5,000 if you've filed more than twice in a year), Texas allows up to $20,000, New York allows up to $10,000 in most courts, and Florida allows up to $8,000. Check your state's limit before filing—if your claim exceeds the maximum, you'll need to file in a higher court or reduce your claim to the allowable limit.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Step 1: Determine If You Have a Valid Claim</h2>
              <p>
                Before filing, ensure you have a legitimate legal claim. Common small claims cases include breach of contract (failure to pay for services or goods), property damage (damage to your vehicle or home), security deposit disputes, unpaid loans or debts, and personal injury (within the dollar limit). You must be able to prove that the defendant owes you money or damaged your property, and that you suffered actual financial harm.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Step 2: Send a Demand Letter</h2>
              <p>
                Many courts require you to attempt resolution before filing. Send the defendant a formal demand letter explaining the dispute, the amount owed, the deadline to pay (typically 10-30 days), and a warning that you'll file in small claims court if they don't respond. Keep a copy of the letter and proof of delivery (certified mail with return receipt is ideal). This demonstrates good faith and may result in settlement without trial.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Step 3: File Your Claim</h2>
              <p>
                To file, visit your local small claims court clerk's office or file online (if available). You'll need the defendant's full legal name and address, a clear statement of your claim including specific dollar amount, supporting documentation (contracts, receipts, photos), and the filing fee (typically $30-$100, varying by state and claim amount).
              </p>
              <p>
                Your claim must be filed in the correct jurisdiction—usually where the defendant lives, where the contract was signed, or where the incident occurred. Be specific and factual in your claim statement, avoiding emotional language.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Step 4: Serve the Defendant</h2>
              <p>
                After filing, you must legally notify the defendant by "serving" them with the lawsuit papers. Most states require personal service by a process server, sheriff, or any adult not involved in the case (not you). Certified mail is allowed in some states but not recommended, as defendants can refuse delivery. Proof of service must be filed with the court before your hearing.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Step 5: Prepare Your Evidence</h2>
              <p>
                Organize your evidence into a clear, logical presentation. Bring multiple copies of all documents, including contracts, receipts, emails, photos, repair estimates, and bank statements. Prepare a timeline of events, witness testimony (bring witnesses or written statements), and a clear calculation of damages. Create an outline of your arguments and practice explaining your case concisely.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Step 6: Present Your Case at Trial</h2>
              <p>
                On the hearing date, arrive early, dress professionally, and bring all evidence and witnesses. The judge will ask you to present your case first. Speak clearly and stick to the facts. Explain what happened, why the defendant owes you money, and present your evidence. The defendant will then present their defense. You may have a chance to rebut their arguments. The judge may ask questions—answer honestly and directly.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Step 7: Collecting Your Judgment</h2>
              <p>
                If you win, the court issues a judgment in your favor. However, the court doesn't collect the money for you. If the defendant doesn't pay voluntarily, you may need to use collection methods such as wage garnishment, bank account levy, property liens, or seizing personal property. Each method requires filing additional paperwork with the court and may involve additional fees.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Personalized Legal Research</h2>
              <p>
                Small claims procedures vary significantly by state and county. If you need specific guidance on filing requirements, evidence rules, or collection procedures, <Link to="/auth" className="text-primary hover:underline font-semibold">Legal Compass AI</Link> can provide detailed legal research tailored to your jurisdiction.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/breach-of-contract-freelancers" className="text-primary hover:underline">
                  Breach of Contract: Freelancer's Guide
                </Link>
                <Link to="/resources/security-deposit-return-timeline" className="text-primary hover:underline">
                  Security Deposit Return Timeline
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
              <h3 className="text-2xl font-bold mb-3">Need State-Specific Court Guidance?</h3>
              <p className="text-muted-foreground mb-6">
                Get personalized small claims court research for your state with Legal Compass AI.
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

export default SmallClaimsCourtProcess;
