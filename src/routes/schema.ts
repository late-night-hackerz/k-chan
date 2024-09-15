import { z } from 'zod';

export const accessFormSchema = z.object({
	email: z.string()
});

export type AccessFormSchemaType = typeof accessFormSchema;
