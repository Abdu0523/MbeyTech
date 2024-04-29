import mongoose from "mongoose";
import { IProduit } from "../interfaces/IProduit";

  const ProduitSchema = new mongoose.Schema<IProduit>({

    nom: {
        type: String,
        required: true,
    },
    statut: {
        type: String,
        required: true,
    },
    quantite: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    prix: {
        type: String,
        required: true,
    },
    categorie: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model("Produit", ProduitSchema);