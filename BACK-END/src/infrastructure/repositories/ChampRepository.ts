
import { IChamp } from '../../data/interfaces/IChamp';
import ChampModel from '../../data/models/Champ.entity';

export  class ChampRepository {
    async create(champ: IChamp): Promise<IChamp> {
        try {
            const createdchamp = await ChampModel.create(champ);
            return createdchamp.toJSON();
        } catch (error) {
            throw new Error(`Error while creating champ: ${error}`);
        }
    }

    async findAll(): Promise<IChamp[]> {
        try {
            const champs = await ChampModel.find();
            return champs.map(champ => champ.toJSON());
        } catch (error) {
            throw new Error(`Error while finding champs: ${error}`);
        }
    }

     async findById(id: string): Promise<IChamp | null> {
        try {
            const champ = await ChampModel.findById(id);
            return champ ? champ.toJSON() : null;
        } catch (error) {
            throw new Error(`Error while finding champ by id: ${error}`);
        }
    }

     async update(id: string, updatedchamp: IChamp): Promise<IChamp | null> {
        try {
            const champ = await ChampModel.findByIdAndUpdate(id, updatedchamp, { new: true });
            return champ ? champ.toJSON() : null;
        } catch (error) {
            throw new Error(`Error while updating champ: ${error}`);
        }
    }

     async delete(id: string): Promise<void> {
        try {
            await ChampModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error while deleting champ: ${error}`);
        }
    }

    async getByName(name : string): Promise<IChamp | null> {
        return await ChampModel.findOne({name});
    }
    async findByStatut(statut:string): Promise<IChamp[]> {
        try {
            const champs = await ChampModel.find({statut:statut});
            return champs.map(champ => champ.toJSON());
        } catch (error) {
            throw new Error(`Error while finding champs: ${error}`);
        }
    }
   
}



