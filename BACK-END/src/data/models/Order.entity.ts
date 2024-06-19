import mongoose from "mongoose";
import { IOrder } from "../interfaces/IOrder";

const OrderSchema = new mongoose.Schema<IOrder>({
  person: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personne",
    },
  ],
  validated: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.virtual('personneInfo', {
  ref: 'Personne',
  localField: 'personneId',
  foreignField: '_id',
  justOne: true
});

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
export default OrderModel;
