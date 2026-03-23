import mongoose from 'mongoose';

const RetreatRegistrationSchema = new mongoose.Schema({
  retreatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Retreat', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  paymentStatus: { type: String, default: 'Pending' }
}, { timestamps: true });

export default mongoose.models.RetreatRegistration || mongoose.model('RetreatRegistration', RetreatRegistrationSchema);
