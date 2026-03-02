import mongoose from 'mongoose';

const audioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an audio title'],
    trim: true,
  },
  speaker: {
    type: String,
    required: [true, 'Please provide a speaker name'],
    default: 'Unknown',
  },
  audioUrl: {
    type: String,
    required: [true, 'Please provide the audio URL'],
  },
  duration: {
    type: String,
    default: '0:00',
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['Lecture', 'Kirtan', 'Bhajan', 'Guided Meditation', 'Other'],
    default: 'Lecture',
  },
  tags: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    default: '/images/audio-placeholder.jpg',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Audio || mongoose.model('Audio', audioSchema);
