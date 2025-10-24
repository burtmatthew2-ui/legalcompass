import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <div className="bg-destructive/10 border-2 border-destructive/50 rounded-lg p-6 mb-8">
              <p className="text-destructive font-bold text-xl mb-2">⚠️ NO REFUND POLICY</p>
              <p className="text-destructive-foreground text-base leading-relaxed">
                All sales are final. Legal Compass does NOT offer refunds for any subscription payments, whether monthly or annual.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. No Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>ALL SALES ARE FINAL.</strong> By purchasing a subscription to Legal Compass, you acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>No refunds will be provided for any reason</li>
                <li>No partial refunds will be given for unused portions of a subscription period</li>
                <li>No refunds will be issued if you cancel your subscription mid-billing cycle</li>
                <li>No refunds will be provided due to dissatisfaction with the service</li>
                <li>No refunds will be given for technical issues or service interruptions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Subscription Cancellation</h2>
              <p className="text-muted-foreground leading-relaxed">
                While you may cancel your subscription at any time, please note:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>Cancellation will take effect at the end of your current billing period</li>
                <li>You will continue to have access to the service until the end of the paid period</li>
                <li>You will NOT receive a refund for any remaining days in your billing period</li>
                <li>Cancelled subscriptions will not automatically renew</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Billing and Payment</h2>
              <p className="text-muted-foreground leading-relaxed">
                By subscribing to Legal Compass:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>You authorize us to charge your payment method on a recurring basis</li>
                <li>Your subscription will automatically renew unless cancelled</li>
                <li>You are responsible for all charges incurred under your account</li>
                <li>Failed payments may result in service suspension</li>
                <li>All charges are non-refundable, including duplicate charges or billing errors (though we will work to correct billing errors)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Free Trials and Promotions</h2>
              <p className="text-muted-foreground leading-relaxed">
                If we offer a free trial or promotional period:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>You must cancel before the trial period ends to avoid being charged</li>
                <li>If you do not cancel, your payment method will be charged automatically</li>
                <li>No refunds will be provided if you forget to cancel before the trial ends</li>
                <li>Trial offers are limited to one per customer</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Service Changes</h2>
              <p className="text-muted-foreground leading-relaxed">
                Legal Compass reserves the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>Modify subscription pricing at any time (changes apply to new billing cycles)</li>
                <li>Change or discontinue features without refund</li>
                <li>Suspend or terminate service for violations of Terms of Service without refund</li>
                <li>Update this refund policy at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Chargebacks</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-destructive">WARNING:</strong> Initiating a chargeback or payment dispute:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>Will result in immediate termination of your account</li>
                <li>Will result in permanent ban from Legal Compass services</li>
                <li>May result in legal action to recover owed funds and associated costs</li>
                <li>Does not entitle you to a refund per this policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Exceptions</h2>
              <p className="text-muted-foreground leading-relaxed">
                The only exceptions to this no-refund policy are:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>Where required by applicable law</li>
                <li>At the sole discretion of Legal Compass management for extraordinary circumstances</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Any exceptions granted do not set a precedent and do not waive our right to enforce this policy in the future.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. How to Cancel</h2>
              <p className="text-muted-foreground leading-relaxed">
                To cancel your subscription:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>Log into your account</li>
                <li>Navigate to subscription settings</li>
                <li>Click &quot;Manage Subscription&quot; to access the Stripe customer portal</li>
                <li>Follow the cancellation process</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Remember: Cancelling does NOT entitle you to a refund for any portion of your subscription.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Questions</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this refund policy, please contact us through our support channels BEFORE purchasing 
                a subscription. By completing a purchase, you acknowledge that you have read, understood, and agree to this 
                no-refund policy.
              </p>
            </section>

            <div className="bg-accent/10 border border-accent/50 rounded-lg p-6 mt-8">
              <p className="text-accent-foreground font-semibold text-lg mb-2">By subscribing, you agree:</p>
              <ul className="list-disc list-inside text-accent-foreground/80 space-y-2">
                <li>That you have read and understood this no-refund policy</li>
                <li>That all payments are final and non-refundable</li>
                <li>To the automatic renewal of your subscription until cancelled</li>
                <li>That cancellation does not entitle you to any refund</li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground/70 mt-12">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
