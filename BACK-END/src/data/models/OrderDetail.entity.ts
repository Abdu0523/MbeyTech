import mongoose from "mongoose";
import { IOrderDetail } from "../interfaces/IOrderDetail";

const OrderDetailSchema = new mongoose.Schema<IOrderDetail>({
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
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

const OrderDetailModel = mongoose.model<IOrderDetail>("OrderDetail", OrderDetailSchema);
export default OrderDetailModel;
