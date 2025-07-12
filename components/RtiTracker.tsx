
import React from 'react';
import type { TrackedRti } from '../types.ts';
import { ClockIcon } from './icons/ClockIcon.tsx';
import { BellIcon } from './icons/BellIcon.tsx';

const getDaysLeftMessage = (dateString: string): { text: string, colorClass: string } => {
    try {
        const parts = dateString.split('/');
        if (parts.length !== 3) return { text: "Invalid date", colorClass: 'text-gray-500' };

        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const year = parseInt(parts[2], 10);

        const rtiDate = new Date(year, month, day);
        const deadline = new Date(rtiDate);
        deadline.setDate(rtiDate.getDate() + 30);

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date

        const timeLeft = deadline.getTime() - today.getTime();
        const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
        
        if (daysLeft > 0) {
            return { text: `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`, colorClass: 'text-green-600' };
        } else if (daysLeft === 0) {
            return { text: 'Response due today', colorClass: 'text-amber-600 font-bold' };
        } else {
            return { text: `Overdue by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) > 1 ? 's' : ''}`, colorClass: 'text-red-600 font-bold' };
        }
    } catch (e) {
        return { text: "Calculating...", colorClass: 'text-gray-500' };
    }
};


export const RtiTracker: React.FC<{ trackedRtis: TrackedRti[] }> = ({ trackedRtis }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">My Recent RTI Drafts</h2>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 space-y-4">
        {trackedRtis.map(rti => {
            const countdown = getDaysLeftMessage(rti.date);
            return (
              <div key={rti.id} className="p-4 border border-slate-200 rounded-lg transition-colors hover:bg-slate-50">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="flex-grow">
                    <p className="font-bold text-blue-800">{rti.department}</p>
                    <p className="mt-1 text-sm text-slate-600 font-hindi truncate" title={rti.query}>
                      {rti.query.substring(0, 100)}...
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-slate-500 flex-shrink-0 ml-4 text-right">
                    <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1.5" />
                        <span>Filed: {rti.date}</span>
                    </div>
                    <div className={`ml-3 font-semibold ${countdown.colorClass}`}>
                        {countdown.text}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center p-2 bg-amber-50 text-amber-800 text-sm rounded-md">
                  <BellIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>RTI response is expected within 30 days. You can file a First Appeal after the deadline.</span>
                </div>
              </div>
            )
        })}
        {trackedRtis.length === 0 && (
            <p className="text-slate-500 text-center py-4">You have no saved RTI drafts yet. Generate one above to get started!</p>
        )}
      </div>
    </div>
  );
};
