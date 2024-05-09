import IRepository from "./IRepository";
import { SavePersonDTO } from "../../data/dtos/SavePersonDTO";
import { ICategorie } from "../../data/interfaces/ICategorie";
import CategorieModel from "../../data/models/Categories.entity";

export class CategorieRepository implements IRepository<any> {

  async add(entity: ICategorie): Promise<ICategorie> {
    try {
      const newCategorie = await CategorieModel.create(entity);
      return newCategorie;
    } catch (error: any) {
      throw new Error("Error adding categorie: " + error.message);
    }
  }

  async getAll(): Promise<ICategorie[]> {
    try {
      const categories = await CategorieModel.find();
      return categories;
    } catch (error: any) {
      throw new Error("Error getting all categories: " + error.message);
    }
  }

  async getById(id: string): Promise<ICategorie | null> {
    try {
      const categorie = await CategorieModel.findById(id);
      return categorie;
    } catch (error: any) {
      throw new Error("Error getting category by ID: " + error.message);
    }
  }

  async getByNom(nom: string): Promise<ICategorie | null> {
    return await CategorieModel.findOne({ nom });
  }

  async update(
    id: string,
    entity: Partial<ICategorie>
  ): Promise<ICategorie | null> {
    try {
      const updatedCategorie = await CategorieModel.findByIdAndUpdate(
        id,
        entity,
        { new: true }
      );
      return updatedCategorie;
    } catch (error: any) {
      throw new Error("Error updating category: " + error.message);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await CategorieModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error: any) {
      throw new Error("Error deleting category: " + error.message);
    }
  }
}
