import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Security from "./pages/Security";
import Bookmarks from "./pages/Bookmarks";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Install from "./pages/Install";
import AdminDashboard from "./pages/AdminDashboard";
import Resources from "./pages/Resources";
import TenantRightsCalifornia from "./pages/resources/TenantRightsCalifornia";
import TenantRightsNewYork from "./pages/resources/TenantRightsNewYork";
import TenantRightsTexas from "./pages/resources/TenantRightsTexas";
import TenantRightsFlorida from "./pages/resources/TenantRightsFlorida";
import FightSpeedingTicketCalifornia from "./pages/resources/FightSpeedingTicketCalifornia";
import FightSpeedingTicketTexas from "./pages/resources/FightSpeedingTicketTexas";
import FightSpeedingTicketNewYork from "./pages/resources/FightSpeedingTicketNewYork";
import SmallClaimsCourtProcess from "./pages/resources/SmallClaimsCourtProcess";
import EvictionNoticeLaws from "./pages/resources/EvictionNoticeLaws";
import SecurityDepositReturnTimeline from "./pages/resources/SecurityDepositReturnTimeline";
import BreachOfContractFreelancers from "./pages/resources/BreachOfContractFreelancers";
import DefamationOnlineReputation from "./pages/resources/DefamationOnlineReputation";
import DivorceCustodyBasics from "./pages/resources/DivorceCustodyBasics";
import ConsumerRefundRights from "./pages/resources/ConsumerRefundRights";
import WriteCeaseDesistLetter from "./pages/resources/WriteCeaseDesistLetter";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/security" element={<Security />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/install" element={<Install />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/tenant-rights-california" element={<TenantRightsCalifornia />} />
          <Route path="/resources/tenant-rights-new-york" element={<TenantRightsNewYork />} />
          <Route path="/resources/tenant-rights-texas" element={<TenantRightsTexas />} />
          <Route path="/resources/tenant-rights-florida" element={<TenantRightsFlorida />} />
          <Route path="/resources/fight-speeding-ticket-california" element={<FightSpeedingTicketCalifornia />} />
          <Route path="/resources/fight-speeding-ticket-texas" element={<FightSpeedingTicketTexas />} />
          <Route path="/resources/fight-speeding-ticket-new-york" element={<FightSpeedingTicketNewYork />} />
          <Route path="/resources/small-claims-court-process" element={<SmallClaimsCourtProcess />} />
          <Route path="/resources/eviction-notice-laws" element={<EvictionNoticeLaws />} />
          <Route path="/resources/security-deposit-return-timeline" element={<SecurityDepositReturnTimeline />} />
          <Route path="/resources/breach-of-contract-freelancers" element={<BreachOfContractFreelancers />} />
          <Route path="/resources/defamation-online-reputation" element={<DefamationOnlineReputation />} />
          <Route path="/resources/divorce-custody-basics" element={<DivorceCustodyBasics />} />
          <Route path="/resources/consumer-refund-rights" element={<ConsumerRefundRights />} />
          <Route path="/resources/write-cease-desist-letter" element={<WriteCeaseDesistLetter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
