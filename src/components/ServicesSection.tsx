import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe, Layout, Smartphone, Cloud, Plug, Gauge,
  Palette, Search, TrendingUp, Bug, ClipboardCheck, ShieldCheck,
} from "lucide-react";

const categories = [
  {
    title: "Core Development",
    services: [
      { icon: Globe, name: "Website Development", desc: "Business, E-commerce & Corporate websites" },
      { icon: Layout, name: "Web Applications", desc: "Custom Dashboards, SaaS Platforms" },
      { icon: Smartphone, name: "Mobile Apps", desc: "Android, iOS, Cross-Platform" },
    ],
  },
  {
    title: "Advanced Technical",
    services: [
      { icon: Cloud, name: "DevOps & Cloud", desc: "AWS, VPS, CI/CD, Docker" },
      { icon: Plug, name: "API Development", desc: "RESTful & GraphQL integrations" },
      { icon: Gauge, name: "Performance Optimization", desc: "Speed, SEO & Core Web Vitals" },
    ],
  },
  {
    title: "Design & Growth",
    services: [
      { icon: Palette, name: "UI/UX Design", desc: "Figma, Prototyping, Wireframing" },
      { icon: Search, name: "SEO Optimization", desc: "On-page, Technical, Keyword Research" },
      { icon: TrendingUp, name: "Digital Marketing", desc: "Strategy, Analytics & Growth" },
    ],
  },
  {
    title: "Quality Assurance",
    services: [
      { icon: ClipboardCheck, name: "Manual Testing", desc: "Comprehensive test coverage" },
      { icon: ShieldCheck, name: "Functional Testing", desc: "End-to-end validation" },
      { icon: Bug, name: "Bug Reporting & QA", desc: "Detailed reports & regression testing" },
    ],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.15 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 pl-1">{cat.title}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {cat.services.map((s) => (
                  <div
                    key={s.name}
                    className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 shadow-card hover:shadow-glow"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <s.icon size={20} className="text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{s.name}</h4>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
