import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  company: String,
  content: String,
  rating: { type: Number, min: 1, max: 5 },
  avatar: String,
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
