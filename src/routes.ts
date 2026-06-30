import * as goalController from './controllers/goalController.js'
import * as taskController from './controllers/taskController.js'
import { Router } from 'express';
// Importa tus esquemas (ejemplos)
import { GoalSchema, UpdateGoalSchema } from './schemas/goalSchema.js';
import { TaskSchema, UpdateTaskSchema } from './schemas/taskSchema.js';
import { GoalParamsSchema } from './schemas/goalSchema.js';

// Importa tus middlewares
import { validate } from './middlewares/validate.js';
import { asyncHandler } from './middlewares/catchAsync.js';

// --- Rutas Goals ---
export const goalRouter = Router();

goalRouter.get("/", asyncHandler(goalController.getAllGoals));
goalRouter.get("/:id", validate({ params: GoalParamsSchema }), asyncHandler(goalController.getGoalById));
goalRouter.post("/", validate({ body: GoalSchema }), asyncHandler(goalController.createGoal));
goalRouter.patch("/:id", validate({ params: GoalParamsSchema, body: UpdateGoalSchema }), asyncHandler(goalController.updateGoal));
goalRouter.delete("/:id", validate({ params: GoalParamsSchema }), asyncHandler(goalController.deleteGoal));

// --- Rutas Tasks ---
export const taskRouter = Router();

taskRouter.get("/", asyncHandler(taskController.getAllTasks));
taskRouter.get("/:id", validate({ params: IdParamSchema }), asyncHandler(taskController.getTaskById));
taskRouter.post("/", validate({ body: CreateTaskSchema }), asyncHandler(taskController.createTask));
taskRouter.patch("/:id", validate({ params: IdParamSchema, body: UpdateTaskSchema }), asyncHandler(taskController.updateTask));
taskRouter.delete("/:id", validate({ params: IdParamSchema }), asyncHandler(taskController.deleteTask));