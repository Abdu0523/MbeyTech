import mongoose from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const ProductSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Categorie",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  
});

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
export default ProductModel;
