import express, { Router, Request, Response } from "express";
import { CategorieController } from "../controllers/CategorieController";
import { CategorieRepository } from "../../../infrastructure/repositories/CategorieRepository";
import { CategorieUseCase } from "../../../infrastructure/use-cases/CategorieUseCase";

const categorieRouter: Router = express.Router();
const categorieRepository = new CategorieRepository();
const categorieUseCase = new CategorieUseCase(categorieRepository);
const categorieController = new CategorieController(categorieUseCase);

// Route pour ajouter une catégorie
categorieRouter.post("/", async (req: Request, res: Response) => {
  await categorieController.addCategorie(req, res);
});

// Route pour récupérer toutes les catégories
categorieRouter.get("/", async (req: Request, res: Response) => {
  await categorieController.getAllCategories(req, res);
});

// Route pour récupérer une catégorie par ID
categorieRouter.get("/:id", async (req: Request, res: Response) => {
  await categorieController.getCategorieById(req, res);
});

// Route pour mettre à jour une catégorie
categorieRouter.put("/:id", async (req: Request, res: Response) => {
  await categorieController.updateCategorie(req, res);
});

// Route pour supprimer une catégorie
categorieRouter.delete("/:id", async (req: Request, res: Response) => {
  await categorieController.deleteCategorie(req, res);
});

export default categorieRouter;
