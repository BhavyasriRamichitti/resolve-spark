import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CreateRequest from "./pages/CreateRequest";
import RequestTracking from "./pages/RequestTracking";
import ServiceCatalog from "./pages/ServiceCatalog";
import Analytics from "./pages/Analytics";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          } />
          <Route path="/requests" element={
            <SignedIn>
              <RequestTracking />
            </SignedIn>
          } />
          <Route path="/create-request" element={
            <SignedIn>
              <CreateRequest />
            </SignedIn>
          } />
          <Route path="/service-catalog" element={
            <SignedIn>
              <ServiceCatalog />
            </SignedIn>
          } />
          <Route path="/analytics" element={
            <SignedIn>
              <Analytics />
            </SignedIn>
          } />
          <Route path="/users" element={
            <SignedIn>
              <UserManagement />
            </SignedIn>
          } />
          <Route path="/settings" element={
            <SignedIn>
              <Settings />
            </SignedIn>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
