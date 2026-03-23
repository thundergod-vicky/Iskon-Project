import mongoose from 'mongoose';

const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  availability: { type: String },
  areaOfInterest: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Contacted', 'Active'], default: 'Pending' }
}, {
  timestamps: true
});

export default mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);
