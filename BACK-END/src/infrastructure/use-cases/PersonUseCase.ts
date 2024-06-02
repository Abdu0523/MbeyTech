import { ListPersonneDTO } from "../../data/dtos/ListPersonDTO";
import { LoginDTO } from "../../data/dtos/LoginDTO";
import { SavePersonDTO } from "../../data/dtos/SavePersonDTO";
import { IPersonne } from "../../data/interfaces/IPersonne";
import ErrorHandler from "../../utils/errorHandler";
import { PersonRepository } from "../repositories/PersonRepository";

export class PersonUseCase {

  constructor(private personRepository: PersonRepository) {}

  async createPerson(user : SavePersonDTO): Promise<any> {
    // const person  = new SavePersonDTO(user);
    return this.personRepository.add(user);
  }

  async getAllPersons(): Promise<ListPersonneDTO[]> {
    return this.personRepository.getAll();
  }

  async getUserById(id: string): Promise<IPersonne | null> {
    try {
      const user = await this.personRepository.getById(id);
      return user;
    } catch (error: any) {
      throw new Error("Error getting user by ID: " + error.message);
    }
    }

    async updateUser(id: string, user: Partial<IPersonne>): Promise<IPersonne | null> {
      try {
        const updatedUser = await this.personRepository.update(id, user);
        return updatedUser;
      } catch (error: any) {
        throw new Error("Error updating user: " + error.message);
      }
    }
    async deleteUser(id: string): Promise<boolean> {
      try {
        const deleted = await this.personRepository.delete(id);
        return deleted;
      } catch (error: any) {
        throw new Error("Error deleting user: " + error.message);
      }
    }

  async login(login : LoginDTO): Promise<any>{
    if (!login) {
      return new ErrorHandler("Veuillez renseigner les champs", 401)
    }
    return await this.personRepository.getOneByEmail(login.email)
  }


}
