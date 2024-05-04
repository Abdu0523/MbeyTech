import { ProductRepository } from '../repositories/ProductRepository';
import { IProduct } from '../../data/interfaces/IProduct';

export  class ProductUseCase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async createProduct(product: IProduct): Promise<IProduct> {
        try {
            const createdProduct = await this.productRepository.create(product);
            return createdProduct;
        } catch (error) {
            throw new Error(`Error while creating product: ${error}`);
        }
    }

    async getAllProducts(): Promise<IProduct[]> {
        try {
            const products = await this.productRepository.findAll();
            return products;
        } catch (error) {
            throw new Error(`Error while getting products: ${error}`);
        }
    }

     async getProductById(id: string): Promise<IProduct | null> {
        try {
            const product = await this.productRepository.findById(id);
            return product;
        } catch (error) {
            throw new Error(`Error while getting product by id: ${error}`);
        }
    }

     async updateProduct(id: string, updatedProduct: IProduct): Promise<IProduct | null> {
        try {
            const product = await this.productRepository.update(id, updatedProduct);
            return product;
        } catch (error) {
            throw new Error(`Error while updating product: ${error}`);
        }
    }

    async deleteProduct(id: string): Promise<void> {
        try {
            await this.productRepository.delete(id);
        } catch (error) {
            throw new Error(`Error while deleting product: ${error}`);
        }
    }
}
