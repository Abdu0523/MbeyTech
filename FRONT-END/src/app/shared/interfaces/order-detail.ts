import { Product } from "../../admin/components/product/shared/models/products";
import { Order } from "./order";

export interface OrderDetail {
  _id?: string;
  order?: [Order];
  product: [Product];
  quantity: number;
  unitPrice: number;
  status?: string;
}
