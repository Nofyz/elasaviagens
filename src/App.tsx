import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DestinationDetail from "./pages/DestinationDetail";
import RegisterDestination from "./pages/RegisterDestination";
import NotFound from "./pages/NotFound";
import { DatabaseTest } from "./components/DatabaseTest";
import { SimpleTest } from "./components/SimpleTest";
import { ConfigTest } from "./components/ConfigTest";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CreateAdmin from "./components/CreateAdmin";
import EditDestination from "./pages/EditDestination";
import TestDelete from "./components/TestDelete";
import PermissionTest from "./components/PermissionTest";
import RLSFix from "./components/RLSFix";
import ErrorBoundary from "./components/ErrorBoundary";


const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/loja" element={<Shop />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/termos-de-uso" element={<TermsOfService />} />
          <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
          <Route path="/destino/:slug" element={<DestinationDetail />} />
          <Route path="/registrar-destino" element={<RegisterDestination />} />
          <Route path="/teste-banco" element={<DatabaseTest />} />
          <Route path="/teste-simples" element={<SimpleTest />} />
          <Route path="/teste-config" element={<ConfigTest />} />
          
          {/* Rotas Administrativas */}
          <Route path="/admin/create" element={<CreateAdmin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/destinations/edit/:id" element={<EditDestination />} />

          <Route path="/teste-deletar" element={<TestDelete />} />
          <Route path="/teste-permissoes" element={<PermissionTest />} />
          <Route path="/corrigir-rls" element={<RLSFix />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
    </ErrorBoundary>
);

export default App;
