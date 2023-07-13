import { z } from 'zod';

const addOrderZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: 'Cow Referance id is required',
    }),
    buyer: z.string({
      required_error: 'Buyer Referance id is required',
    }),
  }),
});

export const OrderValidation = {
  addOrderZodSchema,
};
