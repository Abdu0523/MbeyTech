import mongoose from "mongoose";
import { IProducteur } from "../interfaces/IProducteur";
const ProducteurSchema = new mongoose.Schema<IProducteur>({

   createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model("Acheteur", ProducteurSchema);