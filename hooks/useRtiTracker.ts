
import { useState, useEffect, useCallback } from 'react';
import type { TrackedRti } from '../types.ts';
import { RTI_TRACKER_STORAGE_KEY } from '../constants.ts';

export const useRtiTracker = () => {
  const [trackedRtis, setTrackedRtis] = useState<TrackedRti[]>([]);

  useEffect(() => {
    try {
      const storedRtis = localStorage.getItem(RTI_TRACKER_STORAGE_KEY);
      if (storedRtis) {
        setTrackedRtis(JSON.parse(storedRtis));
      }
    } catch (error) {
      console.error("Failed to load RTIs from local storage:", error);
      setTrackedRtis([]);
    }
  }, []);

  const addRti = useCallback((newRtiData: Omit<TrackedRti, 'id' | 'date'> & { id: string; date: string }) => {
    setTrackedRtis(prevRtis => {
      const newRti: TrackedRti = {
        id: newRtiData.id,
        date: newRtiData.date,
        department: newRtiData.department,
        query: newRtiData.query,
      };
      const updatedRtis = [newRti, ...prevRtis].slice(0, 10); // Keep max 10 recent RTIs
      try {
        localStorage.setItem(RTI_TRACKER_STORAGE_KEY, JSON.stringify(updatedRtis));
      } catch (error) {
        console.error("Failed to save RTI to local storage:", error);
      }
      return updatedRtis;
    });
  }, []);

  return { trackedRtis, addRti };
};