import mongoose from "mongoose";
import { ICategorie } from "../interfaces/ICategorie";

const CategorieSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  // description: {
  //     type: String,
  //     required: true,
  // },

  image: {
    type: String,
    required: true,
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

//   module.exports = mongoose.model("Categorie", CategorieSchema);
const CategorieModel = mongoose.model<ICategorie>("Categorie", CategorieSchema);
export default CategorieModel;
