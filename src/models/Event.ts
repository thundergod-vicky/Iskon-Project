import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide an event description'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide an event date'],
  },
  time: {
    type: String,
    required: [true, 'Please provide an event time (e.g., 10:00 AM)'],
  },
  location: {
    type: String,
    required: [true, 'Please provide an event location'],
    default: 'ISKCON Durgapur Temple',
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL'],
    default: '/images/events-and-festival.jpg',
  },
  isUpcoming: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
