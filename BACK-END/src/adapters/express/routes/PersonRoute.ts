import express from 'express';
import { PersonRepository } from '../../../infrastructure/repositories/PersonRepository';
import { PersonUseCase } from '../../../infrastructure/use-cases/PersonUseCase';
import { PersonController } from '../controllers/PersonController';

export const personRoutes = express.Router();

const personRepository = new PersonRepository();
const personUseCase = new PersonUseCase(personRepository);
const personController = new PersonController(personUseCase);

personRoutes.post('/create', async (req, res) => personController.createPerson(req, res));
personRoutes.get('/getAll', async (req, res) => personController.getAllPersons(req, res));
personRoutes.get("/:id", async (req, res) =>  personController.getUserById(req, res));
personRoutes.put('/:id', async (req, res) => personController.updateUser(req, res));
personRoutes.delete('/:id', async (req, res) => personController.delete(req, res));
personRoutes.put('/users/:id/activate', async (req, res) => personController.activer(req, res));
personRoutes.put('/users/:id/deactivate', async (req, res) => personController.desactiver(req, res));
personRoutes.post('/login', async (req, res) => personController.login(req, res));

