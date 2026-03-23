import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  duration: { type: String, default: "1 Month" },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
