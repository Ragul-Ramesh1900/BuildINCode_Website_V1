import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => api.getBlogBySlug(slug!),
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-10">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-20 px-4">
        <article className="container mx-auto max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Insights
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-2"><User size={16} className="text-primary" /> {blog.author || "Admin"}</span>
              <span className="flex items-center gap-2"><Tag size={16} className="text-primary" /> {blog.category || "General"}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
              {blog.title}
            </h1>

            {blog.featuredImage && (
              <div className="rounded-3xl overflow-hidden aspect-[21/9] mb-12 shadow-2xl">
                <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}
          </header>

          <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          
          <footer className="mt-16 pt-8 border-t border-border flex flex-wrap gap-4">
            {blog.tags?.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-secondary rounded-lg text-xs font-semibold">#{tag}</span>
            ))}
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
