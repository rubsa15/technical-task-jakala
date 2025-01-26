import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  full?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, full, ...props }) => {
  const fullWidth = full ? 'w-full' : '';

  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={props.id} className='text-[#2E344D]'>
          {label}
        </label>
      )}
      <div className={`relative ${fullWidth}`}>
        <input
          className={`border border-[#2E344D] rounded-[12px] py-1.5 px-4 ${fullWidth}`}
          {...props}
        />
      </div>
    </div>
  );
};
