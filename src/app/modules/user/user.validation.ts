import { z } from 'zod';

const userFullNameValidationSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
});

const userAddressValidationSchema = z.object({
  street: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
});

export const userOrderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const userOrdersValidationSchema = z.array(userOrderValidationSchema);

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().trim(),
  password: z.string().max(20, 'Password must not exceed 20 characters'),
  fullName: userFullNameValidationSchema,
  age: z.number(),
  email: z.string().trim().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddressValidationSchema,
  orders: userOrdersValidationSchema.optional(),
});
