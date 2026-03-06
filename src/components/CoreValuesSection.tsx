import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

const values = [
  {
    title: "Agile Development Process",
    description: "We follow agile methodologies with iterative sprints, continuous feedback, and rapid development cycles to ensure flexibility and faster delivery.",
    icon: <Zap size={24} />,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Quality First",
    description: "Quality is at the heart of everything we build. Our team performs rigorous testing, code reviews, and performance optimization for every project.",
    icon: <ShieldCheck size={24} />,
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "On-Time Delivery",
    description: "We respect deadlines and deliver projects on time without compromising quality. Our streamlined workflow ensures efficient project execution.",
    icon: <Clock size={24} />,
    color: "from-orange-500/20 to-red-500/20"
  }
];

const CoreValuesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden w-full" ref={ref}>
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest px-4 py-1 rounded-full bg-primary/10 border border-primary/20">The Principles</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-6 mb-4">
            Our <span className="text-gradient">Core Values</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            These are the pillars that guide our team and ensure we deliver excellence consistently.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-8 rounded-3xl bg-card border border-border hover:border-primary/20 transition-all duration-300 shadow-card hover:shadow-glow group flex flex-col items-center text-center h-full"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-primary">
                  {v.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors uppercase text-sm tracking-widest">
                {v.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {v.description}
              </p>
              
              <div className="mt-auto flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
                <CheckCircle2 size={16} /> Committed Excellence
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default CoreValuesSection;
