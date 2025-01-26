import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={props.id} className='text-[#2E344D]'>
          {label}
        </label>
      )}
      <div className={`relative`}>
        <input
          className={`border border-[#2E344D] rounded-[12px] py-1.5 px-4`}
          {...props}
        />
      </div>
    </div>
  );
};
