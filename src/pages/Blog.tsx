import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['public-blogs'],
    queryFn: () => api.getBlogs({ status: 'published' })
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Insights & <span className="text-gradient">Innovations</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay updated with the latest trends in technology, design, and digital transformation.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: any, i: number) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all flex flex-col"
                >
                  <div className="aspect-video bg-muted overflow-hidden relative">
                    {blog.featuredImage ? (
                      <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                         DF BLOG
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                        {blog.category || "Uncategorized"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1.5"><User size={14} /> {blog.author || "Admin"}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                       {blog.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                      {blog.excerpt || "Dive into our latest insights on digital architecture and professional development."}
                    </p>
                    
                    <Link 
                      to={`/blog/${blog.slug}`} 
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                    >
                      Read Full Article <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
          
          {!isLoading && blogs.length === 0 && (
            <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground">No blog posts found. Check back later!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
