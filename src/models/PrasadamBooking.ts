import mongoose from 'mongoose';

const PrasadamBookingSchema = new mongoose.Schema({
  items: [{
    prasadamItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'PrasadamItem' },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  deliveryAddress: { type: String, required: false },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'] }
}, { timestamps: true });

export default mongoose.models.PrasadamBooking || mongoose.model('PrasadamBooking', PrasadamBookingSchema);
