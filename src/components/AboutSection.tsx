import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Zap, Shield, Clock } from "lucide-react";

const workflow = [
  "Requirement Analysis",
  "UI/UX Design",
  "Development",
  "Testing",
  "Deployment",
  "Maintenance",
];

const highlights = [
  { icon: Users, title: "Dedicated Team", desc: "3 Full Stack Devs, 1 Designer, 1 SEO Specialist, 1 QA Tester" },
  { icon: Zap, title: "Agile Process", desc: "Iterative sprints with continuous feedback and rapid delivery" },
  { icon: Shield, title: "Quality First", desc: "Rigorous testing and code reviews on every project" },
  { icon: Clock, title: "On-Time Delivery", desc: "We commit to deadlines and deliver results consistently" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">About Us</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            A Full-Service <span className="text-gradient">Development Agency</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We are a compact, senior-level team that delivers enterprise-grade solutions with startup speed. Quality, scalability, and transparent communication are at our core.
          </p>
        </motion.div>

        {/* Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {workflow.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium border border-border">
                {step}
              </span>
              {i < workflow.length - 1 && <span className="text-primary hidden sm:block">→</span>}
            </div>
          ))}
        </motion.div>

        {/* Highlights grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors shadow-card"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <h.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{h.title}</h3>
              <p className="text-sm text-muted-foreground">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
