import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Globe, Layout, Smartphone, Palette, ClipboardCheck, 
  Cloud, TrendingUp, CheckCircle2, Server, Database,
  Search, ShieldCheck, Zap, Plug, Bot, Cpu, MessageSquare, 
  Workflow, Brain
} from "lucide-react";

const detailedServices = [
  {
    title: "Website Development",
    icon: <Globe size={24} />,
    description: "We build fast, responsive, and SEO-friendly websites that help businesses establish a strong online presence.",
    technologies: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Vue.js", "Angular", "Tailwind CSS", "Bootstrap", "Node.js", "PHP", "WordPress", "Shopify"],
    features: ["Responsive design", "SEO optimized structure", "Fast loading speed", "Secure architecture", "Cross-browser compatibility"]
  },
  {
    title: "Web Application Development",
    icon: <Layout size={24} />,
    description: "We develop scalable and high-performance web applications tailored to business needs.",
    technologies: ["React.js", "Next.js", "Angular", "Vue.js", "Node.js", "Express.js", "Django", "Laravel", "Spring Boot", "GraphQL", "REST APIs"],
    databases: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Redis"],
    cloudBackend: ["AWS", "Google Cloud", "Azure"]
  },
  {
    title: "Android App Development",
    icon: <Smartphone size={24} />,
    description: "We build powerful and user-friendly Android applications for startups and enterprises.",
    technologies: ["Kotlin", "Java", "Flutter", "React Native"],
    backendIntegration: ["Firebase", "Node.js", "REST API", "GraphQL"],
    features: ["Modern UI/UX", "High performance", "Secure authentication", "Push notifications", "Offline capabilities"]
  },
  {
    title: "UI/UX Design",
    icon: <Palette size={24} />,
    description: "We design intuitive and engaging digital experiences that improve usability and user satisfaction.",
    tools: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator"],
    services: ["Wireframing", "Prototyping", "Mobile UI Design", "Web UI Design", "Design Systems"]
  },
  {
    title: "QA Testing (Manual & Automation)",
    icon: <ClipboardCheck size={24} />,
    description: "We ensure high-quality software through comprehensive testing processes.",
    manual: ["Functional Testing", "UI Testing", "Regression Testing", "Smoke Testing", "User Acceptance Testing"],
    automation: ["Selenium", "Cypress", "Playwright", "Appium", "JUnit", "TestNG"],
    performance: ["JMeter", "LoadRunner"]
  },
  {
    title: "DevOps & Cloud Solutions",
    icon: <Cloud size={24} />,
    description: "We streamline development and deployment processes using modern DevOps practices.",
    tools: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "GitLab CI/CD", "Terraform", "Ansible"],
    platforms: ["AWS", "Google Cloud", "Microsoft Azure"],
    services: ["CI/CD pipeline setup", "Cloud infrastructure management", "Containerization", "Monitoring and logging"]
  },
  {
    title: "SEO & Digital Marketing",
    icon: <TrendingUp size={24} />,
    description: "We help businesses improve online visibility and drive organic traffic through advanced SEO strategies.",
    services: ["Technical SEO", "On-Page SEO", "Off-Page SEO", "Keyword Research", "Competitor Analysis", "Content Optimization"],
    tools: ["Google Analytics", "Google Search Console", "Ahrefs", "SEMrush", "Moz"]
  },
  {
    title: "AI Chatbot Development",
    icon: <MessageSquare size={24} />,
    description: "We create smart conversational chatbots that can understand user queries, provide accurate responses, and automate customer interactions.",
    useCases: ["Customer support automation", "Lead generation chatbots", "Sales assistant bots", "FAQ automation", "Booking and appointment bots", "E-commerce shopping assistants"],
    platforms: ["Website chatbots", "WhatsApp bots", "Telegram bots", "Facebook Messenger bots", "Slack bots"],
    techStack: ["Node.js", "Python FastAPI", "Dialogflow", "Microsoft Bot Framework", "Rasa"],
    features: ["24/7 automated customer support", "Faster response time", "Reduced operational cost", "Improved customer engagement", "Scalable business automation"]
  },
  {
    title: "AI Agent Development",
    icon: <Brain size={24} />,
    description: "AI agents are intelligent systems capable of performing complex tasks automatically using AI models and automation workflows.",
    aiModels: ["OpenAI GPT", "Claude", "Gemini", "Llama"],
    aiFrameworks: ["LangChain", "LlamaIndex", "AutoGen", "CrewAI"],
    capabilities: ["Task automation", "Data analysis and insights", "Business workflow automation", "Customer interaction automation", "Smart decision support"],
    techStack: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Vector Databases (Pinecone, Weaviate, Chroma)"],
    platforms: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"]
  }
];

