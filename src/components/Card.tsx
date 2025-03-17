import React from 'react';
import { FormData } from '../types';

interface Props {
  submission: FormData;
  latestSubmissionId: string | null;
}

export const Card: React.FC<Props> = ({ submission, latestSubmissionId }) => {
  return (
    <div
      key={submission.id}
      className={` rounded-lg shadow-md p-5 mb-5  ${
        submission.id === latestSubmissionId
          ? 'border-2 border-blue-500 animate-pulse'
          : ''
      } ${
        submission.formType === 'uncontrolled' ? 'bg-pink-200' : 'bg-purple-200'
      }`}
    >
      <h3 className="text-xl font-bold mb-2">
        {submission.formType === 'uncontrolled'
          ? 'Uncontrolled Form'
          : 'React Hook Form'}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(submission.timestamp).toLocaleString()}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="font-semibold">Name:</p>
          <p>{submission.name}</p>
        </div>
        <div>
          <p className="font-semibold">Age:</p>
          <p>{submission.age}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{submission.email}</p>
        </div>
        <div>
          <p className="font-semibold">Gender:</p>
          <p>{submission.gender}</p>
        </div>
        <div>
          <p className="font-semibold">Country:</p>
          <p>{submission.country}</p>
        </div>
        <div>
          <p className="font-semibold">Accepted:</p>
          <p>{submission.acceptTerms ? 'Yes' : 'No'}</p>
        </div>
      </div>
      {submission.image && (
        <div className="mt-4 w-full">
          <img
            src={submission.image}
            alt="Image"
            className="max-w-full h-auto max-h-40 rounded object-cover mx-auto"
          />
        </div>
      )}
    </div>
  );
};
