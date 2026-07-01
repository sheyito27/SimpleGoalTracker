import { Request, Response } from 'express';
import { taskRepository } from '../repositories/taskRepository.js';

// Obtener todas las tareas
export const getAllTasks = async (req: Request, res: Response) => {
    const tasks = await taskRepository.findAll();
    res.json(tasks);
};

// Obtener una tarea por ID
export const getTaskById = async (req: Request, res: Response) => {
    const task = await taskRepository.findOne(req.params.id);
    if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(task);
};

// Crear una nueva tarea
export const createTask = async (req: Request, res: Response) => {
    const { timeline, ...rest } = await req.body
    const newTask = {
            ...rest,
            isCompleted: false,
            startDate: new Date(), 
        };

    taskRepository.addOne(newTask)
    res.status(201).json(newTask);
};


// Modificar datos de una tarea
export const updateTask = async (req: Request, res: Response) => {
    const {...rest} = req.body
    const updatedTask = await taskRepository.updateOne(req.params.id, rest);
    if (!updatedTask) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(updatedTask);
};

// Borrar tarea
export const deleteTask = async (req: Request, res: Response) => {
    const deletedTask = await taskRepository.deleteOne(req.params.id);
    if (!deletedTask) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(deletedTask);
};