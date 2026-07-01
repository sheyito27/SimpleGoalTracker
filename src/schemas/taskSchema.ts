 import z from "zod";
 
 export const TaskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().max(500).optional(),
  isCompleted: z.boolean(),
  linkedGoalId: z.string()
});

export const UpdateTaskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").optional(),
  description: z.string().max(500).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  isCompleted: z.boolean().optional(),
});


export const taskParamsSchema = z.object({
  id: z.string().uuid(),
});