import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stacks = [
  {
    category: "Frontend",
    techs: ["React", "Next.js", "HTML5", "CSS3", "JavaScript", "TypeScript"],
  },
  {
    category: "Backend",
    techs: ["Node.js", "PHP", "Laravel", "Express.js"],
  },
  {
    category: "Mobile",
    techs: ["Flutter", "React Native"],
  },
  {
    category: "Database",
    techs: ["MySQL", "MongoDB", "PostgreSQL"],
  },
  {
    category: "Cloud & DevOps",
    techs: ["AWS", "GCP", "Azure", "Docker", "CI/CD", "Jenkins", "Terraform"],
  },
  {
    category: "Design",
    techs: ["Figma", "Adobe XD"],
  },
];

const TechStackSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Technology</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Our <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We leverage battle-tested technologies to build robust, scalable solutions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stacks.map((stack, i) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border shadow-card"
            >
              <h3 className="font-semibold text-primary mb-4 text-sm uppercase tracking-wider">{stack.category}</h3>
              <div className="flex flex-wrap gap-2">
                {stack.techs.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium border border-border hover:border-primary/30 transition-colors cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
