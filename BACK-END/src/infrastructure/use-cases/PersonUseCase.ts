import { IPersonne } from "../../data/interfaces/IPersonne";
import { PersonRepository } from "../repositories/PersonRepository";
import { ListPersonneDTO } from "../../data/dtos/ListPersonDTO";
import { SavePersonDTO } from "../../data/dtos/SavePersonDTO";
import { LoginDTO } from "../../data/dtos/loginDTO";
import PersonModel from "../../data/models/Personne.entity";
import sendToken from "../../utils/jwtToken";

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
