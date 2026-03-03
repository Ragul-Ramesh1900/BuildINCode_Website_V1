import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "ShopVault — E-Commerce Platform",
    problem: "A retail brand needed a scalable online store to handle 10k+ products with real-time inventory sync.",
    solution: "Built a high-performance e-commerce platform with dynamic filtering, payment gateway integration, and an admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
    result: "3x revenue increase in 6 months, 99.9% uptime",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "CorpEdge — Corporate Website",
    problem: "A consulting firm needed a professional web presence that converts visitors into leads.",
    solution: "Designed a conversion-optimized corporate site with CMS integration, blog, and lead capture forms.",
    tech: ["Next.js", "Tailwind CSS", "Strapi", "Vercel"],
    result: "200% increase in lead generation, 40% lower bounce rate",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "FitTrack — Mobile Fitness App",
    problem: "A fitness startup needed a cross-platform app to track workouts and nutrition.",
    solution: "Developed a feature-rich mobile app with real-time sync, push notifications, and AI-powered recommendations.",
    tech: ["React Native", "Firebase", "Node.js", "TensorFlow Lite"],
    result: "50k+ downloads in first quarter, 4.8★ app rating",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "OpsHub — Custom ERP System",
    problem: "A manufacturing company struggled with disconnected tools for inventory, HR, and finance.",
    solution: "Built a unified ERP/CRM system with role-based access, reporting dashboards, and third-party integrations.",
    tech: ["React", "Laravel", "MySQL", "Docker", "AWS"],
    result: "60% reduction in operational overhead, full digital transformation",
    color: "from-orange-500/20 to-yellow-500/20",
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group rounded-xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all shadow-card"
            >
              {/* Color bar */}
              <div className={`h-2 bg-gradient-to-r ${p.color}`} />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  {p.title}
                  <ExternalLink size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <div className="space-y-2 text-sm mb-4">
                  <p><span className="font-semibold text-foreground">Problem:</span> <span className="text-muted-foreground">{p.problem}</span></p>
                  <p><span className="font-semibold text-foreground">Solution:</span> <span className="text-muted-foreground">{p.solution}</span></p>
                  <p><span className="font-semibold text-primary">Result:</span> <span className="text-muted-foreground">{p.result}</span></p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
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
