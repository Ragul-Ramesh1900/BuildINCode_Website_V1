import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  problem: String,
  solution: String,
  technologies: [String],
  result: String,
  colorGradient: String,
  image: String,
  link: String,
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
