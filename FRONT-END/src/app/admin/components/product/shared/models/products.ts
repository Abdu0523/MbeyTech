export interface Products{

  _id: string;
  name: string;
  description: string;
  status: string;
  image: string;
  price: number;
  quantity: number;
 // categoryId: number;
}

export class Product implements Products{
    constructor(
       public _id: string,
       public name: string,
       public description: string,
       public status: string,
       public image: string,
       public price: number,
       public quantity: number,
    ){}
}