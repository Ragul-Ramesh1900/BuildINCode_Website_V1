import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['public-blogs'],
    queryFn: () => api.getBlogs({ status: 'published' })
  });

  const categories: string[] = ["All", ...Array.from(new Set(blogs.map((b: any) => b.category).filter(Boolean))) as string[]];

  const filteredBlogs = blogs.filter((blog: any) => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory || (blog.category && selectedCategory.toLowerCase().includes(blog.category.toLowerCase()));
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchLower || 
                          (blog.title && blog.title.toLowerCase().includes(searchLower)) || 
                          (blog.excerpt && blog.excerpt.toLowerCase().includes(searchLower));
                          
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const nextThreeBlogs = filteredBlogs.slice(1, 4);
  const remainingBlogs = filteredBlogs.slice(4);

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

          <div className="flex items-center gap-4 mb-10 md:mb-16">
            {isSearchOpen ? (
              <div className="flex-1 flex items-center h-[3rem] md:h-[3.2rem] border border-border rounded-[0.85rem] px-4 bg-card">
                <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search the blog..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-foreground w-full h-full placeholder:text-muted-foreground"
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 px-6 py-2.5 md:py-3 rounded-[0.85rem] border text-[14px] md:text-[15px] font-semibold transition-all duration-200 ${
                      selectedCategory === cat 
                        ? 'bg-primary border-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)]' 
                        : 'bg-card border-border text-foreground hover:border-primary/50 hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) {
                  setSearchQuery(""); // Clear search when closing
                }
              }}
              className="h-[3rem] w-[3rem] md:w-[3.2rem] md:h-[3.2rem] shrink-0 flex items-center justify-center rounded-[0.85rem] bg-primary text-primary-foreground border border-primary hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Search className="w-5 h-5 md:w-5 md:h-5" />
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border shadow-sm">
              <p className="text-muted-foreground text-lg mb-2">No blog posts found.</p>
              <p className="text-muted-foreground text-sm">Try adjusting your search or switching categories.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-16 md:gap-24">
              {/* Top Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16">
                {/* Left Section (Featured Blog - ~60%) */}
                <div className="lg:col-span-7">
                  {featuredBlog && (
                    <Link to={`/blog/${featuredBlog.slug}`} className="block group">
                      <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col"
                      >
                        <div className="aspect-[16/10] bg-muted rounded-2xl md:rounded-3xl overflow-hidden relative mb-6">
                          {featuredBlog.featuredImage ? (
                            <img src={featuredBlog.featuredImage} alt={featuredBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-semibold tracking-widest bg-muted">
                              BUILDINCODE
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm md:text-base font-medium text-muted-foreground mb-3">
                          <span className="text-primary">{featuredBlog.category || "Technology"}</span>
                          <span>•</span>
                          <span>{new Date(featuredBlog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold mb-4 text-foreground group-hover:text-primary transition-colors leading-tight">
                           {featuredBlog.title}
                        </h2>
                        
                        <p className="text-muted-foreground md:text-lg line-clamp-3 leading-relaxed">
                          {featuredBlog.excerpt || "Dive into our latest insights on digital architecture and professional development."}
                        </p>
                      </motion.article>
                    </Link>
                  )}
                </div>

                {/* Right Section (Next 3 Blogs List - ~40%) */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex flex-col divide-y divide-border h-full justify-between">
                    {nextThreeBlogs.map((blog: any, i: number) => (
                      <Link key={blog._id} to={`/blog/${blog.slug}`} className="group block py-6 first:pt-0 last:pb-0">
                        <motion.article
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-5 sm:gap-6 items-center h-full"
                        >
                          <div className="w-32 h-24 sm:w-[180px] sm:h-[120px] shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-muted relative">
                            {blog.featuredImage ? (
                              <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] font-bold tracking-wider bg-muted">IMG</div>
                            )}
                          </div>
                          <div className="flex flex-col justify-center flex-1">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-muted-foreground mb-2">
                              <span className="text-primary">{blog.category || "Design"}</span>
                              <span>•</span>
                              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <h4 className="text-base sm:text-lg xl:text-xl font-bold text-foreground group-hover:text-primary transition-colors xl:leading-snug">
                              {blog.title}
                            </h4>
                          </div>
                        </motion.article>
                      </Link>
                    ))}
                    {nextThreeBlogs.length === 0 && (
                       <div className="text-center py-10 text-muted-foreground italic text-sm">
                         No recent posts available.
                       </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Section (Remaining Blogs) */}
              {remainingBlogs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16">
                  {remainingBlogs.map((blog: any, i: number) => (
                    <Link key={blog._id} to={`/blog/${blog.slug}`} className="group block">
                      <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex flex-col h-full"
                      >
                        <div className="aspect-[16/10] bg-muted rounded-2xl md:rounded-3xl overflow-hidden relative mb-5">
                          {blog.featuredImage ? (
                            <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-semibold tracking-widest bg-muted">
                              IMG
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm md:text-base font-medium text-muted-foreground mb-3">
                          <span className="text-primary">{blog.category || "Technology"}</span>
                          <span>•</span>
                          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        
                        <h3 className="text-2xl lg:text-[1.75rem] font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
                           {blog.title}
                        </h3>
                        
                        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                          {blog.excerpt || "Dive into our latest insights on digital architecture and professional development."}
                        </p>
                      </motion.article>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
