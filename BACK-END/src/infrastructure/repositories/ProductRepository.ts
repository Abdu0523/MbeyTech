import ProductModel from '../../data/models/Product.entity';
import { IProduct } from '../../data/interfaces/IProduct';

export  class ProductRepository {
    async create(product: IProduct): Promise<IProduct> {
        try {
            const createdProduct = await ProductModel.create(product);
            return createdProduct.toJSON();
        } catch (error) {
            throw new Error(`Error while creating product: ${error}`);
        }
    }

    async findAll(): Promise<IProduct[]> {
        try {
            const products = await ProductModel.find()    
            .populate('category');
            return products.map(product => product.toJSON());
        } catch (error) {
            throw new Error(`Error while finding products: ${error}`);
        }
    }

     async findById(id: string): Promise<IProduct | null> {
        try {
            const product = await ProductModel.findById(id)
            .populate('category');
            return product ? product.toJSON() : null;
        } catch (error) {
            throw new Error(`Error while finding product by id: ${error}`);
        }
    }

     async update(id: string, updatedProduct: IProduct): Promise<IProduct | null> {
        try {
            const product = await ProductModel.findByIdAndUpdate(id, updatedProduct, { new: true })
            .populate('category');
            return product ? product.toJSON() : null;
        } catch (error) {
            throw new Error(`Error while updating product: ${error}`);
        }
    }

     async delete(id: string): Promise<void> {
        try {
            await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error while deleting product: ${error}`);
        }
    }

    async getProductsByCategory(categoryId: string): Promise<IProduct[]> {
        try {
            const products = await ProductModel.find({ category: categoryId })
                .populate('category');
            return products.map(product => product.toJSON());
        } catch (error) {
            throw new Error(`Error while finding products by category: ${error}`);
        }
    }

    async getByName(name : string): Promise<IProduct | null> {
        return await ProductModel.findOne({name})
    }
   
    }



