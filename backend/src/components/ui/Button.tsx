import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
