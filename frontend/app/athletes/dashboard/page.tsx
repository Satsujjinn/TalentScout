'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSocket } from '@/lib/socket';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth';

interface Match {
  _id: string;
  athleteId: string;
  recruiterId: string;
  status: 'pending' | 'accepted' | 'declined';
}

export default function AthleteDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const athleteId = user?.id || '';
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    async function fetchMatches() {
      if (!athleteId) return;
      const res = await api.get(`/api/matches/athlete/${athleteId}`);
      setMatches(res.data);
    }
    fetchMatches();
    const socket = getSocket(athleteId);
    socket.on('match', (match: Match) => {
      if (match.athleteId === athleteId) {
        setMatches((m) => {
          const existing = m.find((x) => x._id === match._id);
          if (existing) {
            return m.map((x) => (x._id === match._id ? match : x));
          }
          return [...m, match];
        });
      }
    });
  }, [athleteId, user]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Athlete Dashboard</h1>
      <Link href="/athletes/profile" className="underline text-blue-600 block mb-4">Edit Profile</Link>
      <p className="mb-4">Waiting for recruiters to match with you...</p>
      <ul className="space-y-2">
        {matches.map((m) => (
          <li key={m._id} className="border p-2 rounded">
            Recruiter {m.recruiterId} - {m.status}
            {m.status === 'pending' && (
              <>
                <button
                  onClick={() =>
                    api.patch(`/api/matches/${m._id}`, { status: 'accepted' })
                  }
                  className="ml-2 px-2 py-1 bg-green-600 text-white rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    api.patch(`/api/matches/${m._id}`, { status: 'declined' })
                  }
                  className="ml-2 px-2 py-1 bg-red-600 text-white rounded"
                >
                  Decline
                </button>
              </>
            )}
            {m.status === 'accepted' && (
              <Link
                href={`/chat/${m._id}`}
                className="ml-2 text-blue-600 underline"
              >
                Open Chat
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
