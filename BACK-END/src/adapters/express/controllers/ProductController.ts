import { Request, Response } from "express";
import { ProductUseCase } from "../../../infrastructure/use-cases/ProductUseCase";
import { IProduct } from "../../../data/interfaces/IProduct";
import path from "path";
import fs from 'fs';

export class ProductController {
  private productUseCase: ProductUseCase;

  constructor(productUseCase: ProductUseCase) {
    this.productUseCase = productUseCase;
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const newProduct: IProduct = req.body;
      
      if (req.file) {
        newProduct.image = req.file.path; 
      }
      const createdProduct = await this.productUseCase.createProduct(newProduct);
      res.status(201).json(createdProduct);
    } catch (error: any) {
      console.log("Error creating product", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }
  

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productUseCase.getAllProducts();
      res.status(200).json(products);
    } catch (error: any) {
      console.log("Error fetching product", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;
    try {
      const product = await this.productUseCase.getProductById(productId);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(200).json(product);
    } catch (error: any) {
      console.log("Error fetching byId", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;
    try {
      const updatedProduct: IProduct = req.body;

      // Récupérer le produit actuel pour obtenir l'ancienne image
      const currentProduct = await this.productUseCase.getProductById(productId);
      if (!currentProduct) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      // Supprimer l'ancienne image si une nouvelle image est téléchargée
      if (req.file) {
        const oldImagePath = path.join(__dirname, '../../../uploads', currentProduct.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
        updatedProduct.image = req.file.path;
      } else {
        // Si aucune nouvelle image n'est téléchargée, conservez l'ancienne image
        updatedProduct.image = currentProduct.image;
      }

      const product = await this.productUseCase.updateProduct(productId, updatedProduct);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.status(200).json(product);
    } catch (error: any) {
      console.log("Error updating product", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;
    try {
      await this.productUseCase.deleteProduct(productId);
      res.status(204).end();
    } catch (error: any) {
      console.log("Error deleting product", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async archiveProduct(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;
    try {
      const product = await this.productUseCase.getProductById(productId);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      // Vous pouvez implémenter l'archivage ici en modifiant la propriété 'status' ou 'archived' du produit
      // par exemple : product.status = 'inactive'; ou product.archived = true;
      await this.productUseCase.updateProduct(productId, product);

      res.status(200).json({ message: "Product archived successfully" });
    } catch (error: any) {
      console.error("Error archiving product:", error);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  // Méthode pour désarchiver un produit
  async unarchiveProduct(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;
    try {
      const product = await this.productUseCase.getProductById(productId);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      // Vous pouvez implémenter le désarchivage ici en modifiant la propriété 'status' ou 'archived' du produit
      // par exemple : product.status = 'active'; ou product.archived = false;
      await this.productUseCase.updateProduct(productId, product);

      res.status(200).json({ message: "Product unarchived successfully" });
    } catch (error: any) {
      console.error("Error unarchiving product:", error);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getProductsByCategory(req: Request, res: Response): Promise<void> {
    const categoryId = req.params.categoryId;
    const products = await this.productUseCase.getProductsByCategory(
      categoryId
    );
    res.json(products);
  }
}
