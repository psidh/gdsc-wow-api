'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TeamMember {
  email: string;
}

const Page: React.FC = () => {
  const [teamName, setTeamName] = useState<string>('');
  const [teamSize, setTeamSize] = useState<number>(4);
  const [teamDetails, setTeamDetails] = useState<TeamMember[]>([
    { email: '' },
    { email: '' },
    { email: '' },
    { email: '' },
  ]);
  const [domain, setDomain] = useState<string>('mobile');
  const [teamLead, setTeamLead] = useState<boolean>(true);
  const [response, setResponse] = useState(null);

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...teamDetails];
    values[index].email = event.target.value;
    setTeamDetails(values);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const payload = {
      team_name: teamName,
      team_size: teamSize,
      team_details: teamDetails,
      domain,
      team_lead: teamLead,
    };

    try {
      const res = await fetch(`/api/create_team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setResponse(result);
    } catch (error: any) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="py-24 flex items-center justify-center">
      <div className="bg-neutral-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl mb-6 text-center">Create Team</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Team Name:</label>
            <input
              title='team_name'
              type='text'
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Domain:</label>
            <select
              title='domain'
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
              className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="mobile">Mobile</option>
              <option value="web">Web</option>
            </select>
          </div>
          {teamDetails.map((detail, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2">Member {index + 1} Email:</label>
              <input
                title='team_details'
                type='email'
                value={detail.email}
                onChange={(e) => handleInputChange(index, e)}
                required
                className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type='checkbox'
                checked={teamLead}
                onChange={(e) => setTeamLead(e.target.checked)}
                className="mr-2"
              />
              Team Lead
            </label>
          </div>
          <button
            type='submit'
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Team
          </button>
        </form>
        {response && (
          <div className="mt-6">
            <h2 className="text-xl mb-2">Response:</h2>
            <pre className="bg-neutral-700 p-4 rounded">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
