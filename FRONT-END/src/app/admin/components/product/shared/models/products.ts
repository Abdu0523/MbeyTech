export interface Products{

  _id: string;
  name: string;
  description: string;
  status: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
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
       public category: string
    ){}
}