'use client';
import React, { useState, FormEvent } from 'react';

const ShortlistUserForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    try {
      const res = await fetch(`/api/shortlist_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log(result);
      setResponse(result);
    } catch (error: any) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='py-24 flex items-center justify-center'>
      <div className='bg-neutral-800 p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl mb-6 text-center'>Shortlist User</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block mb-2'>First Name:</label>
            <input
              title='first_name'
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className='w-full p-2 bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Last Name:</label>
            <input
              title='second_name'
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className='w-full p-2 bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Email:</label>
            <input
              title='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full p-2 bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <button
            type='submit'
            className='w-full p-2 bg-blue-600 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Shortlist User
          </button>
        </form>
        {response && (
          <div className='mt-6'>
            <h2 className='text-xl mb-2'>Response:</h2>
            <pre className='bg-neutral-700 p-4 rounded'>
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortlistUserForm;
