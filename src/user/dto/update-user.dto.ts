import { z } from 'zod';

export const updateUserSchema = z.object({
    name: z.string().optional(),
    password: z.string().min(6).optional(),
    currentPassword: z.string().min(6).optional(),
}).refine(data => {
    if (data.password) return !!data.currentPassword;
    return true;
}, {
    message: "currentPassword é obrigatório quando password for fornecida",
    path: ["currentPassword"],
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
