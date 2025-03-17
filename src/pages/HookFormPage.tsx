import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../hooks/reduxHooks';
import { addFormData } from '../store/formSlice';
import {
  formSchema,
  FormSchemaType,
  checkPasswordStrength,
} from '../validations/formSchema';
import { fileToBase64 } from '../utils/fileUtils';
import PasswordStrength from '../components/PasswordStrength';
import CountryAutocomplete from '../components/CountryAutocomplete';

const HookFormPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [country, setCountry] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const password = watch('password');
  React.useEffect(() => {
    if (password) {
      setPasswordStrength(checkPasswordStrength(password));
    } else {
      setPasswordStrength(0);
    }
  }, [password]);

  React.useEffect(() => {
    if (country) {
      setValue('country', country);
      trigger('country');
    }
  }, [country, setValue, trigger]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file as File, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: FormSchemaType) => {
    setIsSubmitting(true);

    try {
      let imageBase64 = null;
      if (data.image) {
        imageBase64 = await fileToBase64(data.image);
      }

      const submissionData = {
        id: uuidv4(),
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        gender: data.gender,
        acceptTerms: data.acceptTerms,
        country: data.country,
        image: imageBase64,
        formType: 'hookForm' as const,
        timestamp: Date.now(),
      };

      dispatch(addFormData(submissionData));
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mt-20 mb-6 text-center text-purple-500">
        React Hook Form
      </h1>

      <div className="max-w-xl mx-auto p-5 bg-purple-200 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="name" className="block font-medium mb-1">
              Name:
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-white-300'}`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="age" className="block font-medium mb-1">
              Age:
            </label>
            <input
              id="age"
              type="number"
              min="0"
              {...register('age', { valueAsNumber: true })}
              className={`w-full p-2 border rounded ${errors.age ? 'border-red-500' : 'border-white-300'}`}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-white-300'}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block font-medium mb-1">
              Password:
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-white-300'}`}
            />
            <PasswordStrength strength={passwordStrength} />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              Confirm password:
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : 'border-white-300'}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="gender" className="block font-medium mb-1">
              Gender:
            </label>
            <select
              id="gender"
              {...register('gender')}
              className={`w-full p-2 border rounded ${errors.gender ? 'border-red-500' : 'border-white-300'}`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="country" className="block font-medium mb-1">
              Country:
            </label>
            <CountryAutocomplete
              id="country"
              value={country}
              onChange={setCountry}
              error={errors.country?.message}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="image" className="block font-medium mb-1">
              Image:
            </label>
            <input
              id="image"
              type="file"
              accept=".jpg,.jpeg,.png"
              ref={(e) => {
                register('image').ref(e);
                fileInputRef.current = e;
              }}
              onChange={handleFileChange}
              className={`w-full p-2 border rounded ${errors.image ? 'border-red-500' : 'border-white-300'}`}
            />
            <p className="text-xs text-gray-500 mt-1">JPG. Max: 5MB</p>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="mb-5 flex items-center">
            <input
              id="acceptTerms"
              type="checkbox"
              {...register('acceptTerms')}
              className="w-4 h-4 mr-2"
            />
            <label htmlFor="acceptTerms" className="cursor-pointer">
              I agree to the terms of use
            </label>
            {errors.acceptTerms && (
              <p className="text-red-500 text-sm ml-2">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              className="w-full py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HookFormPage;
