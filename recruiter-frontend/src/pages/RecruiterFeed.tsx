import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card';
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

  return (
    <div className="flex justify-center">
      {athletes.map((athlete) => (
        <TinderCard
          key={athlete.id}
          onSwipe={(dir) => {
            if (dir === 'right') sendLike(athlete.id);
            if (dir === 'left') sendPass(athlete.id);
          }}
        >
          <div className="bg-white rounded shadow-lg p-4 w-80">
            <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-bold mt-2">{athlete.name}</h3>
            <p>{athlete.sport}</p>
            <video src={athlete.videoUrl} controls className="w-full mt-2" />
          </div>
        </TinderCard>
      ))}
    </div>
  );
}
