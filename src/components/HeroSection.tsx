import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HeroVector from "@/assets/hero-vector.png";

const HeroSection = () => {
  const { data: hero } = useQuery({
    queryKey: ['hero'],
    queryFn: api.getHero,
    initialData: {
      badge: "Building Scalable Digital Solutions for Modern Businesses",
      title: "Building Scalable Digital Solutions for",
      highlightedText: "Modern Businesses",
      description: "At BuildINCode, we help businesses transform ideas into powerful digital products. Our team of experienced developers, designers, and technology experts delivers scalable IT solutions that drive growth, improve efficiency, and create exceptional digital experiences. From web applications and mobile apps to cloud platforms and enterprise systems, we build technology that grows with your business.",
      stats: [
        { number: "50+", label: "Projects Delivered" },
        { number: "6", label: "Team Members" },
        { number: "98%", label: "Client Satisfaction" },
        { number: "24/7", label: "Support" },
      ]
    }
  });

  return (
    <section className="relative min-h-screen flex items-center section-padding pt-32 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left max-w-2xl">
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
              className="text-lg md:text-xl text-muted-foreground mb-10"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/portfolio" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow">
                View Our Work <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors">
                <MessageCircle size={18} /> Get a Free Consultation
              </Link>
            </motion.div>

            {/* Stats - Desktop only in this column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-16 hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {hero.stats?.map((s: any) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-gradient">{s.number}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-[100px] rounded-full animate-pulse" />
            <img 
              src={HeroVector} 
              alt="Digital Transformation Vector" 
              className="relative z-10 w-full h-auto drop-shadow-[0_20px_50px_rgba(109,40,217,0.3)] hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Mobile Image placement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:hidden w-full max-w-md mx-auto"
          >
            <img 
              src={HeroVector} 
              alt="Digital Transformation Vector" 
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Mobile Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-8 grid grid-cols-2 md:hidden gap-6"
          >
            {hero.stats?.map((s: any) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-gradient">{s.number}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
