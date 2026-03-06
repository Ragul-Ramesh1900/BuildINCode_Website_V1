import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, RefreshCw, MessageSquare, ShieldCheck, Zap, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Users, title: "Experienced developers and engineers", desc: "Expert team with deep industry knowledge and technical proficiency." },
  { icon: RefreshCw, title: "Modern technology stack", desc: "We use the latest battle-tested technologies to build cutting-edge solutions." },
  { icon: ShieldCheck, title: "Scalable and secure solutions", desc: "Architecture designed to grow with your business while maintaining top-tier security." },
  { icon: Zap, title: "Agile development process", desc: "Fast, iterative development that ensures your project stays on track and adapts to feedback." },
  { icon: MessageSquare, title: "Transparent communication", desc: "Open channels and regular updates to keep you informed every step of the way." },
  { icon: HeartHandshake, title: "Reliable support and maintenance", desc: "Ongoing dedication to your project's health and performance after launch." },
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
