export interface OrderDetail {
    _id?: string;
    order?: string;
    product: string;
    quantity: number;
    unitPrice: number;
    status?: string;
  }