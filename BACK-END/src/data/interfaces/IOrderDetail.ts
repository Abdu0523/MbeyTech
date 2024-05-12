import mongoose from "mongoose";

export interface IOrderDetail {
    id: mongoose.Schema.Types.ObjectId;
    order: mongoose.Schema.Types.ObjectId[];
    product: mongoose.Schema.Types.ObjectId[];
    quantity: number;
    unitPrice: number;
    status: String;
    createdAt?: Date;
    updatedAt?: Date;
  }