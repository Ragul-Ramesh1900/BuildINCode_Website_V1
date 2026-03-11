import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag, Linkedin, Instagram, Facebook, Sparkles, Hash, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const SEOTags = ({ title, description, url, image }: { title: string, description: string, url: string, image?: string }) => {
  useEffect(() => {
    document.title = title ? `${title} | BuildINCode` : 'BuildINCode Blog';
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description || '');

    // Update OpenGraph tags
    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', title);
    updateOGTag('og:description', description || '');
    updateOGTag('og:url', url || window.location.href);
    updateOGTag('og:type', 'article');
    if (image) {
      updateOGTag('og:image', image);
    }
  }, [title, description, url, image]);

  return null;
}

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
);

const BlogPost = () => {
  const { slug } = useParams();
  const [headings, setHeadings] = useState<{ id: string, text: string, level: number }[]>([]);
  const [isTocOpen, setIsTocOpen] = useState(true);

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => api.getBlogBySlug(slug!),
    enabled: !!slug
  });

  useEffect(() => {
    if (blog?.content && !isLoading) {
      // Small timeout to ensure DOM is updated with dangerouslySetInnerHTML
      const timer = setTimeout(() => {
        const contentEl = document.getElementById('blog-content-body');
        if (contentEl) {
          const headingEls = Array.from(contentEl.querySelectorAll('h2, h3'));
          const extractedHeadings = headingEls.map((el, index) => {
            if (!el.id) {
              const text = el.textContent || '';
              el.id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `heading-${index}`;
            }
            return {
              id: el.id,
              text: el.textContent || '',
              level: el.tagName === 'H2' ? 2 : 3
            };
          });
          setHeadings(extractedHeadings);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [blog, isLoading]);

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

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
          <h1 className="text-4xl font-bold mb-4 text-foreground">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOTags 
        title={blog.title} 
        description={blog.excerpt || 'Blog article from BuildINCode'} 
        url={window.location.href} 
        image={blog.featuredImage} 
      />
      <Navbar />
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group font-medium text-sm">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Insights
          </Link>

          <header className="mb-12 max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground mb-6">
              <span className="text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-extrabold">{blog.category || "General"}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1.5"><User size={14} className="text-primary" /> {blog.author || "Admin"}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8 text-foreground tracking-tight">
              {blog.title}
            </h1>
          </header>

          {/* Grid Layout: Sidebar + Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative items-start">
            
            {/* Left Sidebar (Sticky Table of Contents & Social) */}
            <aside className="lg:col-span-3 lg:sticky lg:top-32 h-fit order-2 lg:order-1 mt-12 lg:mt-0">
              <div className="bg-card rounded-3xl p-6 shadow-sm border border-border flex flex-col gap-8">
                
                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div>
                    <button 
                      onClick={() => setIsTocOpen(!isTocOpen)}
                      className="w-full flex items-center justify-between text-sm font-bold text-foreground uppercase tracking-widest mb-4 hover:text-primary transition-colors"
                    >
                       Table of Contents
                       <ChevronRight size={16} className={`transition-transform duration-300 ${isTocOpen ? 'rotate-90 text-primary' : 'text-muted-foreground'}`} />
                    </button>
                    {isTocOpen && (
                      <ul className="space-y-3 animate-in slide-in-from-top-2 fade-in duration-300 origin-top">
                        {headings.map(heading => (
                          <li key={heading.id} className={`${heading.level === 3 ? 'ml-4' : ''}`}>
                            <a 
                              href={`#${heading.id}`}
                              onClick={(e) => scrollToHeading(e, heading.id)}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start gap-2 leading-tight"
                            >
                              <span className="text-primary/50 mt-0.5"><Hash size={12} /></span>
                              {heading.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Share Section */}
                <div>
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">
                     Quick Actions
                  </h3>
                  <button className="w-full flex items-center justify-center gap-2 bg-muted hover:bg-primary/10 text-slate-700 hover:text-primary font-medium text-sm py-3 px-4 rounded-xl transition-colors border border-border mb-6 group">
                    <Sparkles size={16} className="text-primary group-hover:animate-pulse" />
                    Summarize with AI
                  </button>

                  <h3 className="text-sm border-t border-border pt-6 font-bold text-foreground uppercase tracking-widest mb-4">
                     Share Article
                  </h3>
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                      <XIcon size={16} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Linkedin size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Facebook size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Instagram size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-9 order-1 lg:order-2">
              {blog.featuredImage && (
                <div className="rounded-3xl overflow-hidden aspect-[16/9] mb-12 shadow-sm border border-border bg-muted">
                  <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div 
                id="blog-content-body"
                className="prose prose-invert prose-lg md:prose-xl max-w-none 
                  prose-headings:font-extrabold prose-headings:text-foreground 
                  prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
                  prose-h3:mt-8 prose-h3:mb-4 
                  prose-p:text-muted-foreground prose-p:leading-loose 
                  prose-a:text-primary prose-a:font-semibold hover:prose-a:text-primary
                  prose-img:rounded-3xl prose-img:shadow-sm prose-img:border prose-img:border-border
                  prose-li:text-muted-foreground prose-li:leading-loose
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-background prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-slate-700 prose-blockquote:font-medium prose-blockquote:italic
                  prose-strong:text-foreground prose-strong:font-bold"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              
              <footer className="mt-16 pt-8 border-t border-border">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-bold text-foreground uppercase tracking-widest mr-2">Tags:</span>
                  {blog.tags?.map((tag: string) => (
                    <span key={tag} className="px-3 py-1.5 bg-muted rounded-lg text-xs font-semibold text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors">#{tag}</span>
                  ))}
                  {(!blog.tags || blog.tags.length === 0) && (
                     <span className="text-xs text-muted-foreground italic">No tags</span>
                  )}
                </div>
              </footer>
            </article>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
