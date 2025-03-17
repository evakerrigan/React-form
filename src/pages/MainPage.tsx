import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { clearLatestSubmission } from '../store/formSlice';
import { FormData } from '../types';
import { Card } from '../components/Card';

interface FormState {
  submissions: FormData[];
  latestSubmissionId: string | null;
}

export const MainPage: React.FC = () => {
  const { submissions, latestSubmissionId } = useAppSelector(
    (state) => state.form as FormState
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (latestSubmissionId) {
      const timer = setTimeout(() => {
        dispatch(clearLatestSubmission());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [latestSubmissionId, dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mt-20 mb-6 text-center">React Forms</h1>

      <div className="flex justify-center mb-8">
        <Link
          to="/uncontrolled-form"
          className="mx-3 py-2 px-4 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
        >
          Uncontrolled Form
        </Link>
        <Link
          to="/hook-form"
          className="mx-3 py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          React Hook Form
        </Link>
      </div>

      {submissions.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {submissions.map((submission: FormData) => (
              <Card
                key={submission.id}
                submission={submission}
                latestSubmissionId={latestSubmissionId}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl">Not forms.</p>
        </div>
      )}
    </div>
  );
};
