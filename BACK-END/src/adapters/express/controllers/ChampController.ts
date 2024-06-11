import { Request, Response } from "express";
import { ChampUseCase } from "../../../infrastructure/use-cases/ChampUseCase";
import { IChamp } from "../../../data/interfaces/IChamp";
import { stat } from "fs";

export class ChampController {
  private champUseCase: ChampUseCase;

  constructor(champUseCase: ChampUseCase) {
    this.champUseCase = champUseCase;
  }

  async createChamp(req: Request, res: Response): Promise<void> {
    try {
      const newchamp: IChamp = req.body;
      // Ajoutez une vérification pour vérifier si une image a été téléchargée
      const createdchamp = await this.champUseCase.createChamp(newchamp);
      res.status(201).json(createdchamp);
    } catch (error: any) {
      console.log("Error creating champ", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }
  

  async getAllChamps(req: Request, res: Response): Promise<void> {
    try {
      const champs = await this.champUseCase.getAllChamps();
      res.status(200).json(champs);
    } catch (error: any) {
      console.log("Error fetching champ", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getChampById(req: Request, res: Response): Promise<void> {
    const champId = req.params.id;
    try {
      const champ = await this.champUseCase.getChampById(champId);
      if (!champ) {
        res.status(404).json({ message: "champ not found" });
        return;
      }
      res.status(200).json(champ);
    } catch (error: any) {
      console.log("Error fetching byId", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async updateChamp(req: Request, res: Response): Promise<void> {
    const champId = req.params.id;
    try {
      const updatedchamp: IChamp = req.body;
      const champ = await this.champUseCase.updateChamp(
        champId,
        updatedchamp
      );
      if (!champ) {
        res.status(404).json({ message: "champ not found" });
        return;
      }
      res.status(200).json(champ);
    } catch (error: any) {
      console.log("Error updating champ", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async deleteChamp(req: Request, res: Response): Promise<void> {
    const champId = req.params.id;
    try {
      await this.champUseCase.deletechamp(champId);
      res.status(204).end();
    } catch (error: any) {
      console.log("Error deleting champ", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getChampbystatut(req: Request, res: Response): Promise<void> {
    const  statut  = req.params.id;
    try {
      const champs = await this.champUseCase.getChampsbystatut(statut);
      res.status(200).json(champs);
    } catch (error: any) {
      console.log("Error fetching champ", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  
}
