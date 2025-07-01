import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
    role: z.enum(['admin', 'user']),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
