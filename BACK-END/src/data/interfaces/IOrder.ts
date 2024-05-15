import mongoose from "mongoose";

export interface IOrder {
    person: mongoose.Schema.Types.ObjectId;
    status: String;
    validated: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }