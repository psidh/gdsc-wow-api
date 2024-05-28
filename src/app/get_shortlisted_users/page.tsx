'use client';
import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/shortlist_user`);
        const data = await res.json();

        setUsers(data);
      } catch (error: any) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="py-24 flex items-center justify-center">
      <div className="bg-neutral-800 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl mb-6 text-center">User List</h1>
        <ul>
          {users.map((user: any) => (
            <li key={user._id} className="mb-4 p-4 bg-neutral-700 rounded">
              <p><strong>First Name:</strong> {user.first_name}</p>
              <p><strong>Last Name:</strong> {user.last_name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
