import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    role: z.enum(['seller', 'buyer'], {
      required_error: 'Role is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    budget: z.number({
      required_error: 'Budget is required',
    }),
    income: z.number().optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z
      .string({
        required_error: 'Phone number is required',
      })
      .optional(),
    role: z
      .enum(['seller', 'buyer'], {
        required_error: 'Role is required',
      })
      .optional(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .optional(),
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .optional(),
    budget: z
      .number({
        required_error: 'Budget is required',
      })
      .optional(),
    income: z.number().optional(),
  }),
});

const updateMyProfileZodSchema = z.object({
  body: z
    .object({
      phoneNumber: z
        .string({
          required_error: 'Phone number is required',
        })
        .optional(),
      password: z
        .string({
          required_error: 'Password is required',
        })
        .optional(),
      name: z
        .object({
          firstName: z
            .string({
              required_error: 'First name is required',
            })
            .optional(),
          lastName: z
            .string({
              required_error: 'Last name is required',
            })
            .optional(),
        })
        .optional(),
      address: z
        .string({
          required_error: 'Address is required',
        })
        .optional(),
    })
    .refine(data => {
      if (
        !data.name?.firstName &&
        !data.name?.lastName &&
        !data.phoneNumber &&
        !data.password &&
        !data.address
      ) {
        throw new Error('At least one field must be specified');
      }
      return true;
    }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
  updateMyProfileZodSchema,
};
