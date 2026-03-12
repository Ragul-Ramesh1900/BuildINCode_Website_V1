import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blog-images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      {
        quality: 'auto:good',   // Auto-compress while maintaining quality
        fetch_format: 'auto',   // Auto-convert to WebP when supported
      },
    ],
    resource_type: 'image',
  },
});

// Multer upload middleware with 5MB file size limit
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, JPEG, PNG, and WebP images are allowed'));
    }
  },
});

export { cloudinary };
