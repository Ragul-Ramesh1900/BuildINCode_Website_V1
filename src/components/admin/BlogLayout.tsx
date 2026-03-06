import { ReactNode } from "react";
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
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="flex items-center gap-4">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</button>
            <div className="w-px h-4 bg-border" />
            <button className="text-sm font-medium text-primary hover:underline">View Site</button>
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
