import mongoose from 'mongoose';

const blogSettingsSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    default: 'BuildINCode Blog',
  },
  blogDescription: {
    type: String,
    default: 'Stay updated with the latest trends in technology, design, and digital transformation.',
  },
  blogTagline: {
    type: String,
    default: 'Insights from the Builders of Tomorrow',
  },
  postsPerPage: {
    type: Number,
    default: 10,
  },
  allowComments: {
    type: Boolean,
    default: false,
  },
  defaultCategory: {
    type: String,
    default: 'Technology',
  },
  socialLinks: {
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
  },
  seo: {
    metaTitle: { type: String, default: 'BuildINCode Blog - Tech & Digital Insights' },
    metaDescription: { type: String, default: 'Expert insights on technology, design, and digital transformation from BuildINCode.' },
    googleAnalyticsId: { type: String, default: '' },
  },
}, {
  timestamps: true,
});

export default mongoose.model('BlogSettings', blogSettingsSchema);
