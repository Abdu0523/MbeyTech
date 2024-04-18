import { faker } from "@faker-js/faker";
import { Category } from "../interfaces/category";


export function createCategory(): Category {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.department(),
    };
}

export function createCategories(numberOfCategories: number = 10): Category[] {
    return faker.helpers.multiple(createCategory, {
        count: numberOfCategories
    })
}