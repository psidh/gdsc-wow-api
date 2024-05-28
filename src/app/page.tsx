import React from 'react';

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <a href='/teams/create' className='link'>Create Team</a>
      <a href='/create_shortlisted_user' className='link'>Create ShortList User</a>
      <a href='/get_shortlisted_users' className='link'>Get Shortlisted Users</a>
      <a href='/create_user_registration' className='link'>Create User Registration</a>
      <a href='/get_user_registrations' className='link'>Get User Registrations</a>
    </div>
  );
}
