import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  CreditCard, HeartPulse, ShoppingBag, GraduationCap, 
  Layers, Truck, Building2 
} from "lucide-react";

const industries = [
  { name: "FinTech", icon: CreditCard },
  { name: "Healthcare", icon: HeartPulse },
  { name: "E-commerce", icon: ShoppingBag },
  { name: "Education Technology", icon: GraduationCap },
  { name: "SaaS Platforms", icon: Layers },
  { name: "Logistics & Supply Chain", icon: Truck },
  { name: "Enterprise Software", icon: Building2 },
];

const IndustriesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="industries" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Industries</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Industries <span className="text-gradient">We Serve</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We build digital products for businesses across multiple industries, helping them innovate and grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-glow transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <industry.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground text-center">{industry.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
