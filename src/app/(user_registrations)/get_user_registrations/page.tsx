'use client';
import React, { useState, useEffect } from 'react';

interface UserRegistration {
  payment_utr: string;
  tshirt_size: string;
  team_id: string;
  accomadation_necessary: boolean;
  agenda_domain: string[];
  uid: string;
  phone_number: string;
}

const UserRegistrationsList: React.FC = () => {
  const [userRegistrations, setUserRegistrations] = useState<
    UserRegistration[]
  >([]);

  useEffect(() => {
    const fetchUserRegistrations = async () => {
      try {
        const response = await fetch('/api/user_registration'); // Change the URL to match your API route
        if (!response.ok) {
          throw new Error('Failed to fetch user registrations');
        }
        const data = await response.json();
        setUserRegistrations(data);
      } catch (error) {
        console.error('Error fetching user registrations:', error);
      }
    };

    fetchUserRegistrations();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center bg-black h-screen'>
      <h1 className='font-bold'>User Registrations</h1>
      <ul>
        {userRegistrations.map((user, index) => (
          <li
            key={index}
            className='flex flex-col items-start justify-start p-8 bg-neutral-900 m-4 rounded-xl'
          >
            <strong>Payment UTR:</strong> {user?.payment_utr},
            <strong> T-shirt Size:</strong> {user.tshirt_size},
            <strong> Team ID:</strong> {user.team_id},
            <strong> Accommodation Necessary:</strong>{' '}
            {user.accomadation_necessary.toString()},
            <strong> Agenda Domain:</strong> {user.agenda_domain.join(', ')},
            <strong> UID:</strong> {user.uid},<strong> Phone Number:</strong>{' '}
            {user.phone_number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRegistrationsList;
