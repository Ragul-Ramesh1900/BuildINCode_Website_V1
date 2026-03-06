import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import BlogDashboard from "./pages/admin/blog/Dashboard";
import BlogList from "./pages/admin/blog/BlogList";
import BlogEditor from "./pages/admin/blog/BlogEditor";
import CategoriesTags from "./pages/admin/blog/CategoriesTags";
import MediaLibrary from "./pages/admin/blog/MediaLibrary";
import BlogSettings from "./pages/admin/blog/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/blog" element={<BlogDashboard />} />
          <Route path="/admin/blog/posts" element={<BlogList />} />
          <Route path="/admin/blog/editor" element={<BlogEditor />} />
          <Route path="/admin/blog/editor/:id" element={<BlogEditor />} />
          <Route path="/admin/blog/categories" element={<CategoriesTags />} />
          <Route path="/admin/blog/media" element={<MediaLibrary />} />
          <Route path="/admin/blog/settings" element={<BlogSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
