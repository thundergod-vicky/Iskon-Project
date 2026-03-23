import mongoose from 'mongoose';

const FormSubmissionSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  data: { type: Object, required: true }, // arbitrary JSON from form fields
  status: { type: String, enum: ['Pending', 'Contacted', 'Approved', 'Rejected'], default: 'Pending' }
}, {
  timestamps: true
});

export default mongoose.models.FormSubmission || mongoose.model('FormSubmission', FormSubmissionSchema);
