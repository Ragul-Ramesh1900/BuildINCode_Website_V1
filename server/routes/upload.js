import express from 'express';
import { upload, cloudinary } from '../config/cloudinary.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST /api/upload/image (protected - admin only)
router.post('/image', protect, (req, res) => {
  upload.single('image')(req, res, async (err) => {
    // Handle multer / file type errors
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'Image size exceeds the 5MB limit. Please compress or resize your image.',
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed',
      });
    }

    // No file received
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided. Please select an image to upload.',
      });
    }

    try {
      // Cloudinary already uploaded the file via multer-storage-cloudinary.
      // req.file.path = cloudinary secure URL
      // req.file.filename = cloudinary public_id
      const secureUrl = req.file.path;
      const publicId  = req.file.filename;

      return res.status(200).json({
        success: true,
        url: secureUrl,          // Cloudinary CDN secure_url
        publicId,                // Cloudinary public_id (for future deletion)
        message: 'Image uploaded successfully',
      });
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload image to Cloudinary. Please try again.',
      });
    }
  });
});

// DELETE /api/upload/image/:publicId (protected - admin only)
// Useful for cleaning up Cloudinary when a blog post is deleted
router.delete('/image/:publicId', protect, async (req, res) => {
  try {
    // publicId may contain slashes (folder/filename) - decode it
    const publicId = decodeURIComponent(req.params.publicId);
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      return res.json({ success: true, message: 'Image deleted from Cloudinary' });
    }
    return res.status(404).json({ success: false, message: 'Image not found on Cloudinary' });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete image' });
  }
});

export default router;
