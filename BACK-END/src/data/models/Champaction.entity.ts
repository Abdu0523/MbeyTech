import mongoose from "mongoose";
import { IChampaction } from "../interfaces/IChampaction";

const ChampactionSchema = new mongoose.Schema<IChampaction>({
  champ:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Champ",
  },
  date_debut: {
    type: String,
    required: false
  },
  date_fin: {
    type: String,
    required: false
  },
  prenom: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  }, 
  status: {
    type: String,
    required: true
  }  
});

const ChampactionModel = mongoose.model<IChampaction>("Champaction", ChampactionSchema);
export default ChampactionModel;
