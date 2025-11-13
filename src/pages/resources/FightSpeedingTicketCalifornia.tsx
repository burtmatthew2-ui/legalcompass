import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Home, Scale } from "lucide-react";
import { Helmet } from "react-helmet";

const FightSpeedingTicketCalifornia = () => {
  return (
    <>
      <Helmet>
        <title>How to Fight a Speeding Ticket in California | Legal Compass</title>
        <meta name="description" content="Step-by-step guide to contesting speeding tickets in California. Learn about trial by written declaration, traffic school, and effective defenses." />
        <meta name="keywords" content="fight speeding ticket California, contest traffic ticket CA, California traffic court, trial by written declaration, speeding ticket defense" />
        <link rel="canonical" href="https://legalcompass.shop/resources/fight-speeding-ticket-california" />
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
                <span className="text-sm font-semibold">Traffic Law</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                How to Fight a Speeding Ticket in California
              </h1>
              <p className="text-lg text-muted-foreground">
                Proven strategies to contest California speeding tickets and traffic violations.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                <p className="text-lg font-medium mb-3">
                  What You'll Learn on This Page
                </p>
                <p className="text-muted-foreground">
                  Master California's unique Trial by Written Declaration process, understand traffic school eligibility, and learn effective defenses against speeding tickets—all without stepping foot in court.
                </p>
              </div>

              <div className="bg-card border border-border/50 p-6 rounded-lg mb-8">
                <p className="text-muted-foreground italic">
                  <strong>What makes this guide unique:</strong> California is the ONLY state that lets you fight a ticket without ever appearing in court through Trial by Written Declaration—and if you lose, you get a do-over with an in-person trial. We show you exactly how to use this two-shot strategy to beat or reduce your ticket.
                </p>
              </div>

              <p>
                That speeding ticket you just got? It's gonna cost way more than the number printed on it. California fines balloon with court fees and penalty assessments—a "$35 ticket" becomes $500 real fast. Plus points on your license mean insurance hikes for years. But here's the thing: you've got options most people don't even know exist.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Your Three Options After Receiving a Ticket</h2>
              <p>
                When you receive a California speeding ticket, you have three choices: (1) pay the fine and accept the conviction, (2) attend traffic school to mask the point on your record (if eligible), or (3) contest the ticket in court. If you choose to fight the ticket, you must respond before the "Courtesy Notice" deadline, typically within 21 days.
              </p>
              <p>
                Most people don't realize that you can fight a traffic ticket without ever appearing in court through a process called "Trial by Written Declaration" under California Vehicle Code § 40902. This is often the best first step because if you lose, you can still request an in-person trial (called a "trial de novo").
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Trial by Written Declaration</h2>
              <p>
                In a Trial by Written Declaration, both you and the citing officer submit written statements to the court, and a judge decides based on those statements alone. The officer often doesn't submit a statement, which significantly increases your chances of dismissal. Studies show that officers fail to respond in 20-30% of cases, resulting in automatic dismissal.
              </p>
              <p>
                To request a Trial by Written Declaration, you must submit form TR-205 along with the full bail amount (refundable if you win). In your written statement, challenge the officer's observations, question the radar/lidar calibration and maintenance records, and provide any evidence that creates reasonable doubt about the violation.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Common Defenses to Speeding Tickets</h2>
              <p>
                <strong>Radar/Lidar Calibration Issues:</strong> Officers must calibrate speed measurement devices before and after each shift. Request calibration records and training certifications. If the device wasn't properly calibrated or the officer wasn't trained, the speed reading may be unreliable.
              </p>
              <p>
                <strong>Mistaken Identity:</strong> In heavy traffic, the radar may have detected another vehicle's speed. Argue that the officer couldn't have accurately identified your vehicle as the source of the radar reading.
              </p>
              <p>
                <strong>Pacing Error:</strong> If the officer claims to have paced you, challenge the accuracy of their speedometer calibration and whether they maintained a consistent distance while pacing.
              </p>
              <p>
                <strong>Necessity Defense:</strong> You may argue that you had to speed to avoid imminent danger, such as merging safely or avoiding an aggressive driver.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">In-Person Trial Strategy</h2>
              <p>
                If your Trial by Written Declaration is unsuccessful, you can request a Trial de novo (new trial) within 20 days. In court, the officer must prove beyond a reasonable doubt that you committed the violation. Many officers don't appear, resulting in dismissal. If the officer does appear, cross-examine them about device calibration, training, weather conditions, and whether they have independent recollection of your specific stop.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Traffic School Option</h2>
              <p>
                If eligible, attending traffic school can be a practical alternative. California allows you to attend traffic school once every 18 months to keep the point off your record. This prevents insurance rate increases, though you still pay the fine. Traffic school is typically 8 hours and can be completed online.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Personalized Legal Research</h2>
              <p>
                Every traffic ticket case has unique circumstances. If you want to research specific defenses, analyze the citing officer's history, or understand California Vehicle Code sections relevant to your situation, <Link to="/auth" className="text-primary hover:underline font-semibold">Legal Compass AI</Link> can provide detailed legal research with case law citations.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/fight-speeding-ticket-texas" className="text-primary hover:underline">
                  Fight Speeding Ticket in Texas
                </Link>
                <Link to="/resources/fight-speeding-ticket-new-york" className="text-primary hover:underline">
                  Fight Speeding Ticket in New York
                </Link>
                <Link to="/resources/small-claims-court-process" className="text-primary hover:underline">
                  Small Claims Court Process
                </Link>
                <Link to="/" className="text-primary hover:underline">
                  Legal Compass Home
                </Link>
              </div>
            </div>

            <div className="mt-12 bg-primary/10 border-2 border-primary/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Need Help Fighting Your Ticket?</h3>
              <p className="text-muted-foreground mb-6">
                Get legal research on California traffic law defenses with Legal Compass AI.
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

export default FightSpeedingTicketCalifornia;
