import express from 'express';
import BlogSettings from '../models/BlogSettings.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/blog/settings (public readable)
router.get('/settings', async (req, res) => {
  try {
    let settings = await BlogSettings.findOne();
    if (!settings) {
      settings = await BlogSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/blog/settings (admin only)
router.put('/settings', protect, async (req, res) => {
  try {
    let settings = await BlogSettings.findOne();
    if (!settings) {
      settings = new BlogSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json(settings);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
