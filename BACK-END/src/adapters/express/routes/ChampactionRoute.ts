import express from 'express';
import { ChampactionRepository } from '../../../infrastructure/repositories/ChampactionRepository';
import { ChampactionUseCase } from '../../../infrastructure/use-cases/ChampactionUseCase';
import { ChampactionController } from '../controllers/ChampactionController';


export const champactionRoutes = express.Router();

const champactionRepository = new ChampactionRepository();
const champactionUseCase = new ChampactionUseCase(champactionRepository);
const champactionController = new ChampactionController(champactionUseCase);


champactionRoutes.post('/create', async (req, res) => champactionController.createChampaction(req,res));
champactionRoutes.get('/getAll', async (req, res) => champactionController.getAllChampactions(req, res));
champactionRoutes.get('/:id', async (req, res) => champactionController.getChampactionById(req, res));
champactionRoutes.put('/:id', async (req, res) => champactionController.updateChampaction(req, res));
champactionRoutes.delete('/:id', async (req, res) => champactionController.deleteChampaction(req, res));
champactionRoutes.get('/champ/:id', async (req, res) => champactionController.getChampactionsByChamp(req, res));

export default champactionRoutes;
