import mongoose from "mongoose";

export interface IOrder {
  _id: mongoose.Schema.Types.ObjectId;
  person: mongoose.Schema.Types.ObjectId[];
  status: String;
  validated: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
