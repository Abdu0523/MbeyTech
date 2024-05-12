import express from 'express';
import { Request, Response } from 'express';
import  {ProductController}  from '../controllers/ProductController';
import { ProductUseCase } from '../../../infrastructure/use-cases/ProductUseCase';
import { ProductRepository } from '../../../infrastructure/repositories/ProductRepository';
import multer from "multer";
import path from "path";

export const productRoutes = express.Router();

const productRepository = new ProductRepository();
const productUseCase = new ProductUseCase(productRepository);
const productController = new ProductController(productUseCase);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'src/uploads');
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

  const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
};

  const upload = multer({ 
    storage: storage ,
    fileFilter: fileFilter
  }); 


productRoutes.post('/create', upload.single('image'), async (req : Request, res : Response) => productController.createProduct(req, res));
productRoutes.get('/getAll', async (req, res) => productController.getAllProducts(req, res));
productRoutes.get('/:id', async (req, res) => productController.getProductById(req, res));
productRoutes.put('/:id', async (req, res) => productController.updateProduct(req, res));
productRoutes.delete('/:id', async (req, res) => productController.deleteProduct(req, res));
productRoutes.get('/category/:categoryId', async (req, res) => productController.getProductsByCategory(req, res));

export default productRoutes;
