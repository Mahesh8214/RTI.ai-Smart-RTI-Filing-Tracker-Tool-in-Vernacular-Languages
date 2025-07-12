
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { RtiForm } from './components/RtiForm.tsx';
import RtiResult from './components/RtiResult.tsx';
import { RtiTracker } from './components/RtiTracker.tsx';
import { generateRtiDraft } from './services/geminiService.ts';
import { useRtiTracker } from './hooks/useRtiTracker.ts';
import type { GeneratedRtiResult, TrackedRti } from './types.ts';
import { LoadingSpinner } from './components/icons/LoadingSpinner.tsx';

const App: React.FC = () => {
  const [problemStatement, setProblemStatement] = useState<string>('');
  const [language, setLanguage] = useState<string>('Hindi');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedRti, setGeneratedRti] = useState<GeneratedRtiResult | null>(null);
  const { trackedRtis, addRti } = useRtiTracker();

  const handleGenerateRti = useCallback(async () => {
    if (!problemStatement.trim()) {
      setError('Please describe your problem in the text box.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedRti(null);

    try {
      const result = await generateRtiDraft(problemStatement, language);
      setGeneratedRti(result);
      addRti({
        id: new Date().toISOString(),
        date: new Date().toLocaleDateString('en-IN'),
        department: result.department,
        query: result.formalQueryHindi,
      });
    } catch (err) {
      console.error('Error generating RTI draft:', err);
      setError('Failed to generate the RTI draft. The AI model may be busy. Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  }, [problemStatement, language, addRti]);

  const handleStartOver = () => {
    setProblemStatement('');
    setGeneratedRti(null);
    setError(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {!generatedRti && !isLoading && (
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                    <span className="font-hindi">फाइल करें अपना RTI, अब आसान भाषा में</span>
                </h2>
                <p className="mt-2 text-lg text-slate-600">RTI.ai - Your AI Assistant for Right to Information</p>
            </div>
          )}

          {!generatedRti ? (
            <div className={isLoading ? 'hidden' : 'block'}>
                <RtiForm
                problemStatement={problemStatement}
                setProblemStatement={setProblemStatement}
                language={language}
                setLanguage={setLanguage}
                onSubmit={handleGenerateRti}
                isLoading={isLoading}
                error={error}
                />
            </div>
          ) : (
            <RtiResult
              result={generatedRti}
              onStartOver={handleStartOver}
            />
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center bg-white/80 p-10 rounded-xl shadow-md mt-8">
                <LoadingSpinner className="h-12 w-12 text-blue-700" />
                <p className="mt-4 text-lg font-semibold text-slate-700 font-hindi">आपका RTI ड्राफ्ट तैयार किया जा रहा है...</p>
                <p className="text-sm text-slate-500">Drafting your RTI...</p>
            </div>
          )}

          {trackedRtis.length > 0 && !generatedRti && (
            <RtiTracker trackedRtis={trackedRtis} />
          )}
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-slate-500">
        <p className="font-bold">Empowering Citizens. Simplifying Rights.</p>
        <p>&copy; {new Date().getFullYear()} RTI.ai - A Civic-Tech Initiative.</p>
      </footer>
    </div>
  );
};

export default App;
