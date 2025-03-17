export interface FormData {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  acceptTerms: boolean;
  image: string | null;
  country: string;
  formType: 'uncontrolled' | 'hookForm';
  timestamp: number;
}

export interface FormError {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  acceptTerms?: string;
  country?: string;
  image?: string;
}

export type GenderType = 'male' | 'female';
