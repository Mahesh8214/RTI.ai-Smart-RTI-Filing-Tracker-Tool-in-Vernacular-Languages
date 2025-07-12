
import React from 'react';
import { LanguageIcon } from './icons/LanguageIcon.tsx';
import { PaperPlaneIcon } from './icons/PaperPlaneIcon.tsx';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon.tsx';

interface RtiFormProps {
  problemStatement: string;
  setProblemStatement: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

export const RtiForm: React.FC<RtiFormProps> = ({
  problemStatement,
  setProblemStatement,
  language,
  setLanguage,
  onSubmit,
  isLoading,
  error,
}) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Let's Draft Your RTI Application</h3>
      <p className="text-slate-600 mb-6">
        Describe your issue below. The AI will convert it into a formal application.
      </p>
      
      <div className="grid grid-cols-1 gap-6">
        <textarea
          className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-shadow duration-200 resize-none ${language === 'Hindi' ? 'font-hindi text-lg' : ''}`}
          rows={8}
          placeholder={language === 'Hindi' ? 'अपनी समस्या यहाँ लिखें...' : 'Write your problem here...'}
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          disabled={isLoading}
        />
        
        <div className="text-sm text-slate-500 p-3 bg-slate-100 rounded-md">
            <span className="font-bold font-hindi">उदाहरण:</span>
            <span className="font-hindi"> "बिजली नहीं आ रही", "स्कूल में टीचर नहीं हैं", "सड़क खराब है"</span>
        </div>

        <div className="relative">
          <LanguageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <select
            className="w-full pl-10 pr-4 py-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-600 appearance-none"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={isLoading}
            aria-label="Select input language"
          >
            <option value="Hindi">हिन्दी (Hindi)</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangleIcon className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={onSubmit}
          disabled={isLoading || !problemStatement.trim()}
          className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          <PaperPlaneIcon className="h-5 w-5 mr-3" />
          {isLoading ? 'Generating...' : 'Generate RTI Draft'}
        </button>
      </div>
    </div>
  );
};
