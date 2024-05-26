import { ChampactionRepository } from '../repositories/ChampactionRepository';
import { IChampaction } from '../../data/interfaces/IChampaction';

export  class ChampactionUseCase {
    private champactionRepository: ChampactionRepository;

    constructor(champactionRepository: ChampactionRepository) {
        this.champactionRepository =  champactionRepository;
    }

    async createChampaction(champaction: IChampaction): Promise<IChampaction> {
        try {
            const createdChampaction = await this.champactionRepository.create(champaction);
            return createdChampaction;
        } catch (error) {
            throw new Error(`Error while creating Champaction: ${error}`);
        }
    }

    async getAllChampactions(): Promise<IChampaction[]> {
        try {
            const champactions = await this.champactionRepository.findAll();
            return champactions;
        } catch (error) {
            throw new Error(`Error while getting Champactions: ${error}`);
        }
    }

     async getChampactionById(id: string): Promise<IChampaction | null> {
        try {
            const champaction = await this.champactionRepository.findById(id);
            return champaction;
        } catch (error) {
            throw new Error(`Error while getting Champaction by id: ${error}`);
        }
    }

     async updateChampaction(id: string, updatedchampaction: IChampaction): Promise<IChampaction | null> {
        try {
            const champaction = await this.champactionRepository.update(id, updatedchampaction);
            return champaction;
        } catch (error) {
            throw new Error(`Error while updating Champaction: ${error}`);
        }
    }

    async deleteChampaction(id: string): Promise<void> {
        try {
            await this.champactionRepository.delete(id);
        } catch (error) {
            throw new Error(`Error while deleting Champaction: ${error}`);
        }
    }

    async getChampactionsByChamp(champid: string): Promise<IChampaction[]> {
        return this.champactionRepository.getChampactionsBychamp(champid);
    }

    async champactionNameExists(name : string) : Promise<boolean> {
        const champaction = await this.champactionRepository.getByName(name)
        return !!champaction
    }
}
