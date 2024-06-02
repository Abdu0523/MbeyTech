import express from 'express';
import { Request, Response } from 'express';

import multer from "multer";
import path from "path";
import { ChampRepository } from '../../../infrastructure/repositories/ChampRepository';
import { ChampUseCase } from '../../../infrastructure/use-cases/ChampUseCase';
import { ChampController } from '../controllers/ChampController';

export const champRoutes = express.Router();

const champRepository = new ChampRepository();
const champUseCase = new ChampUseCase(champRepository);
const champController = new ChampController(champUseCase);



champRoutes.post('/create', async (req : Request, res : Response) => champController.createChamp(req, res));
champRoutes.get('/getAll', async (req, res) => champController.getAllChamps(req, res));
champRoutes.get('/:id', async (req, res) => champController.getChampById(req, res));
champRoutes.put('/:id', async (req, res) => champController.updateChamp(req, res));
champRoutes.delete('/:id', async (req, res) => champController.deleteChamp(req, res));


export default champRoutes;
