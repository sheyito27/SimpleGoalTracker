 import z from "zod";
 
 export const TaskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().max(500).optional(),
  linkedGoalId: z.string().uuid(),
});

export const UpdateTaskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").optional(),
  description: z.string().max(500).optional(),
  startDate: z.coerce.date().optional(),
  status: z.string().optional()
});

export const TaskParamsSchema = z.object({
  id: z.string().uuid(),
});
