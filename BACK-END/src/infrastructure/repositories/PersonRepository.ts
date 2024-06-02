import { Document } from 'mongoose';
import { SavePersonDTO } from '../../data/dtos/SavePersonDTO';
import { IPersonne } from "../../data/interfaces/IPersonne";
import PersonModel from '../../data/models/Personne.entity';
import IRepository from './IRepository';

interface IPersonDocument extends Document, IPersonne {}

// const PersonSchema = new Schema({
//   name: { type: String, required: true },
//   phone: { type: String, required: true }
// });

//const PersonModel = mongoose.model<IPersonDocument>('Person', PersonSchema);

export class PersonRepository implements IRepository<any> {
  getByName(name: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  // getById(id: string): Promise<any> {
  //   throw new Error('Method not implemented.');
  // }
  async update(id: string, entity: Partial<IPersonne>): Promise<IPersonne | null>{
    // throw new Error('Method not implemented.');
    try {
      const updatedUser = await PersonModel.findByIdAndUpdate(
        id,
        entity,
        { new: true }
      );
      return updatedUser;

    } catch (error: any) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async delete(id: string): Promise<boolean> {
      try {
        const result = await PersonModel.findByIdAndDelete(id);
        return result !== null;
      } catch (error: any) {
        throw new Error("Error deleting personne: " + error.message);
      }    
  }

  async add(person: SavePersonDTO): Promise<any> {
    const newPerson = new PersonModel(person);
    return await newPerson.save();
  }

  async getAll(): Promise<any[]> {
    const persons = await PersonModel.find();
    return persons;
  }
  async getOneByEmail(email: String): Promise<any> {
    const persons = await PersonModel.findOne({email}).select('+password');
    return persons;
  }

  async getById(id: string): Promise<IPersonne | null> {
    try {
      const user = await PersonModel.findById(id);
      return user;
    } catch (error: any) {
      throw new Error("Error getting user by ID: " + error.message);
    }
  }

}