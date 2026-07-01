import z from "zod";

// Esquema de zod
export const GoalSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().max(500),
  timeline: z.object({
    endDate: z.coerce.date(), 
  }),
  isCompleted: z.boolean().default(false),
});

// Esquema de zod
export const UpdateGoalSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().max(500),
  timeline: z.object({
    startDate: z.coerce.date(), 
  }),
  isCompleted: z.boolean().default(false),
});


export const GoalParamsSchema = z.object({
  id: z.string(),
});