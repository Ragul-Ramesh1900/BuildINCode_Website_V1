import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  category: String,
  services: [{
    icon: String,
    name: String,
    description: String
  }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
