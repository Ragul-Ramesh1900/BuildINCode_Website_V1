import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  badge: String,
  title: String,
  highlightedText: String,
  description: String,
  stats: [{
    number: String,
    label: String
  }]
}, { timestamps: true });

export default mongoose.model('Hero', heroSchema);
