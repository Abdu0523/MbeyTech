import mongoose from "mongoose";

export interface IProduit {
    nom: string;
    statut: string;
    quantite: string;
    description: string;
    prix: String;
    categorie: mongoose.Schema.Types.ObjectId[];
    createdAt : Date;
    updatedAt: Date;

  }