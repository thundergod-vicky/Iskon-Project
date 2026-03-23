import mongoose from 'mongoose';

const MembershipRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  membershipLevelId: { type: mongoose.Schema.Types.ObjectId, ref: 'MembershipLevel' },
  membershipLevelName: { type: String }, // redundant but easier for list view
  status: { type: String, enum: ['Pending', 'Approved', 'Cancelled'], default: 'Pending' },
  isPaid: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.models.MembershipRequest || mongoose.model('MembershipRequest', MembershipRequestSchema);
