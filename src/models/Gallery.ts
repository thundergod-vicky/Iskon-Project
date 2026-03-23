import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  src: { type: String, required: true },
  thumbnail: { type: String },
  category: { type: String, default: 'All' },
  width: { type: Number, default: 1920 },
  height: { type: Number, default: 1080 },
  active: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
