import { z } from 'zod';
import { AdminRole } from './admin.constants';

const addAdminZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum([...AdminRole] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AdminValidation = {
  addAdminZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
