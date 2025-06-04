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
  const [index, setIndex] = useState(0);
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
  }, []);

  async function like() {
    const athlete = athletes[index];
    if (!athlete) return;
    await api.post('/api/matches', {
      athleteId: athlete._id,
      recruiterId,
    });
    setIndex((i) => i + 1);
  }

  function skip() {
    setIndex((i) => i + 1);
  }

  const athlete = athletes[index];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Recruiter Dashboard</h1>
      {athlete ? (
        <div className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold">{athlete.name}</h2>
          <p>{athlete.sport}</p>
          <div className="mt-4 space-x-2">
            <button onClick={like} className="px-4 py-2 bg-teal-600 text-white rounded">Like</button>
            <button onClick={skip} className="px-4 py-2 bg-gray-300 rounded">Skip</button>
          </div>
        </div>
      ) : (
        <p>No more athletes</p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-2">Matches</h2>
      <ul className="space-y-2">
        {matches.map((m) => (
          <li key={m._id} className="border p-2 rounded">
            Athlete {m.athleteId} -{' '}
            <Link href={`/chat/${m._id}`} className="underline text-teal-600">
              Chat
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
