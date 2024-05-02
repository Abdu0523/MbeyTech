import { ListPersonneDTO } from "../../data/dtos/ListPersonDTO";
import { LoginDTO } from "../../data/dtos/LoginDTO";
import { SavePersonDTO } from "../../data/dtos/SavePersonDTO";
import { PersonRepository } from "../repositories/PersonRepository";
import ErrorHandler from "../../utils/errorHandler";


export class PersonUseCase {

  constructor(private personRepository: PersonRepository) {}

  async createPerson(user : SavePersonDTO): Promise<any> {
    // const person  = new SavePersonDTO(user);
    return this.personRepository.add(user);
  }

  async getAllPersons(): Promise<ListPersonneDTO[]> {
    return this.personRepository.getAll();
  }
async login(login : LoginDTO): Promise<any>{
  if (!login) {
    return new ErrorHandler("Veuillez renseigner les champs", 401)
}
return await this.personRepository.getOneByEmail(login.email)

}

}
