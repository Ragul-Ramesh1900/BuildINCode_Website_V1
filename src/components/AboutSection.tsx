import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";



const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background pt-32" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-widest px-4 py-1 rounded-full bg-primary/10 border border-primary/20">About Us</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-6 mb-4">
              A <span className="text-gradient font-bold">Full-Service</span> <br /> Software Development <span className="text-gradient font-bold underline decoration-primary/30">Agency</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed mb-8 mt-6">
              DevForge is a highly skilled team of experienced developers, designers, and technology specialists dedicated to delivering high-quality digital solutions. 
              We combine enterprise-level engineering standards with the agility and speed of a startup to build scalable, secure, and high-performance products.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Our team focuses on quality, innovation, and transparent communication to ensure every project is delivered successfully. 
              From concept to deployment and long-term support, we help businesses transform ideas into powerful digital products.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="font-bold">10+</span>
                </div>
                <p className="text-sm font-medium text-foreground">Projects Delivered</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="font-bold">20+</span>
                </div>
                <p className="text-sm font-medium text-foreground">Expert Engineers</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full bg-gradient-to-br from-primary/5 to-transparent rounded-3xl p-8 border border-border/40 relative overflow-hidden group shadow-card"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Our Specialization</h3>
              <div className="space-y-4">
                {[
                  "Web Development & Apps",
                  "Mobile Applications",
                  "AI Solutions & Agents",
                  "DevOps & Infrastructure",
                  "Quality Assurance & Testing",
                  "SEO & Digital Marketing"
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all hover:translate-x-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <CheckCircle2 size={14} />
                    </div>
                    <p className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
