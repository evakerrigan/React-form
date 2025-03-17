import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../hooks/reduxHooks';
import { addFormData } from '../store/formSlice';
import { formSchema } from '../validations/formSchema';
import { checkPasswordStrength } from '../validations/formSchema';
import { PasswordStrength } from '../components/PasswordStrength';
import { CountryAutocomplete } from '../components/CountryAutocomplete';
import { FormError } from '../types';
import * as yup from 'yup';
import { fileToBase64 } from '../utils';

export const UncontrolledFormPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<FormError>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [country, setCountry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = () => {
    if (passwordRef.current) {
      const password = passwordRef.current.value;
      setPasswordStrength(checkPasswordStrength(password));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = {
        name: nameRef.current?.value || '',
        age: Number(ageRef.current?.value || 0),
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
        confirmPassword: confirmPasswordRef.current?.value || '',
        gender: genderRef.current?.value || '',
        acceptTerms: acceptTermsRef.current?.checked || false,
        country,
        image: imageRef.current?.files?.[0] || null,
      };

      await formSchema.validate(formData, { abortEarly: false });

      let imageBase64 = null;
      if (imageRef.current?.files?.[0]) {
        imageBase64 = await fileToBase64(imageRef.current.files[0]);
      }

      const submissionData = {
        id: uuidv4(),
        name: formData.name,
        age: Number(formData.age),
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        acceptTerms: formData.acceptTerms,
        country: formData.country,
        image: imageBase64,
        formType: 'uncontrolled' as const,
      };

      dispatch(addFormData(submissionData));

      navigate('/');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const formattedErrors: FormError = {};
        error.inner.forEach((err) => {
          const path = err.path as string;
          formattedErrors[path as keyof FormError] = err.message;
        });
        setErrors(formattedErrors);
      } else {
        console.error('Error submitting form:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mt-20 mb-6 text-center text-pink-500">
        Uncontrolled Form
      </h1>

      <div className="max-w-xl mx-auto p-5 shadow-md bg-pink-200  rounded">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-white-300'}`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="age" className="block font-medium mb-1">
              Age:
            </label>
            <input
              type="number"
              id="age"
              ref={ageRef}
              min="0"
              className={`w-full p-2 border rounded ${errors.age ? 'border-red-500' : 'border-white-300'}`}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-white-300'}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block font-medium mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              onChange={handlePasswordChange}
              className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-white-300'}`}
            />
            <PasswordStrength strength={passwordStrength} />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              Confirm password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              ref={confirmPasswordRef}
              className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : 'border-white-300'}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="gender" className="block font-medium mb-1">
              Gender:
            </label>
            <select
              id="gender"
              ref={genderRef}
              className={`w-full p-2 border rounded ${errors.gender ? 'border-red-500' : 'border-white-300'}`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
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
              error={errors.country}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="image" className="block font-medium mb-1">
              Image:
            </label>
            <input
              type="file"
              id="image"
              ref={imageRef}
              accept=".jpg,.jpeg,.png"
              className={`w-full p-2 border rounded ${errors.image ? 'border-red-500' : 'border-white-300'}`}
            />
            <p className="text-xs text-gray-500 mt-1">JPG. Max size: 5MB</p>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          <div className="mb-5 flex items-center">
            <input
              type="checkbox"
              id="acceptTerms"
              ref={acceptTermsRef}
              className="w-4 h-4 mr-2"
            />
            <label htmlFor="acceptTerms" className="cursor-pointer">
              I agree to the terms of use
            </label>
            {errors.acceptTerms && (
              <p className="text-red-500 text-sm ml-2">{errors.acceptTerms}</p>
            )}
          </div>

          <div className="mb-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
