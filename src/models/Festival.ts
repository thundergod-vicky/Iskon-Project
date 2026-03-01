import mongoose from 'mongoose';

const festivalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a festival name'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Please provide a festival date'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a festival description'],
  },
  image: {
    type: String,
    default: '/images/events-and-festival.jpg',
  },
  location: {
    type: String,
    default: 'ISKCON Durgapur',
  },
  significance: {
    type: [String],
    default: [],
  },
  preparations: {
    type: [String],
    default: [],
  },
  isMajor: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Festival || mongoose.model('Festival', festivalSchema);
