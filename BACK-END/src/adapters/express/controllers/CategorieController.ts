import { Request, Response } from "express";
import { CategorieUseCase } from "../../../infrastructure/use-cases/CategorieUseCase";
import { ICategorie } from "../../../data/interfaces/ICategorie";

export class CategorieController {
  constructor(private categorieUseCase: CategorieUseCase) {}

 
  async addCategorie(req: Request, res: Response): Promise<void> {
    try {
      const { nom } = req.body;
      if (!nom || !req.file || !req.file?.filename) {
        res.status(400).json({ error: "Nom and image are required" });
        return;
      } else {
        try {
          const categoryExists = await this.categorieUseCase.categoryNameExists(
            nom
          );
          if (!categoryExists) {
            const image = req.file.filename;
            const newCategorie: ICategorie = { nom, image };
            const addedCategorie = await this.categorieUseCase.addCategorie(
              newCategorie
            );
            res.status(201).json(addedCategorie);
          } else {
            res.status(400).json({ message: "category already exist" });
          }
        } catch (error: any) {
          res.status(400).json({ error: error.message });
        }
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categorieUseCase.getAllCategories();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCategorieById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const categorie = await this.categorieUseCase.getCategorieById(id);
      if (categorie) {
        res.json(categorie);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCategorie(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nom } = req.body;
      const image = req.file?.filename
      const updatedCategorie = await this.categorieUseCase.updateCategorie(id, {
        nom,
        image,
      });
      if (updatedCategorie) {
        res.json(updatedCategorie);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCategorie(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.categorieUseCase.deleteCategorie(id);
      if (deleted) {
        res.json({ message: "Category deleted successfully" });
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCategorieByNom(req: Request, res: Response): Promise<void> {
    try {
      const { nom } = req.params;
      const categorie = await this.categorieUseCase.getCategorieByNom(nom);
      if (categorie) {
        res.json(categorie);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
