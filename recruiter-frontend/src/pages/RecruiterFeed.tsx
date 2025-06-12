import React, { useEffect, useState } from "react";
import { useMatch } from '../context/MatchContext';
import api from '../services/api';

interface Athlete {
  id: string;
  name: string;
  sport: string;
  photoUrl: string;
  videoUrl: string;
}

export default function RecruiterFeed() {
  const { sendLike, sendPass } = useMatch();
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    api.get<Athlete[]>('/api/athletes').then((res) => setAthletes(res.data));
  }, []);

  const handleLike = (id: string) => {
    sendLike(id);
    setAthletes((a) => a.filter((athlete) => athlete.id !== id));
  };

  const handlePass = (id: string) => {
    sendPass(id);
    setAthletes((a) => a.filter((athlete) => athlete.id !== id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {athletes.map((athlete) => (
        <div key={athlete.id} className="bg-white rounded shadow-lg p-4">
          <img
            src={athlete.photoUrl}
            alt={athlete.name}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="text-xl font-bold mt-2">{athlete.name}</h3>
          <p>{athlete.sport}</p>
          <video src={athlete.videoUrl} controls className="w-full mt-2" />
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleLike(athlete.id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Like
            </button>
            <button
              onClick={() => handlePass(athlete.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Pass
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
