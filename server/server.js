import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// Existing routes
import heroRoutes from './routes/hero.js';
import projectRoutes from './routes/projects.js';
import serviceRoutes from './routes/services.js';
import testimonialRoutes from './routes/testimonials.js';
import contactRoutes from './routes/contact.js';

// Blog system routes
import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blogs.js';
import categoryRoutes from './routes/categories.js';
import tagRoutes from './routes/tags.js';
import blogSettingsRoutes from './routes/blogSettings.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://build-in-code-website-v1.vercel.app']
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Create a router for all API endpoints
const apiRouter = express.Router();

// Existing routes
apiRouter.use('/hero', heroRoutes);
apiRouter.use('/projects', projectRoutes);
apiRouter.use('/services', serviceRoutes);
apiRouter.use('/testimonials', testimonialRoutes);
apiRouter.use('/contact', contactRoutes);

// Blog system routes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/blogs', blogRoutes);
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/tags', tagRoutes);
apiRouter.use('/blog', blogSettingsRoutes);
apiRouter.use('/upload', uploadRoutes);

apiRouter.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running', timestamp: new Date().toISOString() });
});

// Mount the router on both /api (local dev) and / (Vercel serverless strip fallback)
app.use('/api', apiRouter);
app.use('/', apiRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running', timestamp: new Date().toISOString() });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Blog Admin API: http://localhost:${PORT}/api`);
  });
}

export default app;
