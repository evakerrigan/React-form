import * as yup from 'yup';

const PASSWORD_REGEX = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
};

const VALID_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const formSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-ZА-Я]/, 'Name must start with a capital letter'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .min(0, 'Age cannot be negative')
    .required('Age is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .matches(
      PASSWORD_REGEX.uppercase,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      PASSWORD_REGEX.lowercase,
      'Password must contain at least one lowercase letter'
    )
    .matches(PASSWORD_REGEX.number, 'Password must contain at least one number')
    .matches(
      PASSWORD_REGEX.special,
      'Password must contain at least one special character'
    ),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  gender: yup.string().required('Please select a gender'),
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms of use'),
  country: yup.string().required('Please select a country'),
  image: yup
    .mixed()
    .nullable()
    .test('fileSize', 'Image size must not exceed 5MB', function (value) {
      if (!value) return true;
      return (value as File).size <= MAX_IMAGE_SIZE;
    })
    .test(
      'fileType',
      'Only .jpg, .jpeg, .png files are supported',
      function (value) {
        if (!value) return true;
        return VALID_IMAGE_TYPES.includes((value as File).type);
      }
    )
    .optional(),
});

export type FormSchemaType = yup.InferType<typeof formSchema>;

export const checkPasswordStrength = (password: string): number => {
  let strength = 0;

  if (PASSWORD_REGEX.uppercase.test(password)) strength += 1;
  if (PASSWORD_REGEX.lowercase.test(password)) strength += 1;
  if (PASSWORD_REGEX.number.test(password)) strength += 1;
  if (PASSWORD_REGEX.special.test(password)) strength += 1;

  return strength;
};
