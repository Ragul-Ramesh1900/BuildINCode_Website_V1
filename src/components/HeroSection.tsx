import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const HeroSection = () => {
  const { data: hero } = useQuery({
    queryKey: ['hero'],
    queryFn: api.getHero,
    initialData: {
      badge: "Full-Service IT Agency — 6 Experts, Infinite Possibilities",
      title: "Building Scalable Digital Solutions for",
      highlightedText: "Modern Businesses",
      description: "We deliver full-cycle IT services — from design & development to testing, deployment, and growth marketing. Your dedicated technology partner.",
      stats: [
        { number: "50+", label: "Projects Delivered" },
        { number: "6", label: "Team Members" },
        { number: "98%", label: "Client Satisfaction" },
        { number: "24/7", label: "Support" },
      ]
    }
  });

  return (
  <section className="relative min-h-screen flex items-center justify-center section-padding pt-32 overflow-hidden">
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-hero" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

    <div className="container mx-auto relative z-10 text-center max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm font-medium mb-6">
          {hero.badge}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
      >
        {hero.title}{" "}
        <span className="text-gradient">{hero.highlightedText}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
      >
        {hero.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <a href="#portfolio" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow">
          View Our Work <ArrowRight size={18} />
        </a>
        <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors">
          <MessageCircle size={18} /> Get a Free Consultation
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {hero.stats?.map((s: any) => (
          <div key={s.label}>
            <div className="text-3xl font-bold text-gradient">{s.number}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
  );
};

export default HeroSection;
