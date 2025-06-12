'use client';
import FifaPlayerCard, { Athlete } from '../../shared/src/components/FifaPlayerCard';

interface AthleteGridProps {
  athletes: Athlete[];
  onMatch: (id: string) => void;
  disabled?: boolean;
}

export default function AthleteGrid({ athletes, onMatch, disabled }: AthleteGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {athletes.map((athlete) => (
        <div key={athlete._id} className="aspect-square">
          <FifaPlayerCard
            athlete={athlete}
            onMatch={() => onMatch(athlete._id)}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
}
