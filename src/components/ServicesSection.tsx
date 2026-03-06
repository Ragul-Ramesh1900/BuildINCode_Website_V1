import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe, Layout, Smartphone, Cloud, Plug, Gauge,
  Palette, Search, TrendingUp, Bug, ClipboardCheck, ShieldCheck,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const iconMap: any = {
  Globe, Layout, Smartphone, Cloud, Plug, Gauge,
  Palette, Search, TrendingUp, Bug, ClipboardCheck, ShieldCheck,
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { data: categories = [] } = useQuery({
    queryKey: ['services'],
    queryFn: api.getServices,
  });

  return (
    <section id="services" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Services</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            End-to-End <span className="text-gradient">IT Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Everything you need to build, launch, and grow your digital product — under one roof.
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((cat: any, ci: number) => (
            <motion.div
              key={cat._id || cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.15 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 pl-1">{cat.category}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {cat.services?.map((s: any) => {
                  const IconComponent = iconMap[s.icon] || Globe;
                  return (
                    <div
                      key={s.name}
                      className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 shadow-card hover:shadow-glow"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent size={20} className="text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{s.name}</h4>
                      <p className="text-sm text-muted-foreground">{s.description}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
