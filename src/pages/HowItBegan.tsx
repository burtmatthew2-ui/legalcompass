import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { AlertCircle, Heart, Scale, ShieldAlert } from "lucide-react";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

const HowItBegan = () => {
  return (
    <>
      <Helmet>
        <title>How It Began - The Story Behind Legal Compass</title>
        <meta name="description" content="The personal story of how Legal Compass was born from a founder's struggle with the legal system, fighting for constitutional rights while being punished for poverty." />
        <link rel="canonical" href="https://legalcompass.shop/how-it-began" />
        
        <meta property="og:title" content="How It Began - The Story Behind Legal Compass" />
        <meta property="og:description" content="From speeding tickets to suspended licenses - the real story of how one person's legal struggle inspired a platform to help millions." />
        <meta property="og:url" content="https://legalcompass.shop/how-it-began" />
        
        <meta name="twitter:title" content="How It Began - The Story Behind Legal Compass" />
        <meta name="twitter:description" content="From speeding tickets to suspended licenses - the real story of how one person's legal struggle inspired a platform to help millions." />
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <BreadcrumbNav />

          <div className="text-center mb-12 mt-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Began</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The real story behind Legal Compass - born from struggle, built with purpose
            </p>
          </div>

          <Card className="p-8 md:p-12 space-y-8 bg-card/50 backdrop-blur">
            {/* The First Stop */}
            <section className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">It Started With a Traffic Stop</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    One ordinary day, I was driving with my fiancée when red and blue lights flashed behind me. South Side Police Department. I was going 25 over the speed limit - I won't lie about that. But the officer showed me a kindness I didn't expect: instead of citing me for reckless endangerment, he only wrote me up for speeding.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    I showed him my insurance card - Hugo, a pay-as-you-go insurance service. Everything seemed fine. I had just lost my job a few weeks before, but I had my insurance. I thought this was just a bad day that would pass.
                  </p>
                  <p className="text-foreground/90 leading-relaxed font-medium text-destructive mt-4">
                    I was wrong. This was the beginning of getting trapped in the legal system.
                  </p>
                </div>
              </div>
            </section>

            {/* The Trap Tightens */}
            <section className="space-y-4 border-l-4 border-destructive pl-8">
              <h2 className="text-2xl font-bold">The Trap Tightens</h2>
              <p className="text-foreground/90 leading-relaxed">
                A few months later, a letter arrived from the State of Alabama. My heart sank as I read it: at the time of the stop, my insurance had expired. I owed a $300 fine, or they would suspend my license.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                $300. I was unemployed. I couldn't pay the original ticket. I couldn't pay this either.
              </p>
              <p className="text-foreground/90 leading-relaxed font-medium">
                They suspended my license.
              </p>
            </section>

            {/* The Spiral */}
            <section className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <ShieldAlert className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">When Poverty Becomes a Crime</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Here's the cruel irony: I didn't know my license had been suspended. I was still looking for work, still trying to survive. A few months later, Oxford PD pulled me over. Driving while suspended.
                  </p>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The court ordered me to pay $50 a month. Oxford won't accept anything less. I couldn't pay that either.
                  </p>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    So I started recycling - collecting scrap metal to earn enough for bills, tickets, fines. But to find scrap, I had to drive. And to drive without a license meant risking everything.
                  </p>
                  <p className="text-foreground/90 leading-relaxed font-medium text-destructive">
                    Glencoe, Alabama. Third ticket for driving while suspended. This time, $1,500 - with a 180-day suspended jail sentence hanging over my head.
                  </p>
                </div>
              </div>
            </section>

            {/* The Breaking Point */}
            <section className="space-y-4 bg-muted/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold">The Absurdity</h2>
              <div className="space-y-3 text-foreground/90">
                <p className="leading-relaxed">
                  Let me paint you the picture of the trap:
                </p>
                <ul className="space-y-2 ml-6 list-disc marker:text-destructive">
                  <li>I couldn't pay my first ticket because I had no job</li>
                  <li>I couldn't pay the insurance fine because I had no money</li>
                  <li>They suspended my license because I couldn't pay</li>
                  <li>I got more tickets because I had to drive to survive</li>
                  <li>I couldn't pay those tickets either</li>
                  <li>Glencoe is 45 minutes away - how am I supposed to get there if I can't drive?</li>
                  <li>I faced 180 days in jail if I didn't come up with $1,500</li>
                </ul>
                <p className="leading-relaxed font-medium italic mt-4">
                  I was being punished for being poor. Not unwilling to pay - unable to pay. There's a critical difference.
                </p>
              </div>
            </section>

            {/* The Discovery */}
            <section className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">A Light in the Darkness</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I was stressed every single day, convinced I was going to jail. Then I heard about AI coding tools - and had an idea. What if I could build something that researches up-to-date legal databases, finds laws, discovers loopholes? Something that could help people like me?
                  </p>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I started building a legal AI assistant. And it told me something crucial: <span className="font-medium text-primary">I have a constitutional right to request an ability-to-pay hearing</span>. I wasn't being "unwilling" - I was "unable." That's protected.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    I went to court and asked the judge for an ability-to-pay hearing. He deflected: "Go see the CRO lady, she'll help you find a job." When I couldn't make payments, he threatened me with contempt of court.
                  </p>
                  <p className="text-foreground/90 leading-relaxed font-medium text-primary mt-4">
                    I went back to my AI. It confirmed what I suspected: the judge violated my constitutional rights by denying my ability-to-pay hearing.
                  </p>
                </div>
              </div>
            </section>

            {/* Why Legal Compass Exists */}
            <section className="space-y-4 bg-primary/5 rounded-lg p-8 border-2 border-primary/20">
              <h2 className="text-2xl font-bold text-primary">Why Legal Compass Exists</h2>
              <div className="space-y-4 text-foreground/90">
                <p className="leading-relaxed text-lg">
                  This is why I built Legal Compass. Not because I had funding or a grand business plan. Because I lived it. Because I know what it's like to be:
                </p>
                <ul className="space-y-2 ml-6 list-disc marker:text-primary text-lg">
                  <li>Trapped by poverty in a system designed to extract money you don't have</li>
                  <li>Threatened with jail for being unable, not unwilling, to pay</li>
                  <li>Denied your constitutional rights by the very people sworn to uphold them</li>
                  <li>Left with nowhere to turn because lawyers are too expensive</li>
                  <li>Desperate for answers, for hope, for someone to tell you what to do</li>
                </ul>
                <p className="leading-relaxed text-lg font-medium mt-6">
                  If you're reading this and you're in a similar situation - drowning in fines you can't pay, losing your license, being threatened with jail - please know this:
                </p>
                <p className="leading-relaxed text-lg text-primary font-bold">
                  You're not alone. You have rights. And we're here to help you fight back.
                </p>
              </div>
            </section>

            {/* Current Status */}
            <section className="space-y-4 text-center border-t pt-8">
              <p className="text-muted-foreground leading-relaxed">
                As I write this, I'm still fighting my case. Still developing this platform. Still hoping we can get through this ordeal - and help millions of others who are trapped in the same system.
              </p>
              <p className="text-foreground font-medium text-lg mt-4">
                This isn't just a business. It's a mission. It's personal.
              </p>
              <p className="text-primary font-bold text-xl">
                Welcome to Legal Compass.
              </p>
            </section>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default HowItBegan;
