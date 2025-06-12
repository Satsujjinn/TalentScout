import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Entry {
  username: string;
  score: number;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    api.get<Entry[]>('/api/leaderboard').then(res => setEntries(res.data));
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ol className="space-y-2">
        {entries.map((e, i) => (
          <li key={e.username} className="flex justify-between bg-white p-2 rounded shadow">
            <span>{i + 1}. {e.username}</span>
            <span>{e.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
