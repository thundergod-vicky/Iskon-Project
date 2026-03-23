import mongoose from 'mongoose';

const CourseRegistrationSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  paymentStatus: { type: String, default: 'Pending' }
}, { timestamps: true });

export default mongoose.models.CourseRegistration || mongoose.model('CourseRegistration', CourseRegistrationSchema);
