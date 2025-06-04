'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSocket } from '@/lib/socket';
import Link from 'next/link';
import Image from 'next/image';
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
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [search, setSearch] = useState('');

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
  }, [recruiterId, user]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Recruiter Dashboard</h1>
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border p-2 rounded"
          placeholder="Search athletes..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {athletes
          .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
          .map((athlete) => (
          <div key={athlete._id} className="border p-4 rounded shadow">
            {athlete.avatarUrl && (
              <Image
                src={athlete.avatarUrl}
                alt={athlete.name}
                width={400}
                height={160}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-xl font-semibold">{athlete.name}</h2>
            <p className="mb-2">{athlete.sport}</p>
            {athlete.achievements && athlete.achievements.length > 0 && (
              <ul className="mb-2 list-disc list-inside text-sm text-gray-600">
                {athlete.achievements.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            )}
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
  );
}
