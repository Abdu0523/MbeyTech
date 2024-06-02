import ChampactionModel from '../../data/models/Champaction.entity';
import { IChampaction } from '../../data/interfaces/IChampaction';

export class ChampactionRepository {
    async create(champaction: IChampaction): Promise<IChampaction> {
        try {
            const createdChampaction = await ChampactionModel.create(champaction);
            return createdChampaction.toJSON();
        } catch (error) {
            throw new Error(`Error while creating Champaction: ${error}`);
        }
    }

    async findAll(): Promise<IChampaction[]> {
        try {
            const champactions = await ChampactionModel.find()
                .populate('champ');
            return champactions.map(champaction => champaction.toJSON());
        } catch (error) {
            throw new Error(`Error while finding Champactions: ${error}`);
        }
    }

    async findById(id: string): Promise<IChampaction | null> {
        try {
            const champaction = await ChampactionModel.findById(id)
                .populate('champ');
            return champaction ? champaction.toJSON() : null;
        } catch (error) {
            throw new Error(`Error while finding Champaction by id: ${error}`);
        }
    }

    async update(id: string, updatedchampaction: IChampaction): Promise<IChampaction | null> {
        try {
            const champaction = await ChampactionModel.findByIdAndUpdate(id, updatedchampaction, { new: true })
                .populate('champ');
            return champaction ? champaction.toJSON() : null;
        } catch (error) {
            throw new Error(`Error while updating Champaction: ${error}`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await ChampactionModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error while deleting Champaction: ${error}`);
        }
    }

    async getChampactionsBychamp(champId: string): Promise<IChampaction[]> {
        try {
            const champactions = await ChampactionModel.find({ champ: champId })
                .populate('champ');
            return champactions.map(champaction => champaction.toJSON());
        } catch (error) {
            throw new Error(`Error while finding Champactions by champ: ${error}`);
        }
    }

    async getByName(name: string): Promise<IChampaction | null> {
        return await ChampactionModel.findOne({ name })
    }
 

}



