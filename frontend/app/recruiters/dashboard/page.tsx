'use client';
import { useEffect, useState } from 'react';
import { getSocket } from '@/lib/socket';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth';

interface Athlete {
  _id: string;
  name: string;
  sport?: string;
  avatarUrl?: string;
}

interface Match {
  _id: string;
  athleteId: string;
  recruiterId: string;
}

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const recruiterId = user?.id || '';
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    async function fetchAthletes() {
      const res = await api.get('/api/athletes');
      setAthletes(res.data);
    }
    fetchAthletes();
    const socket = getSocket(recruiterId);
    socket.on('match', (m: Match) => {
      if (m.recruiterId === recruiterId) {
        setMatches((prev) => [...prev, m]);
      }
    });
  }, [recruiterId]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Recruiter Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {athletes.map((athlete) => (
          <div key={athlete._id} className="border p-4 rounded shadow">
            {athlete.avatarUrl && (
              <img src={athlete.avatarUrl} alt={athlete.name} className="w-full h-40 object-cover rounded mb-2" />
            )}
            <h2 className="text-xl font-semibold">{athlete.name}</h2>
            <p className="mb-2">{athlete.sport}</p>
            <button
              onClick={() =>
                api.post('/api/matches', { athleteId: athlete._id, recruiterId })
              }
              className="px-4 py-2 bg-orange-600 text-white rounded"
            >
              Match
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-2">Matches</h2>
      <ul className="space-y-2">
        {matches.map((m) => (
          <li key={m._id} className="border p-2 rounded">
            Athlete {m.athleteId} -{' '}
            <Link href={`/chat/${m._id}`} className="underline text-blue-600">
              Chat
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
