import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials'],
    queryFn: api.getTestimonials,
  });

  return (
    <section className="section-padding bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t: any, i: number) => (
            <motion.div
              key={t._id || t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="p-6 rounded-xl bg-card border border-border shadow-card"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, si) => (
                  <Star key={si} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">"{t.content}"</p>
              <div>
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}{t.company ? `, ${t.company}` : ''}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
