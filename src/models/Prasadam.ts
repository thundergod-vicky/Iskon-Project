import mongoose, { Schema, Document } from 'mongoose';

export interface IPrasadam extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isVegan: boolean;
  ingredients: string[];
  available: boolean;
}

const PrasadamSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 5 },
  isVegan: { type: Boolean, default: false },
  ingredients: [{ type: String }],
  available: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.models.Prasadam || mongoose.model<IPrasadam>('Prasadam', PrasadamSchema);
