import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, RefreshCw, MessageSquare, DollarSign, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Users, title: "Dedicated Team Structure", desc: "A focused team assigned exclusively to your project for maximum accountability." },
  { icon: RefreshCw, title: "Agile Development Process", desc: "Iterative sprints, continuous delivery, and flexibility to adapt to changing requirements." },
  { icon: MessageSquare, title: "Transparent Communication", desc: "Daily standups, weekly reports, and real-time project tracking via shared dashboards." },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Enterprise-quality output at startup-friendly rates. No hidden fees, ever." },
  { icon: HeartHandshake, title: "Long-term Support", desc: "We don't disappear after launch. Ongoing maintenance, updates, and scaling support." },
];

const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Why Us</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Why Clients <span className="text-gradient">Choose DevForge</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all shadow-card group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <r.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