const DetailedServices = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background w-full" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">Solutions</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-6 mb-6">
            End-to-End <span className="text-gradient">IT Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            We provide complete digital solutions to help businesses build, launch, and scale modern products. 
            From design and development to testing, deployment, and marketing — our team delivers reliable and scalable technology solutions.
          </p>
        </motion.div>

        <div className="grid gap-16 md:gap-24">
          {detailedServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-start gap-10 md:gap-20`}
            >
              {/* Content Side */}
              <div className="flex-1 w-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-glow border border-primary/20">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">{service.title}</h3>
                </div>
                
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-8">
                  {/* Common dynamic listing based on available properties */}
                  {service.technologies && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <Zap size={14} /> Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map(tech => (
                          <span key={tech} className="px-3 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-sm border border-border">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.features && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <CheckCircle2 size={14} /> Features
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map(feat => (
                          <li key={feat} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" /> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.databases && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <Database size={14} /> Database
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.databases.map(db => (
                          <span key={db} className="px-3 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-sm border border-border">
                            {db}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.cloudBackend && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <Server size={14} /> Cloud & Backend
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.cloudBackend.map(cloud => (
                          <span key={cloud} className="px-3 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-sm border border-border">
                            {cloud}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.backendIntegration && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <Plug size={14} /> Backend Integration
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.backendIntegration.map(integration => (
                          <span key={integration} className="px-3 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-sm border border-border">
                            {integration}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.tools && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <Palette size={14} /> Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.tools.map(tool => (
                          <span key={tool} className="px-3 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-sm border border-border">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.services && service.title === "UI/UX Design" && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <Layout size={14} /> Design Services
                      </h4>
                      <ul className="space-y-2">
                        {service.services.map(s => (
                          <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.manual && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-3 uppercase text-[10px] tracking-wider text-primary opacity-80">
                         Manual Testing
                      </h4>
                      <ul className="space-y-1.5">
                        {service.manual.map(t => (
                          <li key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 size={10} className="text-primary/50" /> {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.automation && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-3 uppercase text-[10px] tracking-wider text-primary opacity-80">
                         Automation Testing
                      </h4>
                      <ul className="space-y-1.5">
                        {service.automation.map(t => (
                          <li key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 size={10} className="text-sky-400/50" /> {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.platforms && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <Cloud size={14} /> Cloud Platforms
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.platforms.map(p => (
                          <span key={p} className="px-3 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-sm border border-border">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.services && service.title === "DevOps & Cloud Solutions" && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <Server size={14} /> Services
                      </h4>
                      <ul className="space-y-2">
                        {service.services.map(s => (
                          <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.services && service.title === "SEO & Digital Marketing" && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                         SEO Services
                      </h4>
                      <ul className="space-y-2">
                        {service.services.map(s => (
                          <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {service.techStack && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <Cpu size={14} /> AI & Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map(tech => (
                          <span key={tech} className="px-3 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-sm border border-border">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.aiModels && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <Brain size={14} /> LLM Integration
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.aiModels.map(model => (
                          <span key={model} className="px-3 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-sm border border-border">
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.aiFrameworks && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <Workflow size={14} /> AI Frameworks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.aiFrameworks.map(frame => (
                          <span key={frame} className="px-3 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-sm border border-border">
                            {frame}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.useCases && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <MessageSquare size={14} /> Use Cases
                      </h4>
                      <ul className="space-y-2">
                        {service.useCases.map(use => (
                          <li key={use} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" /> {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.capabilities && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                        <Bot size={14} /> Capabilities
                      </h4>
                      <ul className="space-y-2">
                        {service.capabilities.map(cap => (
                          <li key={cap} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" /> {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.tools && service.title === "SEO & Digital Marketing" && (
                    <div>
                      <h4 className="flex items-center gap-2 text-foreground font-semibold mb-4 uppercase text-xs tracking-wider text-primary">
                         Marketing Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.tools.map(tool => (
                          <span key={tool} className="px-3 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-sm border border-border">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Visual Side (Mockup or Abstract) */}
              <div className="flex-1 w-full bg-gradient-to-br from-primary/5 to-transparent rounded-3xl p-8 border border-border/40 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center justify-center min-h-[300px]">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-primary/20"
                  >
                    {/* Render a larger background icon */}
                    {service.icon && (
                      <service.icon.type {...service.icon.props} size={200} strokeWidth={0.5} />
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailedServices;
