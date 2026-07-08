 import z from "zod";
 export const UserSchema = z.object({
    username: z.string().min(1).max(20),
    passwordHash: z.string().min(1).max(20),
    email: z.string().min(1).max(20),
    birthDate: z.coerce.date().optional()
 })

 export const UpdateUser = z.object({
    username: z.string().min(1).max(20).optional(),
    passwordHash: z.string().min(1).max(20).optional(),
    email: z.string().min(1).max(20).optional(),
    birthDate: z.coerce.date().optional()
 })

 export const UserParamsSchema = z.object({
   id: z.string().uuid(),
 });
 