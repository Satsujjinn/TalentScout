'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import FifaPlayerCard, { Athlete } from './FifaPlayerCard';

interface AthleteSwiperProps {
  athletes: Athlete[];
  onMatch: (id: string) => void;
  disabled?: boolean;
}

export default function AthleteSwiper({ athletes, onMatch, disabled }: AthleteSwiperProps) {
  return (
    <Swiper
      modules={[EffectCards]}
      effect="cards"
      grabCursor
      className="w-full max-w-md"
    >
      {athletes.map((athlete) => (
        <SwiperSlide key={athlete._id} className="pb-8 flex justify-center">
          <FifaPlayerCard
            athlete={athlete}
            onMatch={() => onMatch(athlete._id)}
            disabled={disabled}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
