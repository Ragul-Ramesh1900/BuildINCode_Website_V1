import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['public-blogs'],
    queryFn: () => api.getBlogs({ status: 'published' })
  });

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const recentBlogs = blogs.slice(1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">Get the scoop</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay updated with the latest trends in technology, design, and digital transformation strategy.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border shadow-sm">
              <p className="text-muted-foreground">No blog posts found. Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Section (Featured Blog - 70% roughly) */}
              <div className="lg:col-span-8">
                {featuredBlog && (
                  <Link to={`/blog/${featuredBlog.slug}`} className="block group h-full">
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-border"
                    >
                      <div className="aspect-[16/10] bg-muted overflow-hidden relative">
                        {featuredBlog.featuredImage ? (
                          <img src={featuredBlog.featuredImage} alt={featuredBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-semibold tracking-widest bg-muted">
                            BUILDINCODE
                          </div>
                        )}
                      </div>
                      
                      <div className="p-8 md:p-10 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground mb-5">
                          <span className="text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider text-xs font-bold">{featuredBlog.category || "Technology"}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(featuredBlog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-foreground group-hover:text-primary transition-colors leading-tight">
                           {featuredBlog.title}
                        </h2>
                        
                        <p className="text-muted-foreground text-lg line-clamp-2 md:line-clamp-3 mb-8 flex-1 leading-relaxed">
                          {featuredBlog.excerpt || "Dive into our latest insights on digital architecture and professional development."}
                        </p>
                        
                        <div className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                          Read Full Article <ArrowRight size={16} />
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                )}
              </div>

              {/* Right Section (Recent Blogs List - 30% roughly) */}
              <div className="lg:col-span-4 flex flex-col">
                <h3 className="text-xl font-bold mb-6 text-foreground px-2 lg:px-0">Recent Posts</h3>
                <div className="flex flex-col flex-1 bg-card rounded-3xl p-6 shadow-sm border border-border">
                  {recentBlogs.map((blog: any, i: number) => (
                    <Link key={blog._id} to={`/blog/${blog.slug}`} className="group block">
                      <motion.article
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-5 items-center py-5 border-b border-border last:border-0 last:pb-0 first:pt-0"
                      >
                        <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-muted relative">
                          {blog.featuredImage ? (
                            <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] font-bold tracking-wider bg-muted">IMG</div>
                          )}
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground mb-2">
                            <span className="text-primary font-bold uppercase tracking-wider text-[10px]">{blog.category || "Design"}</span>
                            <span>•</span>
                            <span className="font-medium">{new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {blog.title}
                          </h4>
                        </div>
                      </motion.article>
                    </Link>
                  ))}
                  {recentBlogs.length === 0 && (
                     <div className="text-center py-10 text-muted-foreground italic text-sm">
                       No recent posts available.
                     </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
