import { z } from 'zod';
import { CowBreed, CowCategory, CowLabel, CowLocation } from './cow.constants';

const addCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.number({
      required_error: 'Age is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    location: z.enum([...CowLocation] as [string, ...string[]], {
      required_error: 'Location is required',
    }),
    breed: z.enum([...CowBreed] as [string, ...string[]], {
      required_error: 'Breed is required',
    }),
    weight: z.number({
      required_error: 'Weight is required',
    }),
    label: z.enum([...CowLabel] as [string, ...string[]], {
      required_error: 'Label is required',
    }),
    category: z.enum([...CowCategory] as [string, ...string[]], {
      required_error: 'Category is required',
    }),
    seller: z.string({
      required_error: 'Seller Referance is required',
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }).optional(),
    age: z.number({
      required_error: 'Age is required',
    }).optional(),
    price: z.number({
      required_error: 'Price is required',
    }).optional(),
    location: z.enum([...CowLocation] as [string, ...string[]], {
      required_error: 'Location is required',
    }).optional(),
    breed: z.enum([...CowBreed] as [string, ...string[]], {
      required_error: 'Breed is required',
    }).optional(),
    weight: z.number({
      required_error: 'Weight is required',
    }).optional(),
    label: z.enum([...CowLabel] as [string, ...string[]], {
      required_error: 'Label is required',
    }).optional(),
    category: z.enum([...CowCategory] as [string, ...string[]], {
      required_error: 'Category is required',
    }).optional(),
    seller: z.string({
      required_error: 'Seller Referance is required',
    }).optional(),
  }),
});

export const CowValidation = {
  addCowZodSchema,
  updateCowZodSchema,
};
