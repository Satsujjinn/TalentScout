import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Request {
  id: string;
  recruiterName: string;
}

export default function AthleteDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    api.get<Request[]>('/api/matches/incoming').then((res) => setRequests(res.data));
  }, []);

  const handle = (id: string, accept: boolean) => {
    api.post(`/api/matches/${id}/${accept ? 'accept' : 'decline'}`);
    setRequests((r) => r.filter((req) => req.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Match Requests</h2>
      <ul className="space-y-2">
        {requests.map((req) => (
          <li key={req.id} className="bg-white p-2 rounded shadow">
            {req.recruiterName}
            <button className="ml-2 text-green-600" onClick={() => handle(req.id, true)}>
              Accept
            </button>
            <button className="ml-2 text-red-600" onClick={() => handle(req.id, false)}>
              Decline
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
