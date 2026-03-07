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
    initialData: [
      {
        category: "Our Core Expertise",
        services: [
          { name: "Custom Software Development", icon: "Layout", description: "Tailored software solutions built to solve your unique business challenges." },
          { name: "Web Application Development", icon: "Globe", description: "High-performance web apps built with modern frameworks like React and Next.js." },
          { name: "Mobile App Development", icon: "Smartphone", description: "Native and cross-platform mobile apps for iOS and Android." },
          { name: "UI/UX Design", icon: "Palette", description: "Intuitive and engaging user interfaces designed for conversion and usability." },
          { name: "Cloud & DevOps Solutions", icon: "Cloud", description: "Scalable cloud infrastructure and automated deployment pipelines." },
          { name: "API Development & Integration", icon: "Plug", description: "Seamlessly connect your systems with robust and secure APIs." },
          { name: "SaaS Platform Development", icon: "Gauge", description: "End-to-end development of subscription-based software products." },
          { name: "Software Testing & Quality Assurance", icon: "ClipboardCheck", description: "Rigorous testing to ensure your software is bug-free and reliable." },
        ]
      }
    ]
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
            Our Core <span className="text-gradient">Expertise</span>
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
