import mongoose from "mongoose";
import { IBailleur } from "../interfaces/IBailleur";

  const BailleurSchema = new mongoose.Schema<IBailleur>({

       createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model("Bailleur", BailleurSchema);