import Image from 'next/image';
import React from 'react';

export interface Athlete {
  _id: string;
  name: string;
  sport?: string;
  avatarUrl?: string;
  achievements?: string[];
}

interface FifaPlayerCardProps {
  athlete: Athlete;
  onMatch: () => void;
  disabled?: boolean;
  showMatchButton?: boolean;
}

export default function FifaPlayerCard({ athlete, onMatch, disabled, showMatchButton = true }: FifaPlayerCardProps) {
  const rating = Math.min(99, 60 + (athlete.achievements?.length || 0) * 5);
  return (
    <div className="relative bg-gradient-to-br from-orange-100 via-yellow-50 to-green-50 rounded-lg shadow-lg p-4 flex flex-col items-center h-full">
      {athlete.avatarUrl && (
        <Image
          src={athlete.avatarUrl}
          alt={athlete.name}
          width={200}
          height={200}
          className="w-40 h-40 object-cover rounded"
        />
      )}
      <div className="absolute top-2 left-2 text-2xl font-bold text-orange-600">
        {rating}
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-lg font-semibold">{athlete.name}</h3>
        <p className="text-sm text-gray-600">{athlete.sport}</p>
        {athlete.achievements && (
          <ul className="text-xs mt-2 space-y-1">
            {athlete.achievements.slice(0, 3).map((a, idx) => (
              <li key={idx} className="truncate">
                {a}
              </li>
            ))}
          </ul>
        )}
        {showMatchButton && (
          <button
            onClick={onMatch}
            disabled={disabled}
            className="mt-3 px-3 py-1 bg-orange-600 text-white rounded disabled:opacity-50"
          >
            Match
          </button>
        )}
      </div>
    </div>
  );
}
