import { faker } from "@faker-js/faker";
import { Product } from "../interfaces/product";


export function createProduct(): Product {
    const hasPromo = faker.datatype.boolean();
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: faker.image.urlLoremFlickr({category: 'shoes'}),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
      date: faker.date.anytime(),
      promoVal: hasPromo ? faker.number.int({ min: 10, max: 60 }) : undefined,
    };
}

export function createProducts(nombreDeProduits: number = 10): Product[] {
    return faker.helpers.multiple(createProduct, {
        count: nombreDeProduits
    })
}