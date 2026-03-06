import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hero from './models/Hero.js';
import Project from './models/Project.js';
import Service from './models/Service.js';
import Testimonial from './models/Testimonial.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Hero.deleteMany({});
    await Project.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});

    // Seed Hero
    await Hero.create({
      badge: "Full-Service IT Agency — 6 Experts, Infinite Possibilities",
      title: "Building Scalable Digital Solutions for",
      highlightedText: "Modern Businesses",
      description: "We deliver full-cycle IT services — from design & development to testing, deployment, and growth marketing. Your dedicated technology partner.",
      stats: [
        { number: "50+", label: "Projects Delivered" },
        { number: "6", label: "Team Members" },
        { number: "98%", label: "Client Satisfaction" },
        { number: "24/7", label: "Support" },
      ]
    });

    // Seed Projects
    await Project.insertMany([
      {
        title: "ShopVault — E-Commerce Platform",
        problem: "A retail brand needed a scalable online store to handle 10k+ products with real-time inventory sync.",
        solution: "Built a high-performance e-commerce platform with dynamic filtering, payment gateway integration, and an admin dashboard.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
        result: "3x revenue increase in 6 months, 99.9% uptime",
        colorGradient: "from-blue-500/20 to-cyan-500/20",
        order: 1
      },
      {
        title: "CorpEdge — Corporate Website",
        problem: "A consulting firm needed a professional web presence that converts visitors into leads.",
        solution: "Designed a conversion-optimized corporate site with CMS integration, blog, and lead capture forms.",
        technologies: ["Next.js", "Tailwind CSS", "Strapi", "Vercel"],
        result: "200% increase in lead generation, 40% lower bounce rate",
        colorGradient: "from-purple-500/20 to-pink-500/20",
        order: 2
      },
      {
        title: "FitTrack — Mobile Fitness App",
        problem: "A fitness startup needed a cross-platform app to track workouts and nutrition.",
        solution: "Developed a feature-rich mobile app with real-time sync, push notifications, and AI-powered recommendations.",
        technologies: ["React Native", "Firebase", "Node.js", "TensorFlow Lite"],
        result: "50k+ downloads in first quarter, 4.8★ app rating",
        colorGradient: "from-green-500/20 to-emerald-500/20",
        order: 3
      },
      {
        title: "OpsHub — Custom ERP System",
        problem: "A manufacturing company struggled with disconnected tools for inventory, HR, and finance.",
        solution: "Built a unified ERP/CRM system with role-based access, reporting dashboards, and third-party integrations.",
        technologies: ["React", "Laravel", "MySQL", "Docker", "AWS"],
        result: "60% reduction in operational overhead, full digital transformation",
        colorGradient: "from-orange-500/20 to-yellow-500/20",
        order: 4
      }
    ]);

    // Seed Services
    await Service.insertMany([
      {
        category: "Core Development",
        services: [
          { icon: "Globe", name: "Website Development", description: "Business, E-commerce & Corporate websites" },
          { icon: "Layout", name: "Web Applications", description: "Custom Dashboards, SaaS Platforms" },
          { icon: "Smartphone", name: "Mobile Apps", description: "Android, iOS, Cross-Platform" },
        ],
        order: 1
      },
      {
        category: "Advanced Technical",
        services: [
          { icon: "Cloud", name: "DevOps & Cloud", description: "AWS, VPS, CI/CD, Docker" },
          { icon: "Plug", name: "API Development", description: "RESTful & GraphQL integrations" },
          { icon: "Gauge", name: "Performance Optimization", description: "Speed, SEO & Core Web Vitals" },
        ],
        order: 2
      },
      {
        category: "Design & Growth",
        services: [
          { icon: "Palette", name: "UI/UX Design", description: "Figma, Prototyping, Wireframing" },
          { icon: "Search", name: "SEO Optimization", description: "On-page, Technical, Keyword Research" },
          { icon: "TrendingUp", name: "Digital Marketing", description: "Strategy, Analytics & Growth" },
        ],
        order: 3
      },
      {
        category: "Quality Assurance",
        services: [
          { icon: "ClipboardCheck", name: "Manual Testing", description: "Comprehensive test coverage" },
          { icon: "ShieldCheck", name: "Functional Testing", description: "End-to-end validation" },
          { icon: "Bug", name: "Bug Reporting & QA", description: "Detailed reports & regression testing" },
        ],
        order: 4
      }
    ]);

    // Seed Testimonials
    await Testimonial.insertMany([
      {
        name: "Sarah Johnson",
        role: "CEO",
        company: "TechStart Inc",
        content: "Outstanding work! They delivered our e-commerce platform ahead of schedule and exceeded all expectations.",
        rating: 5,
        featured: true
      },
      {
        name: "Michael Chen",
        role: "Product Manager",
        company: "InnovateCo",
        content: "Professional, responsive, and highly skilled. Our mobile app has been a huge success thanks to their expertise.",
        rating: 5,
        featured: true
      }
    ]);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
