import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AttorneyDashboard from "./pages/AttorneyDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Messages from "./pages/Messages";
import Conversation from "./pages/Conversation";
import ClientCaseView from "./pages/ClientCaseView";
import Pricing from "./pages/Pricing";
import Security from "./pages/Security";
import Bookmarks from "./pages/Bookmarks";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Sitemap from "./pages/Sitemap";
import Install from "./pages/Install";
import AdminDashboard from "./pages/AdminDashboard";
import Resources from "./pages/Resources";
import About from "./pages/About";
import GetStarted from "./pages/GetStarted";
import UserPortal from "./pages/UserPortal";
import LawyerSignup from "./pages/LawyerSignup";
import Templates from "./pages/Templates";
import LawyerDashboard from "./pages/LawyerDashboard";
import CaseManagement from "./pages/CaseManagement";
import { ClientCaseManagement } from "./components/ClientCaseManagement";
import Analytics from "./pages/Analytics";
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
import FileBankruptcy from "./pages/resources/FileBankruptcy";
import WorkersCompensation from "./pages/resources/WorkersCompensation";
import ChildSupport from "./pages/resources/ChildSupport";
import EmploymentDiscrimination from "./pages/resources/EmploymentDiscrimination";
import ExpungeCriminalRecord from "./pages/resources/ExpungeCriminalRecord";
import RestrainingOrderGuide from "./pages/resources/RestrainingOrderGuide";
import ProbateProcess from "./pages/resources/ProbateProcess";
import PowerOfAttorneyGuide from "./pages/resources/PowerOfAttorneyGuide";
import DUIDefenseGuide from "./pages/resources/DUIDefenseGuide";
import ReinstateDriversLicense from "./pages/resources/ReinstateDriversLicense";
import LLCFormationGuide from "./pages/resources/LLCFormationGuide";
import CustodyModificationGuide from "./pages/resources/CustodyModificationGuide";
import TrademarkRegistrationGuide from "./pages/resources/TrademarkRegistrationGuide";
import HarassmentLawGuide from "./pages/resources/HarassmentLawGuide";
import LegalResourcesTools from "./pages/resources/LegalResourcesTools";
import PersonalInjuryClaims from "./pages/resources/PersonalInjuryClaims";
import LandlordTenantDisputes from "./pages/resources/LandlordTenantDisputes";
import HowToFindAffordableLawyer from "./pages/resources/HowToFindAffordableLawyer";
import LawyerClientAcquisition from "./pages/resources/LawyerClientAcquisition";
import BestLegalLeadServices from "./pages/resources/BestLegalLeadServices";
import SoloAttorneyGrowth from "./pages/resources/SoloAttorneyGrowth";
import FindLawyers from "./pages/FindLawyers";
import AttorneyProfile from "./pages/AttorneyProfile";
import VerifyEmail from "./pages/VerifyEmail";
import CaseAnalyzer from "./pages/CaseAnalyzer";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-analyzer" element={<CaseAnalyzer />} />
          <Route path="/find-lawyers" element={<FindLawyers />} />
          <Route path="/attorney/:id" element={<AttorneyProfile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/conversation/:lead_id" element={<Conversation />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/attorney-dashboard" element={<ProtectedRoute><AttorneyDashboard /></ProtectedRoute>} />
          <Route path="/client-dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          <Route path="/conversation/:leadId" element={<ProtectedRoute><Conversation /></ProtectedRoute>} />
          <Route path="/case-view/:leadId" element={<ProtectedRoute><ClientCaseView /></ProtectedRoute>} />
          <Route path="/user-portal" element={<ProtectedRoute><UserPortal /></ProtectedRoute>} />
          <Route path="/lawyer-signup" element={<ProtectedRoute><LawyerSignup /></ProtectedRoute>} />
          <Route path="/lawyer-dashboard" element={<ProtectedRoute><LawyerDashboard /></ProtectedRoute>} />
          <Route path="/case/:leadId" element={<ProtectedRoute><CaseManagement /></ProtectedRoute>} />
          <Route path="/client-case/:leadId" element={<ProtectedRoute><ClientCaseManagement /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/security" element={<Security />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/install" element={<Install />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/how-to-find-affordable-lawyer" element={<HowToFindAffordableLawyer />} />
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
          <Route path="/resources/file-bankruptcy" element={<FileBankruptcy />} />
          <Route path="/resources/lawyer-client-acquisition" element={<LawyerClientAcquisition />} />
          <Route path="/resources/best-legal-lead-services" element={<BestLegalLeadServices />} />
          <Route path="/resources/solo-attorney-growth" element={<SoloAttorneyGrowth />} />
          <Route path="/resources/workers-compensation" element={<WorkersCompensation />} />
          <Route path="/resources/child-support" element={<ChildSupport />} />
          <Route path="/resources/employment-discrimination" element={<EmploymentDiscrimination />} />
          <Route path="/resources/expunge-criminal-record" element={<ExpungeCriminalRecord />} />
          <Route path="/resources/restraining-order-guide" element={<RestrainingOrderGuide />} />
          <Route path="/resources/probate-process" element={<ProbateProcess />} />
          <Route path="/resources/power-of-attorney-guide" element={<PowerOfAttorneyGuide />} />
          <Route path="/resources/dui-defense-guide" element={<DUIDefenseGuide />} />
          <Route path="/resources/reinstate-drivers-license" element={<ReinstateDriversLicense />} />
          <Route path="/resources/llc-formation-guide" element={<LLCFormationGuide />} />
          <Route path="/resources/custody-modification-guide" element={<CustodyModificationGuide />} />
          <Route path="/resources/trademark-registration-guide" element={<TrademarkRegistrationGuide />} />
          <Route path="/resources/harassment-law-guide" element={<HarassmentLawGuide />} />
          <Route path="/resources/legal-resources-tools" element={<LegalResourcesTools />} />
          <Route path="/resources/personal-injury-claims" element={<PersonalInjuryClaims />} />
          <Route path="/resources/landlord-tenant-disputes" element={<LandlordTenantDisputes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
