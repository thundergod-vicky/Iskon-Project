import mongoose from 'mongoose';

const RetreatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  duration: { type: String, default: "3 Days" },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Retreat || mongoose.model('Retreat', RetreatSchema);
