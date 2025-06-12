'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSocket } from '@/lib/socket';
import DashboardHeader from '@/components/DashboardHeader';
import Skeleton from 'react-loading-skeleton';
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
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    async function fetchMatches() {
      if (!athleteId) return;
      const res = await api.get(`/api/matches/athlete/${athleteId}`);
      setMatches(res.data);
      setLoading(false);
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

  useEffect(() => {
    if (!loading) {
      const id = requestAnimationFrame(() => setFadeIn(true));
      return () => cancelAnimationFrame(id);
    }
  }, [loading]);

  return (
    <>
      <DashboardHeader />
      <main className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Athlete Dashboard</h1>
          <Link href="/athletes/profile" className="underline text-green-600 block mb-4">Edit Profile</Link>
          <p className="mb-4">Waiting for recruiters to match with you...</p>
          {loading && (
            <ul className="space-y-2 mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="border p-2 rounded">
                  <Skeleton height={24} />
                </li>
              ))}
            </ul>
          )}
          {!loading && (
            <ul
              className={`space-y-2 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
            >
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
                className="ml-2 text-green-600 underline"
              >
                Open Chat
              </Link>
            )}
              </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
