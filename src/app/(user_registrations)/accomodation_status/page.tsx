'use client';
import React, { useState, useEffect } from 'react';

const UserAccommodationCount: React.FC = () => {
  const [accommodationCount, setAccommodationCount] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccommodationCount = async () => {
      try {
        const response = await fetch('/api/accomodation_status'); // Change the URL to match your API route
        if (!response.ok) {
          throw new Error('Failed to fetch accommodation count');
        }
        const data = await response.json();
        setAccommodationCount(data.accommodationCount);
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching accommodation count:', error);
      }
    };

    fetchAccommodationCount();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center py-24 bg-neutral-950 text-4xl h-screen'>
      <h1>Accommodation Count</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : accommodationCount !== null ? (
        <p>{accommodationCount}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserAccommodationCount;
