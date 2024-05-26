import { Request, Response } from "express";
import { ChampactionUseCase } from "../../../infrastructure/use-cases/ChampactionUseCase";
import { IChampaction } from "../../../data/interfaces/IChampaction";

export class ChampactionController {
  private champactionUseCase: ChampactionUseCase;

  constructor(champactionUseCase: ChampactionUseCase) {
    this.champactionUseCase = champactionUseCase;
  }

  async createChampaction(req: Request, res: Response): Promise<void> {
    try {
      const newChampaction: IChampaction = req.body;
      const createdChampaction = await this.champactionUseCase.createChampaction(newChampaction);
      res.status(201).json(createdChampaction);
    } catch (error: any) {
      console.log("Error creating Champaction", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }
  

  async getAllChampactions(req: Request, res: Response): Promise<void> {
    try {
      const champactions = await this.champactionUseCase.getAllChampactions();
      res.status(200).json(champactions);
    } catch (error: any) {
      console.log("Error fetching Champaction", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getChampactionById(req: Request, res: Response): Promise<void> {
    const champactionId = req.params.id;
    try {
      const champaction = await this.champactionUseCase.getChampactionById(champactionId);
      if (!champaction) {
        res.status(404).json({ message: "Champaction not found" });
        return;
      }
      res.status(200).json(champaction);
    } catch (error: any) {
      console.log("Error fetching byId", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async updateChampaction(req: Request, res: Response): Promise<void> {
    const champactionId = req.params.id;
    try {
      const updatedChampaction: IChampaction = req.body;
      const champaction = await this.champactionUseCase.updateChampaction(
        champactionId,
        updatedChampaction
      );
      if (!champaction) {
        res.status(404).json({ message: "Champaction not found" });
        return;
      }
      res.status(200).json(champaction);
    } catch (error: any) {
      console.log("Error updating Champaction", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async deleteChampaction(req: Request, res: Response): Promise<void> {
    const champactionId = req.params.id;
    try {
      await this.champactionUseCase.deleteChampaction(champactionId);
      res.status(204).end();
    } catch (error: any) {
      console.log("Error deleting Champaction", error.stack);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }

  async getChampactionsByChamp(req: Request, res: Response): Promise<void> {
    const champId = req.params.champ;
    const champactions = await this.champactionUseCase.getChampactionsByChamp(
      champId
    );
    res.json(champactions);
  }
}
