import React from 'react';

interface PasswordStrengthProps {
  strength: number;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ strength }) => {
  const getColorClass = (strength: number): string => {
    switch (strength) {
      case 0:
        return 'text-gray-300';
      case 1:
        return 'text-red-500';
      case 2:
        return 'text-orange-500';
      case 3:
        return 'text-yellow-500';
      case 4:
        return 'text-green-500';
      default:
        return 'text-gray-300';
    }
  };

  const getMessage = (strength: number): string => {
    switch (strength) {
      case 0:
        return 'Enter password';
      case 1:
        return 'Very weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Medium';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  return (
    <div className="mt-1">
      <p className={`text-xs text-gray-600 ${getColorClass(strength)}`}>
        {getMessage(strength)}
      </p>
    </div>
  );
};

export default PasswordStrength;
