import mongoose, { Schema, Document } from "mongoose";

export interface ICategorie {
  nom: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
