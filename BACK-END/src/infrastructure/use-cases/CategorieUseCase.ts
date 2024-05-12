import { ICategorie } from "../../data/interfaces/ICategorie";
import { CategorieRepository } from "../repositories/CategorieRepository";

export class CategorieUseCase {
  constructor(private categorieRepository: CategorieRepository) {}

  async addCategorie(categorie: ICategorie): Promise<ICategorie> {
    try {
      const newCategorie = await this.categorieRepository.add(categorie);
      return newCategorie;
    } catch (error: any) {
      throw new Error("Error adding categorie: " + error.message);
    }
  }

  async getAllCategories(): Promise<ICategorie[]> {
    try {
      const categories = await this.categorieRepository.getAll();
      return categories;
    } catch (error: any) {
      throw new Error("Error getting all categories: " + error.message);
    }
  }

  async getCategorieById(id: string): Promise<ICategorie | null> {
    try {
      const categorie = await this.categorieRepository.getById(id);
      return categorie;
    } catch (error: any) {
      throw new Error("Error getting category by ID: " + error.message);
    }
  }

  async updateCategorie(id: string, categorie: Partial<ICategorie>): Promise<ICategorie | null> {
    try {
      const updatedCategorie = await this.categorieRepository.update(id, categorie);
      return updatedCategorie;
    } catch (error: any) {
      throw new Error("Error updating category: " + error.message);
    }
  }

  async deleteCategorie(id: string): Promise<boolean> {
    try {
      const deleted = await this.categorieRepository.delete(id);
      return deleted;
    } catch (error: any) {
      throw new Error("Error deleting category: " + error.message);
    }
  }

  async categoryExists(id: string): Promise<boolean> {
    const categorie = await this.categorieRepository.getById(id);
    return !!categorie;
  }

  async categoryNameExists(nom: string): Promise<boolean> {
    const categorie = await this.categorieRepository.getByNom(nom);
    return !!categorie;
  }

  async getCategorieByNom(nom: string): Promise<ICategorie | null> {
    try {
      const categorie = await this.categorieRepository.getByNom(nom);
      return categorie;
    } catch (error: any) {
      throw new Error("Error getting category by NOM: " + error.message);
    }
  }
  
}
