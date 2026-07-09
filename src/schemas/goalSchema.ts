import z from "zod";

export const GoalSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().max(500),
  timeline: z.object ({
    endDate: z.coerce.date(), 
  }),
});

export const UpdateGoalSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").optional(),
  description: z.string().max(500).optional(),
  timeline: z.object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  }).optional(),
  status: z.string().optional(),

});

export const GoalParamsSchema = z.object({
  id: z.string().uuid(),
});
