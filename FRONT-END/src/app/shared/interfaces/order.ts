import { User } from "./user";

export interface Order {
  _id?: string;
  person: [User];
  status?: string;
  validated?: boolean;
  createdAt?: Date;
  updateAt?: Date;
}
