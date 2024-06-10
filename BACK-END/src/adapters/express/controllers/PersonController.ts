import { Request, Response } from 'express';
import { LoginDTO } from '../../../data/dtos/LoginDTO';
import { SavePersonDTO } from '../../../data/dtos/SavePersonDTO';
import { IPersonne } from '../../../data/interfaces/IPersonne';
import { PersonUseCase } from '../../../infrastructure/use-cases/PersonUseCase';
import sendToken from '../../../utils/jwtToken';
// import PersonModel from '../../../data/models/Personne.entity';
// import comparePassword from '../../../utils/comparePassword';

export class PersonController {
  private personUseCase: PersonUseCase;

  constructor(personUseCase: PersonUseCase) {
    this.personUseCase = personUseCase;
  }

  async createPerson(req: Request, res: Response): Promise<void> {
    try {
      const person: SavePersonDTO = req.body;
      // console.log('person', person)

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

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.personUseCase.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "utilisateur not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    try {
      // const { id } = req.params;
      const updatedUser: IPersonne = req.body;
      const user = await this.personUseCase.updateUser(userId, updatedUser);
     
      if (!user) {
        res.status(404).json({message: 'user n\'existe pas'});
        // console.log('user')
        return;
      } else {
        res.status(200).json(user);
      }
    } catch (error: any) {
      console.log("Error updating user", error.stack);
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.personUseCase.deleteUser(id);
      if (deleted) {
        res.json({ message: "user deleted successfully" });
      } else {
        res.status(404).json({ error: "user not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  async activer(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    try {
      // const { id } = req.params;
       const activateUser: IPersonne = req.body._id;
      const user = await this.personUseCase.activateUser(userId);
     
      if (!user) {
        //res.status(404).json(userId);
        res.status(404).json({message: 'user n\'existe pas '});
        return;
      } else {
        res.status(200).json(user);
      }
    } catch (error: any) {
      console.log("Error active user", error.stack);
      res.status(500).json({ error: error.message });
    }
  }

  async desactiver(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    try {
      // const { id } = req.params;
      // const activateUser: IPersonne = req.params._id;
      const user = await this.personUseCase.deactivateUser(userId);
     
      if (!user) {
        res.status(404).json({message: 'user n\'existe pas'});
        return;
      } else {
        res.status(200).json(user);
      }
    } catch (error: any) {
      console.log("Error desactive user", error.stack);
      res.status(500).json({ error: error.message });
    }
  }
}
