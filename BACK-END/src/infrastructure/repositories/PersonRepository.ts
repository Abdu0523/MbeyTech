import mongoose, { Schema, Document } from 'mongoose';
import { IPersonne } from "../../data/interfaces/IPersonne";
import IRepository from './IRepository';
import PersonModel from '../../data/models/Personne.entity';
import { SavePersonDTO } from '../../data/dtos/SavePersonDTO';
import { ListPersonneDTO } from '../../data/dtos/ListPersonDTO';

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
  getById(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: Partial<any>): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
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

}