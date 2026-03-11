import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Blog from './models/Blog.js';
import Category from './models/Category.js';
import Tag from './models/Tag.js';
import BlogSettings from './models/BlogSettings.js';

dotenv.config();

const seedBlogData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing blog data
    await User.deleteMany({});
    await Blog.deleteMany({});
    await Category.deleteMany({});
    await Tag.deleteMany({});
    await BlogSettings.deleteMany({});

    console.log('Cleared existing blog data');

    // Create Admin User
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@buildincode.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('✅ Admin user created: admin@buildincode.com / admin123');

    // Create Categories
    const categories = await Category.insertMany([
      { name: 'Technology', slug: 'technology', description: 'Latest in tech & software', color: '#6366f1' },
      { name: 'Design', slug: 'design', description: 'UI/UX and visual design insights', color: '#8b5cf6' },
      { name: 'Marketing', slug: 'marketing', description: 'Digital marketing strategies', color: '#f59e0b' },
      { name: 'Business', slug: 'business', description: 'Business growth and strategy', color: '#10b981' },
      { name: 'Development', slug: 'development', description: 'Software development best practices', color: '#3b82f6' },
    ]);
    console.log('✅ Categories created');

    // Create Tags
    await Tag.insertMany([
      { name: 'React', slug: 'react' },
      { name: 'Node.js', slug: 'nodejs' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'UI/UX', slug: 'ui-ux' },
      { name: 'SEO', slug: 'seo' },
      { name: 'Performance', slug: 'performance' },
      { name: 'Startup', slug: 'startup' },
      { name: 'API', slug: 'api' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'DevOps', slug: 'devops' },
    ]);
    console.log('✅ Tags created');

    // Create Blog Settings
    await BlogSettings.create({
      blogTitle: 'BuildINCode Blog',
      blogDescription: 'Stay updated with the latest trends in technology, design, and digital transformation strategy.',
      blogTagline: 'Insights from the Builders of Tomorrow',
      postsPerPage: 10,
      allowComments: false,
      defaultCategory: 'Technology',
      socialLinks: {
        twitter: 'https://twitter.com/buildincode',
        linkedin: 'https://linkedin.com/company/buildincode',
        facebook: '',
        instagram: 'https://instagram.com/buildincode',
      },
      seo: {
        metaTitle: 'BuildINCode Blog - Tech, Design & Digital Insights',
        metaDescription: 'Expert insights on technology, design, and digital transformation from the BuildINCode team.',
        googleAnalyticsId: '',
      },
    });
    console.log('✅ Blog settings created');

    // Create Sample Blog Posts
    const sampleBlogs = [
      {
        title: 'Building Scalable React Applications with Clean Architecture',
        slug: 'building-scalable-react-applications-clean-architecture',
        category: 'Technology',
        tags: ['React', 'TypeScript', 'Performance'],
        status: 'published',
        author: 'Admin',
        excerpt: 'Discover the architectural patterns and best practices that separate good React apps from great ones. We explore component design, state management, and code organization strategies.',
        featuredImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1200&q=80',
        metaTitle: 'Building Scalable React Applications - BuildINCode Blog',
        metaDescription: 'Learn the architectural patterns and best practices for building scalable React applications.',
        content: `<h2>Introduction to Clean Architecture in React</h2>
<p>Building React applications that scale is one of the most important skills modern developers need to master. When a project grows from a simple prototype to a production application used by thousands of users, the decisions you made early on become increasingly important.</p>

<p>Clean Architecture, popularized by Robert C. Martin (Uncle Bob), gives us a framework for organizing code in a way that makes it resilient to change. In this post, we'll translate these principles into practical React patterns.</p>

<h2>The Core Principles</h2>
<p>Before diving into code, let's understand what we're aiming for:</p>
<ul>
<li><strong>Separation of Concerns</strong> - Each module should handle one specific responsibility</li>
<li><strong>Dependency Inversion</strong> - Depend on abstractions, not concrete implementations</li>
<li><strong>Single Source of Truth</strong> - State should flow in one direction</li>
</ul>

<h2>Folder Structure That Scales</h2>
<p>The foundation of a scalable React app is a well-thought-out folder structure. Here's what we recommend at BuildINCode:</p>

<pre><code>src/
  ├── components/    # Reusable UI components
  ├── pages/         # Route-level page components
  ├── hooks/         # Custom React hooks
  ├── services/      # API & business logic
  ├── store/         # State management
  ├── types/         # TypeScript types
  └── utils/         # Helper functions</code></pre>

<h2>Component Design Patterns</h2>
<p>One of the most important decisions in React architecture is how you design your components. We've found success with the Container/Presenter pattern, where:</p>

<p><strong>Container components</strong> handle data fetching, state management, and business logic. They connect to your data layer and pass everything down as props.</p>

<p><strong>Presenter components</strong> are pure, functional components focused entirely on rendering UI. They receive everything they need via props and emit events upward.</p>

<h2>State Management Strategy</h2>
<p>Choosing the right state management approach is critical. Not every app needs Redux or MobX. Here's our decision framework:</p>

<ul>
<li><strong>useState/useReducer</strong> - Local component state, simple forms</li>
<li><strong>Context API</strong> - Theme, auth state, user preferences</li>
<li><strong>React Query / SWR</strong> - Server state, caching, background refetching</li>
<li><strong>Zustand / Jotai</strong> - Complex client state without Redux boilerplate</li>
</ul>

<h2>Performance Optimization</h2>
<p>Performance is not an afterthought — it's a design decision. Key techniques include lazy loading routes with React.lazy(), memoizing expensive calculations with useMemo, and using React.memo() strategically to prevent unnecessary re-renders.</p>

<h2>Conclusion</h2>
<p>Clean Architecture in React is about making deliberate choices that will serve you well as your application grows. Start with these patterns, adapt them to your team's needs, and always prioritize readability over cleverness.</p>

<p>If you want help architecting your next React project, <a href="/contact">reach out to the BuildINCode team</a> — we'd love to help.</p>`,
      },
      {
        title: 'The Complete Guide to Modern UI/UX Design in 2024',
        slug: 'complete-guide-modern-ui-ux-design-2024',
        category: 'Design',
        tags: ['UI/UX', 'Design'],
        status: 'published',
        author: 'Admin',
        excerpt: 'From glassmorphism to AI-driven interfaces, explore the design trends and principles that are defining digital experiences in 2024.',
        featuredImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
        metaTitle: 'Complete Guide to Modern UI/UX Design 2024 - BuildINCode',
        metaDescription: 'Discover the hottest UI/UX design trends and principles shaping digital products in 2024.',
        content: `<h2>The State of UI/UX Design in 2024</h2>
<p>Design has never been more important than it is today. With user expectations higher than ever and competition fierce in every market, great design isn't a differentiator — it's a baseline requirement.</p>

<p>In 2024, we're seeing a fascinating convergence of aesthetic trends and functional innovation. Let's break down what's defining modern digital design.</p>

<h2>Trend 1: Glassmorphism & Frosted Glass Effects</h2>
<p>Glassmorphism — that frosted glass, blurred background aesthetic — has matured from a novelty into a refined design language. When used well, it creates depth and hierarchy while maintaining a clean, modern feel.</p>

<p>The key is restraint. Use it for cards, modals, and navigation elements where layering adds meaning. Avoid making it the centerpiece of every interaction.</p>

<h2>Trend 2: Micro-Animations</h2>
<p>The difference between a good interface and a great one is often in the tiny moments — a button that gives satisfying feedback on hover, a loading state that feels alive, a menu that opens with purpose.</p>

<p>Micro-animations serve both aesthetic and functional purposes. They guide attention, confirm actions, and make an interface feel responsive and alive.</p>

<h2>Trend 3: Bento Grid Layouts</h2>
<p>Inspired by the Japanese bento box, this layout style arranges content in a modular, mosaic grid. It's perfect for portfolio pages, dashboards, and feature showcases where you want to display varied content types without a conventional list structure.</p>

<h2>Core UX Principles That Never Go Out of Style</h2>
<p>While trends come and go, certain UX principles are timeless:</p>

<ul>
<li><strong>Fitts's Law</strong> - Make important targets large and easy to click</li>
<li><strong>Progressive Disclosure</strong> - Show only what users need, when they need it</li>
<li><strong>Affordance</strong> - Elements should communicate how they're used</li>
<li><strong>Feedback</strong> - Every action should have a clear system response</li>
</ul>

<h2>Designing for Accessibility</h2>
<p>Accessibility is not an optional feature — it's a fundamental design requirement. Beyond legal obligations, accessible design almost always leads to better experiences for everyone.</p>

<p>Start with color contrast ratios (WCAG AA requires 4.5:1 for normal text), ensure all interactive elements are keyboard navigable, and provide meaningful alt text for images.</p>

<h2>Conclusion</h2>
<p>Great UI/UX design in 2024 is about blending aesthetic excellence with deep empathy for your users. Study the trends, internalize the principles, and always return to asking: does this make the experience better for the people who will use it?</p>`,
      },
      {
        title: 'Why MongoDB is the Right Choice for Content-Heavy Applications',
        slug: 'why-mongodb-right-choice-content-heavy-applications',
        category: 'Development',
        tags: ['MongoDB', 'Node.js', 'API'],
        status: 'published',
        author: 'Admin',
        excerpt: 'Exploring when and why MongoDB outshines relational databases for applications with rich, flexible content models like blogs, e-commerce platforms, and CMSs.',
        featuredImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&q=80',
        metaTitle: 'MongoDB for Content-Heavy Applications - BuildINCode Blog',
        metaDescription: 'Learn why MongoDB is the ideal database choice for content-rich apps like blogs and e-commerce platforms.',
        content: `<h2>The Document Model Advantage</h2>
<p>When building content-heavy applications, the database you choose has profound implications for your development velocity, query performance, and long-term flexibility. MongoDB's document model offers unique advantages that make it particularly well-suited for these use cases.</p>

<h2>Rich, Nested Documents</h2>
<p>Consider a blog post. In a relational database, a post might be spread across multiple tables: posts, tags, categories, authors, meta_data. Querying a full post requires multiple JOINs.</p>

<p>In MongoDB, a blog post is a single document that naturally contains all its related data. This isn't just more convenient — it's fundamentally faster for read-heavy workloads.</p>

<h2>Schema Flexibility</h2>
<p>Content evolves. The fields you need today won't be the same as what you need in 18 months. MongoDB's flexible schema lets you add new fields without migrations, gradually upgrade your data model, and support varied content types in the same collection.</p>

<h2>Aggregation Pipeline</h2>
<p>MongoDB's aggregation pipeline is one of its most powerful features. For a blog platform, you can calculate stats, group by category, filter on multiple fields, and paginate — all in a single, efficient query.</p>

<h2>When to Use Relational Instead</h2>
<p>MongoDB isn't always the right tool. Use PostgreSQL or MySQL when you have highly relational data with complex transactions, need strict ACID compliance across multiple entities, or your team has strong SQL expertise.</p>

<h2>Our Stack Recommendation</h2>
<p>For content-heavy applications, we consistently recommend the MERN stack: MongoDB, Express, React, and Node.js. The JSON-native nature of MongoDB pairs beautifully with JavaScript throughout the entire stack.</p>`,
      },
      {
        title: 'SEO in 2024: What Actually Moves the Needle',
        slug: 'seo-2024-what-actually-moves-the-needle',
        category: 'Marketing',
        tags: ['SEO', 'Performance'],
        status: 'published',
        author: 'Admin',
        excerpt: 'Cut through the noise: these are the SEO strategies that are actually producing results in 2024, from Core Web Vitals to E-E-A-T signals.',
        featuredImage: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1200&q=80',
        metaTitle: 'SEO 2024: What Actually Works - BuildINCode Blog',
        metaDescription: 'Discover which SEO strategies are actually working in 2024, from Core Web Vitals to content depth signals.',
        content: `<h2>The SEO Landscape Has Changed</h2>
<p>With Google's Helpful Content updates, the rise of AI-generated content, and increasingly sophisticated ranking algorithms, SEO in 2024 looks very different from even two years ago. What worked before might be actively hurting you now.</p>

<h2>E-E-A-T Is Everything</h2>
<p>Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) is now a primary signal Google uses to evaluate content quality. This means:</p>

<ul>
<li>Demonstrate real-world experience with your content topics</li>
<li>Show author credentials and expertise</li>
<li>Build authoritative backlinks from reputable sources</li>
<li>Create transparent, trustworthy content</li>
</ul>

<h2>Core Web Vitals</h2>
<p>Technical performance is a confirmed ranking factor. Your site needs to excel at:</p>

<ul>
<li><strong>LCP (Largest Contentful Paint)</strong> - Under 2.5 seconds</li>
<li><strong>FID (First Input Delay)</strong> - Under 100ms</li>
<li><strong>CLS (Cumulative Layout Shift)</strong> - Under 0.1</li>
</ul>

<h2>The Content Depth Signal</h2>
<p>Thin content is being penalized more aggressively than ever. Google wants content that thoroughly covers a topic, not content that hits a keyword density target. Think about what questions your reader has, and answer all of them comprehensively.</p>

<h2>Structured Data</h2>
<p>Schema markup (JSON-LD) helps Google understand your content and can unlock rich results in SERPs. For a blog, implement Article, BreadcrumbList, and FAQ schemas where appropriate.</p>

<h2>Conclusion</h2>
<p>The fundamentals of great SEO remain the same: create genuinely helpful content, build a technically excellent website, and earn authoritative links. The specifics of how you execute on these fundamentals have changed significantly in 2024.</p>`,
      },
      {
        title: 'From Idea to Launch: The Startup Tech Stack in 2024',
        slug: 'from-idea-to-launch-startup-tech-stack-2024',
        category: 'Business',
        tags: ['Startup', 'React', 'DevOps'],
        status: 'draft',
        author: 'Admin',
        excerpt: 'Choosing the right tech stack can make or break your startup. Here is our opinionated guide to the technologies that help startups move fast without breaking everything.',
        featuredImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80',
        metaTitle: 'Startup Tech Stack 2024 - BuildINCode Blog',
        metaDescription: "The BuildINCode team's opinionated guide to the best tech stack for startups in 2024.",
        content: `<h2>Why Your Tech Stack Choice Matters</h2>
<p>For a startup, your technology choices compound over time. The framework you pick today will shape your hiring, your architecture, your speed of iteration, and your infrastructure costs for years to come.</p>

<h2>Our Recommended Stack</h2>
<p>After building dozens of products for startups, here's what we recommend for 2024:</p>

<h3>Frontend</h3>
<p>React with TypeScript remains our top recommendation. The ecosystem is unmatched, the talent pool is deep, and TypeScript prevents a whole class of bugs before they reach production.</p>

<h3>Backend</h3>
<p>Node.js with Express or Fastify for APIs. If you need a full-stack framework, Next.js App Router has matured significantly and gives you excellent DX with built-in optimizations.</p>

<h3>Database</h3>
<p>MongoDB for flexible schemas and rapid iteration. Add PostgreSQL when you need relational integrity. Redis for caching and session storage.</p>

<h3>Infrastructure</h3>
<p>Start with Vercel for the frontend and Railway or Render for your backend. Scale to AWS as your traffic demands it — premature infrastructure optimization is a startup killer.</p>

<h2>What to Avoid</h2>
<p>Startups often make the mistake of choosing technologies because they're exciting rather than because they solve real problems. Avoid over-engineering your architecture in the early stages. A monolith that ships is worth more than microservices that delay your launch by six months.</p>

<h2>Conclusion</h2>
<p>The best tech stack for a startup is the one your team can execute on quickly and confidently. Use proven technologies, prioritize developer experience, and optimize for shipping.</p>`,
      },
    ];

    await Blog.insertMany(sampleBlogs);
    console.log('✅ Sample blog posts created (4 published, 1 draft)');

    console.log('\n🎉 Blog system seeded successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Admin Email: admin@buildincode.com');
    console.log('🔑 Admin Password: admin123');
    console.log('🌐 Login URL: http://localhost:5173/blog/admin/login');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding blog data:', error);
    process.exit(1);
  }
};

seedBlogData();
