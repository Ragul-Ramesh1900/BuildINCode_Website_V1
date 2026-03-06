import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, User, Layout, Search, ClipboardCheck } from "lucide-react";

const teamRoles = [
  { role: "Full-Stack Developers", icon: User, color: "bg-blue-500/10 text-blue-500" },
  { role: "UI/UX Designers", icon: Layout, color: "bg-purple-500/10 text-purple-500" },
  { role: "SEO Specialists", icon: Search, color: "bg-orange-500/10 text-orange-500" },
  { role: "QA Testing Engineers", icon: ClipboardCheck, color: "bg-green-500/10 text-green-500" },
];

const TeamSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background w-full" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-widest px-4 py-1 rounded-full bg-primary/10 border border-primary/20">The Experts</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-6 mb-4">
              Our <span className="text-gradient">Team</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              20+ Dedicated Engineers
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Our team consists of over 20+ highly skilled engineers and specialists with deep technical expertise and industry experience. 
              We work together to delivering innovative, efficient, and scalable solutions that meet client expectations.
            </p>
            
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-secondary/30 border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-glow">
                <Users size={24} />
              </div>
              <p className="font-semibold text-foreground italic">
                "We don't just build software, we engineer success."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {teamRoles.map((role, i) => (
              <motion.div
                key={role.role}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 shadow-card hover:shadow-glow group flex flex-col items-center text-center"
              >
                <div className={`w-14 h-14 rounded-2xl ${role.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon size={26} />
                </div>
                <h4 className="text-xl font-bold mb-1 text-foreground">{role.role}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
