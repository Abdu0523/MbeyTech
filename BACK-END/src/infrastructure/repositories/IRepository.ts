import { Document } from 'mongoose';

interface IRepository<T extends Document> {
  add(entity: T): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  update(id: string, entity: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  getByNom(nom: string): Promise<T | null>;
}

export default IRepository;
