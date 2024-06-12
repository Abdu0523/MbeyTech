import mongoose from "mongoose";
import { IOrder } from "./IOrder";
import { IProduct } from "./IProduct";

export interface IOrderDetail {
  order: mongoose.Schema.Types.ObjectId[];
  product: mongoose.Schema.Types.ObjectId[];
  quantity: number;
  unitPrice: number;
  status: String;
  productInfo: any; // Informations sur le produit
  orderInfo: any;
  createdAt?: Date;
  updatedAt?: Date;
}
