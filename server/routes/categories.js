import express from 'express';
import Category from '../models/Category.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/categories (public)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/categories (admin)
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, color } = req.body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const existing = await Category.findOne({ $or: [{ name }, { slug }] });
    if (existing) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({ name, slug, description, color });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/categories/:id (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const { name, description, color } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, color },
      { new: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/categories/:id (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
