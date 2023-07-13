import mongoose, { Model } from "mongoose";

export type IOrder = {
  cow: mongoose.Types.ObjectId;
  buyer: mongoose.Types.ObjectId;
  status: string;
}

export type OrderModel = Model<IOrder, Record<string, unknown>>;
