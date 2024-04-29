import { Request, Response } from 'express';
import { PersonUseCase } from '../../../infrastructure/use-cases/PersonUseCase';
import { SavePersonDTO } from '../../../data/dtos/SavePersonDTO';
import sendToken from '../../../utils/jwtToken';
import { LoginDTO } from '../../../data/dtos/loginDTO';
import PersonModel from '../../../data/models/Personne.entity';
import comparePassword from '../../../utils/comparePassword';

export class PersonController {
  private personUseCase: PersonUseCase;

  constructor(personUseCase: PersonUseCase) {
    this.personUseCase = personUseCase;
  }

  async createPerson(req: Request, res: Response): Promise<void> {
    try {
      const person: SavePersonDTO = req.body;

      const newData = await this.personUseCase.createPerson(person);
      sendToken(newData,200,res)
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
  }

  async login(req: Request, res: Response): Promise<any>{
    try {
      const login: LoginDTO = req.body;
      const person = await this.personUseCase.login(login);
      if (!person) {
          return res.status(400).json({
              success : false,
              message : "User not found"
          })
      }

      // const isPasswordMatched = await comparePassword(login.password);

      // if (!isPasswordMatched) {
      //     return new ErrorHandler("Invalid password", 401)
      // }
      sendToken(person, 200, res)

    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
  }

  async getAllPersons(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.personUseCase.getAllPersons();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
  }
}
