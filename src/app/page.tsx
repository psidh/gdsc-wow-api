import React from 'react';

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <a href='/teams/create' className='link'>Create Team</a>
      <a href='/shortlist_user' className='link'>ShortList User</a>
      <a href='/get_shortlisted_users' className='link'>Get Shortlisted Users</a>
    </div>
  );
}
