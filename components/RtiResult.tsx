
import React from 'react';
import type { GeneratedRtiResult } from '../types.ts';
import { BuildingOfficeIcon } from './icons/BuildingOfficeIcon.tsx';
import { DocumentTextIcon } from './icons/DocumentTextIcon.tsx';
import { DownloadIcon } from './icons/DownloadIcon.tsx';
import { ArrowPathIcon } from './icons/ArrowPathIcon.tsx';
import { ClipboardIcon } from './icons/ClipboardIcon.tsx';
import { CheckIcon } from './icons/CheckIcon.tsx';

// This is a global declaration for jsPDF, as it's loaded from a CDN.
declare const jspdf: any;

const copyToClipboard = (text: string, setCopied: (isCopied: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
};

const InfoCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; }> = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
        <div className="flex items-center mb-4">
            {icon}
            <h3 className="text-xl font-bold text-slate-800 ml-3">{title}</h3>
        </div>
        {children}
    </div>
);

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
    const [copied, setCopied] = React.useState(false);
    return (
        <button
            onClick={() => copyToClipboard(text, setCopied)}
            className="absolute top-4 right-4 p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
            aria-label="Copy to clipboard"
        >
            {copied ? <CheckIcon className="h-5 w-5 text-green-600" /> : <ClipboardIcon className="h-5 w-5 text-slate-500" />}
        </button>
    );
};

const RtiResult: React.FC<{ result: GeneratedRtiResult; onStartOver: () => void; }> = ({ result, onStartOver }) => {

  const generatePdf = () => {
    const { jsPDF } = jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    let y = 0;

    // Use a standard font
    doc.setFont("helvetica", "normal");

    // Title
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("SAMPLE RTI APPLICATION FORM", pageWidth / 2, y += 50, { align: 'center' });
    
    y += 30;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // To Address
    doc.text("To,", margin, y);
    doc.text("The Public Information Officer", margin, y += 15);
    doc.setFont("helvetica", "bold");
    doc.text(result.department, margin, y += 15);
    doc.setFont("helvetica", "normal");
    doc.text("____________________________________________________", margin, y += 5); // Placeholder for full address
    doc.text("PIN: ________________________________________________", margin, y += 20);

    // Salutation
    y += 30;
    doc.text("Sir,", margin, y);

    // Subject
    y += 20;
    doc.setFont("helvetica", "bold");
    doc.text("Subject: Request for Information under Right to Information Act 2005.", margin, y);
    doc.setFont("helvetica", "normal");

    // Applicant Details
    y += 30;
    doc.text("I Sri / Smt /Ms. ____________________________________________________________________", margin, y);
    y += 20;
    doc.text("Son/Daughter/wife of Shri/Smt/Ms. __________________________________________________", margin, y);
    y += 20;
    doc.text("resident of ______________________________________________________________________", margin, y);
    y += 20;
    doc.text("_________________________________________________________________________________", margin, y);
    y += 20;
    doc.text("telephone number (with STD Code) _______________ and/or mobile number: _______________", margin, y);

    // Information Request
    y += 20;
    doc.text("wish to seek information as under:", margin, y);
    y += 15;
    
    // Insert the generated query
    const splitQuery = doc.splitTextToSize(result.formalQueryEnglish, pageWidth - margin * 2);
    doc.setFont("helvetica", "normal"); // Ensure query text is not bold
    doc.text(splitQuery, margin, y);
    y += splitQuery.length * 12 + 10; // Adjust y position based on query length

    // Dashed lines for extra space
    for (let i = 0; i < 3; i++) {
        doc.text("-----------------------------------------------------------------------------------------------------------------------------------", margin, y);
        y += 15;
    }

    // Declarations
    y += 10;
    doc.text("I hereby inform that following formalities have been completed by me:", margin, y);
    y += 15;
    
    const declarations = [
        "1. That I have deposited the requisite fee of Rs. _____/- by way of Cash / banker cheque / Draft / Postal Order/ others ____________ ) favoring ____________ dated ____________.",
        "2. I need the photocopy of the documents and I had deposited the cost of the photocopy of Rs. _____/- for _____ (Number of Pages)",
        "   or",
        "3. I had deposited sum of Rs. _____/- for the charges of CD. (strike out which ever is not applicable)",
        "4. That I belong to Category of below Poverty Line (BPL): Yes / No (Strike whichever is not applicable). If yes, I am attaching the valid photocopy of the certificate. Yes / No",
        "5. That I am 'Citizen' of India and I am asking the information as ‘Citizen’.",
        "6. I assure that I shall not allow/ cause to use/ pass/share/display/ or circulate the information received in any case and under any circumstances, with any person or in any manner which would be detrimental to the Unity and Sovereignty or against the Interest of India.",
    ];

    declarations.forEach(line => {
        const splitLine = doc.splitTextToSize(line, pageWidth - margin * 2);
        doc.text(splitLine, margin, y);
        y += splitLine.length * 12 + (line.startsWith("   or") ? 5 : 8); // Add spacing
    });


    // Signature
    y = doc.internal.pageSize.getHeight() - 70;
    doc.text("Signature of the Applicant", pageWidth - margin - 150, y);
    y += 20;
    doc.text("Dated: ______________", pageWidth - margin - 150, y);


    doc.save("RTI_Application_Formatted.pdf");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-800">Your RTI Draft is Ready!</h2>
        <p className="mt-2 text-slate-600">Review the details below and download your application.</p>
      </div>

      <InfoCard title="Suggested Department" icon={<BuildingOfficeIcon className="h-7 w-7 text-blue-700" />}>
        <p className="text-2xl font-semibold text-blue-800 bg-blue-50 p-4 rounded-lg">
          {result.department}
        </p>
         <p className="mt-3 text-sm text-slate-500">
            This is the suggested department. You will need to find the full address for the PIO (Public Information Officer) of this department to post the RTI.
        </p>
      </InfoCard>

      <InfoCard title="Formal RTI Query (Hindi)" icon={<DocumentTextIcon className="h-7 w-7 text-green-600" />}>
        <div className="relative bg-green-50 p-4 rounded-lg font-hindi text-lg text-slate-800 leading-relaxed whitespace-pre-wrap">
            <CopyButton text={result.formalQueryHindi} />
            {result.formalQueryHindi}
        </div>
         <p className="mt-3 text-sm text-slate-500">
            The official query is drafted in Hindi for clarity. You can copy this if needed. The downloadable PDF will contain the English version.
        </p>
      </InfoCard>
      
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-center">
        <p className="font-bold text-amber-800">Important Final Step</p>
        <p className="text-sm text-amber-700 mt-1">
          The downloaded PDF follows the standard RTI format. You must **print it, fill in your personal details (Name, Address etc.) by hand, and sign it.**
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={generatePdf}
          className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
        >
          <DownloadIcon className="h-5 w-5 mr-3" />
          Download Formatted PDF
        </button>
        <button
          onClick={onStartOver}
          className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-slate-600 text-white font-bold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-300"
        >
          <ArrowPathIcon className="h-5 w-5 mr-3" />
          Start Over
        </button>
      </div>
    </div>
  );
};

export default RtiResult;
