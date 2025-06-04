'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSocket } from '@/lib/socket';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth';

interface Match {
  _id: string;
  athleteId: string;
  recruiterId: string;
}

export default function AthleteDashboard() {
  const { user } = useAuth();
  const athleteId = user?.id || '';
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    async function fetchMatches() {
      if (!athleteId) return;
      const res = await api.get(`/api/matches/athlete/${athleteId}`);
      setMatches(res.data);
    }
    fetchMatches();
    const socket = getSocket(athleteId);
    socket.on('match', (match: Match) => {
      if (match.athleteId === athleteId) {
        setMatches((m) => [...m, match]);
      }
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Athlete Dashboard</h1>
      <Link href="/athletes/profile" className="underline text-teal-600 block mb-4">Edit Profile</Link>
      <p className="mb-4">Waiting for recruiters to match with you...</p>
      <ul className="space-y-2">
        {matches.map((m) => (
          <li key={m._id} className="border p-2 rounded">
            Matched with recruiter {m.recruiterId} -{' '}
            <Link href={`/chat/${m._id}`} className="text-teal-600 underline">
              Open Chat
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
