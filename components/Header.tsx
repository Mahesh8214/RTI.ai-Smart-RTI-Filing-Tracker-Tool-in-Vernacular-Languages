
import React from 'react';
import { FileTextIcon } from './icons/FileTextIcon.tsx';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileTextIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            RTI<span className="text-blue-600">.ai</span>
          </h1>
        </div>
        <p className="hidden md:block text-slate-500">
          Your AI Assistant for the Right to Information Act
        </p>
      </div>
    </header>
  );
};