import mongoose from "mongoose";
import { IChamp } from "../interfaces/IChamp";

  const ChampSchema = new mongoose.Schema<IChamp>({

    surface: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    geolocalisation: { 
        type: String,
        required: true,
    },
    prix: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
  });

const ChampModel = mongoose.model<IChamp>("Champ", ChampSchema);
export default ChampModel;