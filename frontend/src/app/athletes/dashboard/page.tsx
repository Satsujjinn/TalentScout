'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { getSocket } from '@/lib/socket';

interface Match {
  _id: string;
  athleteId: string;
  recruiterId: string;
}

export default function AthleteDashboard() {
  const athleteId = '1'; // placeholder id
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    async function fetchMatches() {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/matches/athlete/${athleteId}`);
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
