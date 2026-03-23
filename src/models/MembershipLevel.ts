import mongoose from 'mongoose';

const MembershipLevelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  subtitle: { type: String }, // e.g. "One-time offering" or "Per year"
  icon: { type: String, default: 'FaStar' }, // Name of the icon
  color: { type: String, default: 'from-amber-400 to-amber-600' },
  bgLight: { type: String, default: 'bg-amber-50' },
  border: { type: String, default: 'border-amber-200' },
  benefits: [{ type: String }],
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.models.MembershipLevel || mongoose.model('MembershipLevel', MembershipLevelSchema);
