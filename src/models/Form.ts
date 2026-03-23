import mongoose from 'mongoose';

const FormFieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  name: { type: String, required: true }, // slugified label or explicit name
  type: { 
    type: String, 
    enum: ['text', 'textarea', 'number', 'email', 'tel', 'date', 'select', 'file', 'checkbox'], 
    default: 'text' 
  },
  required: { type: Boolean, default: false },
  options: [{ type: String }], // for select/checkbox
  placeholder: { type: String },
  order: { type: Number, default: 0 }
});

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  slug: { type: String, required: true, unique: true },
  fields: [FormFieldSchema],
  active: { type: Boolean, default: true },
  successMessage: { type: String, default: 'Thank you for your submission!' }
}, {
  timestamps: true
});

export default mongoose.models.Form || mongoose.model('Form', FormSchema);
