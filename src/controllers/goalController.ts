import { Request, Response } from 'express';
import { goalRepository } from '../repositories/goalRepository.js';

// Obtener todas las metas
export const getAllGoals = async (req: Request, res: Response) => {
    const goals = await goalRepository.findAll();
    res.json(goals);
};

// Obtener una meta
export const getGoalById = async (req: Request, res: Response) => {
    const goal = await goalRepository.findOne(req.params.id);
    if (!goal) {
        return res.status(404).json({ message: "Meta no encontrada" });
    }
    res.json(goal);
};

// Crear una nueva meta
export const createGoal = async (req: Request, res: Response) => {
    const { timeline, ...rest } = await req.body
    const newGoal = {
            ...rest,
            id: crypto.randomUUID(), 
            isCompleted: false,
            
            timeline: {
                startDate: new Date(), 
                endDate: new Date(timeline.endDate) 
            }
        };

    goalRepository.addOne(newGoal)
    res.status(201).json(newGoal);
};

// Modificar datos
export const updateGoal = async (req: Request, res: Response) => {
    const goalToUpdate = await goalRepository.findOne(req.params.id)
    if (!goalToUpdate) {
        return res.status(404).json({ message: "Meta no encontrada" });
    }
    const updatedGoal = await {...goalToUpdate,
        
    }
    res.json(updatedGoal);
};

// Borrar meta
export const deleteGoal = async (req: Request, res: Response) => {
    const deletedGoal = await goalRepository.deleteOne(req.params.id);
    if (!deletedGoal) {
        return res.status(404).json({ message: 'Meta no encontrada' });
    }
    res.json(deletedGoal);
};