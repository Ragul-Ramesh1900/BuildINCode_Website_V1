import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  BarChart, Layout, Code, ClipboardCheck, 
  Rocket, HeartHandshake, CheckCircle2 
} from "lucide-react";

const steps = [
  {
    title: "Requirement Analysis",
    description: "Understanding business goals, project scope, and technical requirements to create the right development strategy.",
    icon: <BarChart size={24} />,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "UI/UX Design",
    description: "Designing intuitive and visually engaging user experiences that ensure usability and customer satisfaction.",
    icon: <Layout size={24} />,
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Development",
    description: "Building scalable, secure, and high-performance applications using modern technologies.",
    icon: <Code size={24} />,
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "Testing",
    description: "Performing comprehensive manual and automated testing to ensure reliability, performance, and bug-free delivery.",
    icon: <ClipboardCheck size={24} />,
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "Deployment",
    description: "Launching the application with optimized infrastructure and DevOps best practices.",
    icon: <Rocket size={24} />,
    color: "from-sky-500/20 to-indigo-500/20"
  },
  {
    title: "Maintenance",
    description: "Providing ongoing support, updates, and improvements to ensure long-term performance and scalability.",
    icon: <HeartHandshake size={24} />,
    color: "from-rose-500/20 to-orange-500/20"
  }
];

const DevelopmentProcess = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary/10" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest px-4 py-1 rounded-full bg-primary/10 border border-primary/20">The Roadmap</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-6 mb-4">
            Our <span className="text-gradient">Development Process</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            We follow a structured and agile workflow to ensure every project is delivered efficiently and meets the highest quality standards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* Connector line for desktop - hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 -z-10" />
          
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 shadow-card hover:shadow-glow group h-full"
            >
              {/* Step number badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-glow border-2 border-background">
                {i + 1}
              </div>

              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-primary">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
              
              <div className="mt-4 flex items-center gap-1.5 text-xs text-primary/60 font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 size={12} /> Standard Procedure
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentProcess;
