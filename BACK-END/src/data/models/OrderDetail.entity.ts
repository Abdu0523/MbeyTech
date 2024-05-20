import mongoose from "mongoose";
import { IOrderDetail } from "../interfaces/IOrderDetail";

const OrderDetailSchema = new mongoose.Schema<IOrderDetail>({
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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

OrderDetailSchema.virtual('productInfo', {
    ref: 'Product',
    localField: 'productId',
    foreignField: '_id',
    justOne: true
  });
  
  OrderDetailSchema.virtual('orderInfo', {
    ref: 'Order',
    localField: 'orderId',
    foreignField: '_id',
    justOne: true
  });

const OrderDetailModel = mongoose.model<IOrderDetail>("OrderDetail", OrderDetailSchema);
export default OrderDetailModel;
