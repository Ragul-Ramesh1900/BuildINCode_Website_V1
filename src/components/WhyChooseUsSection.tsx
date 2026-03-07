import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, RefreshCw, MessageSquare, ShieldCheck, Zap, HeartHandshake, Palette } from "lucide-react";

const reasons = [
  { icon: ShieldCheck, title: "Scalable Architecture", desc: "We design systems that grow with your business using modern frameworks, cloud infrastructure, and microservices architecture." },
  { icon: Zap, title: "High Performance", desc: "Our solutions are optimized for speed, security, and performance to ensure the best user experience." },
  { icon: Palette, title: "Modern UI/UX Design", desc: "We create intuitive and engaging user interfaces that improve customer satisfaction and product usability." },
  { icon: ShieldCheck, title: "Secure Development", desc: "Security is integrated into every stage of our development process." },
  { icon: Users, title: "Dedicated Development Team", desc: "Work with a team of experienced developers, designers, and project managers focused on your success." },
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
            Why Businesses <span className="text-gradient">Choose DevForge</span>
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
