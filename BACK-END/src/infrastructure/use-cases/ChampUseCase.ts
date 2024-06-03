import { IChamp } from "../../data/interfaces/IChamp";
import { ChampRepository } from "../repositories/ChampRepository";


export  class ChampUseCase {
    private champRepository: ChampRepository;

    constructor(champRepository: ChampRepository) {
        this.champRepository = champRepository;
    }

    async createChamp(champ: IChamp): Promise<IChamp> {
        try {
            const createdchamp = await this.champRepository.create(champ);
            return createdchamp;
        } catch (error) {
            throw new Error(`Error while creating champ: ${error}`);
        }
    }

    async getAllChamps(): Promise<IChamp[]> {
        try {
            const champs = await this.champRepository.findAll();
            return champs;
        } catch (error) {
            throw new Error(`Error while getting champs: ${error}`);
        }
    }

     async getChampById(id: string): Promise<IChamp | null> {
        try {
            const champ = await this.champRepository.findById(id);
            return champ;
        } catch (error) {
            throw new Error(`Error while getting champ by id: ${error}`);
        }
    }

     async updateChamp(id: string, updatedchamp: IChamp): Promise<IChamp | null> {
        try {
            const champ = await this.champRepository.update(id, updatedchamp);
            return champ;
        } catch (error) {
            throw new Error(`Error while updating champ: ${error}`);
        }
    }

    async deletechamp(id: string): Promise<void> {
        try {
            await this.champRepository.delete(id);
        } catch (error) {
            throw new Error(`Error while deleting champ: ${error}`);
        }
    }

    async champNameExists(name : string) : Promise<boolean> {
        const champ = await this.champRepository.getByName(name)
        return !!champ
    }
}
