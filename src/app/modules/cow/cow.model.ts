import { Schema, model } from 'mongoose';
import { CowBreed, CowCategory, CowLabel, CowLocation } from './cow.constants';
import { CowModel, ICow } from './cow.interface';

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: CowLocation,
      required: true,
    },
    breed: {
      type: String,
      required: true,
      enum: CowBreed,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: CowLabel,
    },
    category: {
      type: String,
      required: true,
      enum: CowCategory,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

cowSchema.statics.isCowAuthor = async function (
  cowId: string,
  sellerId: string
): Promise<ICow | null> {
  return await Cow.findOne({ _id: cowId, seller: sellerId });
};

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
