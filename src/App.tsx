import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Products from "./pages/Products";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import BlogDashboard from "./pages/admin/blog/Dashboard";
import BlogList from "./pages/admin/blog/BlogList";
import BlogEditor from "./pages/admin/blog/BlogEditor";
import CategoriesTags from "./pages/admin/blog/CategoriesTags";
import MediaLibrary from "./pages/admin/blog/MediaLibrary";
import BlogSettings from "./pages/admin/blog/Settings";
import BlogUsers from "./pages/admin/blog/Users";
import BlogLogin from "./pages/admin/blog/Login";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ProtectedRoute from "./components/admin/ProtectedRoute";
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
          <Route path="/products" element={<Products />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route 
            path="/blog/admin" 
            element={<ProtectedRoute><BlogDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/blog/admin/posts" 
            element={<ProtectedRoute><BlogList /></ProtectedRoute>} 
          />
          <Route 
            path="/blog/admin/editor" 
            element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} 
          />
          <Route 
            path="/blog/admin/editor/:id" 
            element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} 
          />
          <Route 
            path="/blog/admin/categories" 
            element={<ProtectedRoute><CategoriesTags /></ProtectedRoute>} 
          />
          <Route 
            path="/blog/admin/media" 
            element={<ProtectedRoute><MediaLibrary /></ProtectedRoute>} 
          />
          <Route 
            path="/blog/admin/settings" 
            element={<ProtectedRoute><BlogSettings /></ProtectedRoute>} 
          />
          <Route 
            path="/blog/admin/users" 
            element={<ProtectedRoute><BlogUsers /></ProtectedRoute>} 
          />
          <Route path="/blog/admin/login" element={<BlogLogin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
