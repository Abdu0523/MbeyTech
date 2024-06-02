import mongoose from "mongoose";

export interface IProduct {
    //id: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    status: boolean;
    image: string;
    price: number;
    quantity: number;
    category: mongoose.Schema.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
  }