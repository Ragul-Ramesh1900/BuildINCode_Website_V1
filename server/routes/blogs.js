import express from 'express';
import Blog from '../models/Blog.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/blogs/stats (protected)
router.get('/stats', protect, async (req, res) => {
  try {
    const total = await Blog.countDocuments();
    const published = await Blog.countDocuments({ status: 'published' });
    const drafts = await Blog.countDocuments({ status: 'draft' });
    const avgViews = await Blog.aggregate([
      { $group: { _id: null, avg: { $avg: '$views' } } }
    ]);

    res.json({
      total,
      published,
      drafts,
      avgViews: avgViews.length > 0 ? Math.round(avgViews[0].avg) : 0,
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/blogs/slug/:slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' });
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error('Get blog by slug error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/blogs (public - only published, admin gets all)
router.get('/', async (req, res) => {
  try {
    const { status, search, category, tag, limit, page = 1 } = req.query;

    const filter = {};

    // If no auth header provided, only return published posts
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      filter.status = 'published';
    } else if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    if (tag) {
      filter.tags = { $in: [tag] };
    }

    const limitNum = limit ? parseInt(limit) : 0;
    const skip = (parseInt(page) - 1) * limitNum;

    let query = Blog.find(filter).sort({ createdAt: -1 });

    if (limitNum > 0) {
      query = query.skip(skip).limit(limitNum);
    }

    const blogs = await query;
    const total = await Blog.countDocuments(filter);

    res.json(blogs);
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/blogs/:id (admin)
router.get('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/blogs (admin)
router.post('/', protect, async (req, res) => {
  try {
    const { title, slug, content, excerpt, featuredImage, category, tags, status, author, metaTitle, metaDescription } = req.body;

    // Check for duplicate slug
    const existing = await Blog.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: 'A post with this slug already exists' });
    }

    const blog = new Blog({
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      category,
      tags: Array.isArray(tags) ? tags : (tags ? [tags] : []),
      status: status || 'draft',
      author: author || req.user?.name || 'Admin',
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/blogs/:id (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const { title, slug, content, excerpt, featuredImage, category, tags, status, author, metaTitle, metaDescription } = req.body;

    // Check for duplicate slug (exclude current post)
    if (slug) {
      const existing = await Blog.findOne({ slug, _id: { $ne: req.params.id } });
      if (existing) {
        return res.status(400).json({ message: 'A post with this slug already exists' });
      }
    }

    const updateData = {
      ...(title && { title }),
      ...(slug && { slug }),
      ...(content !== undefined && { content }),
      ...(excerpt !== undefined && { excerpt }),
      ...(featuredImage !== undefined && { featuredImage }),
      ...(category !== undefined && { category }),
      ...(tags !== undefined && { tags: Array.isArray(tags) ? tags : [tags] }),
      ...(status && { status }),
      ...(author && { author }),
      ...(metaTitle !== undefined && { metaTitle }),
      ...(metaDescription !== undefined && { metaDescription }),
    };

    // Set publishedAt if publishing for first time
    if (status === 'published') {
      const blog = await Blog.findById(req.params.id);
      if (blog && !blog.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/blogs/:id (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
