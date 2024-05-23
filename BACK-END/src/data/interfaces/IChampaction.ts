import mongoose from "mongoose";
export interface IChampaction {
    champ: mongoose.Schema.Types.ObjectId;
    date_debut: string;
    date_fin: string;
    prenom:string;
    nom:string;
    telephone:string;
    status: string;
}