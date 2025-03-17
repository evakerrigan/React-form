import { z } from 'zod';

const PASSWORD_REGEX = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
};

const VALID_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine((value) => /^[A-ZА-Я]/.test(value), {
        message: 'Name must start with a capital letter',
      }),
    age: z
      .number({ invalid_type_error: 'Age must be a number' })
      .min(0, 'Age cannot be negative'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters')
      .refine((value) => PASSWORD_REGEX.uppercase.test(value), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((value) => PASSWORD_REGEX.lowercase.test(value), {
        message: 'Password must contain at least one lowercase letter',
      })
      .refine((value) => PASSWORD_REGEX.number.test(value), {
        message: 'Password must contain at least one number',
      })
      .refine((value) => PASSWORD_REGEX.special.test(value), {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    gender: z.string().min(1, 'Please select a gender'),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms of use',
    }),
    country: z.string().min(1, 'Please select a country'),
    image: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_IMAGE_SIZE, {
        message: `Image size must not exceed 5MB`,
      })
      .refine((file) => VALID_IMAGE_TYPES.includes(file.type), {
        message: 'Only .jpg, .jpeg, .png files are supported',
      })
      .nullable()
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormSchemaType = z.infer<typeof formSchema>;

export const checkPasswordStrength = (password: string): number => {
  let strength = 0;

  if (PASSWORD_REGEX.uppercase.test(password)) strength += 1;
  if (PASSWORD_REGEX.lowercase.test(password)) strength += 1;
  if (PASSWORD_REGEX.number.test(password)) strength += 1;
  if (PASSWORD_REGEX.special.test(password)) strength += 1;

  return strength;
};
