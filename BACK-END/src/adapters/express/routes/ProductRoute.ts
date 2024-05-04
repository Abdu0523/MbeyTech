import express from 'express';
import  {ProductController}  from '../controllers/ProductController';
import { ProductUseCase } from '../../../infrastructure/use-cases/ProductUseCase';
import { ProductRepository } from '../../../infrastructure/repositories/ProductRepository';

export const productRoutes = express.Router();

const productRepository = new ProductRepository();
const productUseCase = new ProductUseCase(productRepository);
const productController = new ProductController(productUseCase);

productRoutes.post('/create', async (req, res) => productController.createProduct(req, res));
productRoutes.get('/getAll', async (req, res) => productController.getAllProducts(req, res));
productRoutes.get('/:id', async (req, res) => productController.getProductById(req, res));
productRoutes.put('/:id', async (req, res) => productController.updateProduct(req, res));
productRoutes.delete('/:id', async (req, res) => productController.deleteProduct(req, res));

export default productRoutes;
