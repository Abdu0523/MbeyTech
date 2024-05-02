import mongoose from "mongoose";
import { IAcheteur } from "../interfaces/IAcheteur";

  const AcheteurSchema = new mongoose.Schema<IAcheteur>({

       createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model("Acheteur", AcheteurSchema);