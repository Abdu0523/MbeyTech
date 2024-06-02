import { Category } from "../../../../../shared/interfaces/category";

export interface Products{

  _id: string;
  name: string;
  description: string;
  status: boolean;
  image: string;
  price: number;
  quantity: number;
  category: Category[];
}

export class Product implements Products{
    constructor(
       public _id: string,
       public name: string,
       public description: string,
       public status: boolean,
       public image: string,
       public price: number,
       public quantity: number,
       public category: Category[]
    ){}
}