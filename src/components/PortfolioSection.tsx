import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: api.getProjects,
  });

  return (
    <section id="portfolio" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Projects That <span className="text-gradient">Deliver Results</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real solutions for real businesses. Here's a glimpse of our recent work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p: any, i: number) => (
            <motion.div
              key={p._id || p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group rounded-xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all shadow-card"
            >
              {/* Color bar */}
              <div className={`h-2 bg-gradient-to-r ${p.colorGradient || 'from-blue-500/20 to-cyan-500/20'}`} />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  {p.title}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                </h3>
                <div className="space-y-2 text-sm mb-4">
                  <p><span className="font-semibold text-foreground">Problem:</span> <span className="text-muted-foreground">{p.problem}</span></p>
                  <p><span className="font-semibold text-foreground">Solution:</span> <span className="text-muted-foreground">{p.solution}</span></p>
                  <p><span className="font-semibold text-primary">Result:</span> <span className="text-muted-foreground">{p.result}</span></p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.technologies?.map((t: string) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium border border-border">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
