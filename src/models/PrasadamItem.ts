import mongoose from 'mongoose';

const PrasadamItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.PrasadamItem || mongoose.model('PrasadamItem', PrasadamItemSchema);
