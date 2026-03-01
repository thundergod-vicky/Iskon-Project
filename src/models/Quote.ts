import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please provide the quote text'],
    trim: true,
  },
  source: {
    type: String,
    required: [true, 'Please provide the source (book, lecture, etc.)'],
    trim: true,
  },
  date: {
    type: String, // Optional date or approximate year
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Quote || mongoose.model('Quote', quoteSchema);
