'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSocket } from '@/lib/socket';
import Link from 'next/link';
import AthleteSwiper from '@/components/AthleteSwiper';
import DashboardHeader from '@/components/DashboardHeader';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth';

interface Athlete {
  _id: string;
  name: string;
  sport?: string;
  avatarUrl?: string;
  achievements?: string[];
}

interface Match {
  _id: string;
  athleteId: string;
  recruiterId: string;
  status: 'pending' | 'accepted' | 'declined';
}

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const recruiterId = user?.id || '';
  const searchParams = useSearchParams();
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [nameFilter, setNameFilter] = useState(searchParams.get('name') || '');
  const [sportFilter, setSportFilter] = useState(searchParams.get('sport') || '');
  const [achFilter, setAchFilter] = useState(searchParams.get('ach') || '');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    async function fetchAthletes() {
      const res = await api.get('/api/athletes');
      setAthletes(res.data);
    }
    fetchAthletes();
    const socket = getSocket(recruiterId);
    socket.on('match', (m: Match) => {
      if (m.recruiterId === recruiterId) {
        setMatches((prev) => {
          const existing = prev.find((x) => x._id === m._id);
          if (existing) {
            return prev.map((x) => (x._id === m._id ? m : x));
          }
          return [...prev, m];
        });
      }
    });
  }, [recruiterId, user, router]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (nameFilter) params.set('name', nameFilter);
    if (sportFilter) params.set('sport', sportFilter);
    if (achFilter) params.set('ach', achFilter);
    router.replace(`?${params.toString()}`);
  }, [nameFilter, sportFilter, achFilter, router]);

  return (
    <>
      <DashboardHeader />
      <main className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Recruiter Dashboard</h1>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
        <input
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Filter by name"
        />
        <input
          value={sportFilter}
          onChange={(e) => setSportFilter(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Filter by sport"
        />
        <input
          value={achFilter}
          onChange={(e) => setAchFilter(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Filter by achievement"
        />
      </div>
      {!user?.isSubscribed && (
        <p className="mb-4 text-red-600">
          You need a subscription to match with athletes.{' '}
          <Link href="/subscribe" className="underline">
            Subscribe now
          </Link>
        </p>
      )}
      <div className="flex justify-center mb-6">
        <AthleteSwiper
          athletes={athletes
            .filter((a) => a.name.toLowerCase().includes(nameFilter.toLowerCase()))
            .filter((a) =>
              sportFilter === ''
                ? true
                : (a.sport || '').toLowerCase().includes(sportFilter.toLowerCase())
            )
            .filter((a) =>
              achFilter === ''
                ? true
                : (a.achievements || [])
                    .join(' ')
                    .toLowerCase()
                    .includes(achFilter.toLowerCase())
            )}
          disabled={!user?.isSubscribed}
          onMatch={(id) => api.post('/api/matches', { athleteId: id, recruiterId })}
        />
      </div>

          <h2 className="text-2xl font-bold mt-8 mb-2">Matches</h2>
          <ul className="space-y-2">
            {matches.map((m) => (
              <li key={m._id} className="border p-2 rounded">
                Athlete {m.athleteId} - {m.status}
                {m.status === 'accepted' && (
                  <Link
                    href={`/chat/${m._id}`}
                    className="underline text-blue-600 ml-2"
                  >
                    Chat
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
