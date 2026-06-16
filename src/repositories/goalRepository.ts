import { mockData } from '../data/mockData.js';
import { Goal } from '../models/goalModel.js';
export const goalRepository = {

    // Acceder a la lista de metas
    findAll: () => {
        return mockData["goals"]
    },
    
    // Acceder a la lista 
    findOne: (id: string): Goal | undefined => {
        return mockData["goals"].find(goal => goal.id === id)
    }
}
