// Interface for a product
export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price?: string;
    category?: string;
    date: Date;    // date
    promoVal?: number; // statut
}