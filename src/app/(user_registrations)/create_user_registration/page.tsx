'use client';
import React, { useState } from 'react';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    payment_utr: '',
    tshirt_size: '',
    team_id: '',
    accomadation_necessary: 'false',
    agenda_domain: [],
    uid: '',
    phone_number: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement; // Adjusting the type assertion

    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked; // Refining type assertion here
      const domain = value;
      if (isChecked) {
        setFormData((prevData: any) => ({
          ...prevData,
          agenda_domain: [...prevData.agenda_domain, domain],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          agenda_domain: prevData.agenda_domain.filter(
            (item) => item !== domain
          ),
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [response, setResponse] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user_registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center py-12 bg-black'>
      <form
        onSubmit={handleSubmit}
        className='p-8 rounded-lg shadow-md w-full max-w-md bg-neutral-900 py-24'
      >
        <h1 className='text-2xl mb-6 text-center'>User Registration</h1>
        {/* Payment UTR */}
        <div className='mb-4'>
          <label htmlFor='payment_utr' className='block mb-2'>
            Payment UTR:
          </label>
          <input
            type='text'
            id='payment_utr'
            name='payment_utr'
            value={formData.payment_utr}
            onChange={handleChange}
            required
            className='w-full p-2 border border-neutral-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        {/* T-shirt Size */}
        <div className='mb-4'>
          <label htmlFor='tshirt_size' className='block mb-2'>
            T-shirt Size:
          </label>
          <input
            type='text'
            id='tshirt_size'
            name='tshirt_size'
            value={formData.tshirt_size}
            onChange={handleChange}
            required
            className='w-full p-2 border border-neutral-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        {/* Team ID */}
        <div className='mb-4'>
          <label htmlFor='team_id' className='block mb-2'>
            Team ID:
          </label>
          <input
            type='text'
            id='team_id'
            name='team_id'
            value={formData.team_id}
            onChange={handleChange}
            required
            className='w-full p-2 border border-neutral-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        {/* Accommodation Necessary */}
        <div className='mb-4'>
          <label htmlFor='accomadation_necessary' className='block mb-2'>
            Accommodation Necessary:
          </label>
          <select
            id='accomadation_necessary'
            name='accomadation_necessary'
            value={formData.accomadation_necessary}
            onChange={handleChange}
            className='w-full p-2 border border-neutral-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>
        {/* Agenda Domain */}
        <div className='mb-4'>
          <label className='block mb-2'>Agenda Domain:</label>
          {['Android', 'Cloud', 'Flutter', 'Web'].map((domain, index) => (
            <div key={index} className='flex items-center'>
              <input
                type='checkbox'
                id={`agenda_domain_${index}`}
                name='agenda_domain' // Fixed name
                value={domain}
                checked={
                  formData.agenda_domain.filter((item: any) => item === domain)
                    .length > 0
                }
                onChange={handleChange}
                className='mr-2'
              />
              <label htmlFor={`agenda_domain_${index}`}>{domain}</label>
            </div>
          ))}
        </div>
        {/* UID */}
        <div className='mb-4'>
          <label htmlFor='uid' className='block mb-2'>
            UID:
          </label>
          <input
            type='text'
            id='uid'
            name='uid'
            value={formData.uid}
            onChange={handleChange}
            required
            className='w-full p-2 border border-neutral-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        {/* Phone Number */}
        <div className='mb-4'>
          <label htmlFor='phone_number' className='block mb-2'>
            Phone Number:
          </label>
          <input
            type='text'
            id='phone_number'
            name='phone_number'
            value={formData.phone_number}
            onChange={handleChange}
            required
            className='w-full p-2 border border-neutral-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        {/* Submit button */}
        <div className='mt-6'>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-black text-white rounded hover:bg-white hover:text-black transition duration-200'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
