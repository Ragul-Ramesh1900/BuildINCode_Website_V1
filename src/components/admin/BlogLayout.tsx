import { ReactNode } from "react";
import { Link } from "react-router-dom";
import BlogSidebar from "./BlogSidebar";
import { Toaster } from "@/components/ui/sonner";

interface BlogLayoutProps {
  children: ReactNode;
  title: string;
}

const BlogLayout = ({ children, title }: BlogLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <BlogSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-8 z-40">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="flex items-center gap-4">
            <Link to="/" target="_blank" className="text-sm font-medium text-primary hover:underline">View Site</Link>
          </div>
        </header>
        <div className="p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default BlogLayout;
