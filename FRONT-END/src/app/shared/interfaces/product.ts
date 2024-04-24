// Interface for a product
export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price?: string;
    category?: string;
    promo: boolean;
    promoVal?: number; // Optionel
}