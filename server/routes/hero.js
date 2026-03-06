import express from 'express';
import Hero from '../models/Hero.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (hero) {
      hero = await Hero.findByIdAndUpdate(hero._id, req.body, { new: true });
    } else {
      hero = await Hero.create(req.body);
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
