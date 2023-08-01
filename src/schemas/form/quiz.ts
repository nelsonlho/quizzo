import { z } from 'zod';

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, { message: 'Topic needs to be at least 4 characters' })
    .max(50, { message: 'Topic cannot exceed 50 characters' }),
  type: z.enum(['mcq', 'open_ended']),
  amount: z
    .number()
    .min(1, { message: 'At least 1 question required' })
    .max(10, { message: 'Questions cannot be more than 10' }),
});
