import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import api from '../services/api';

interface Match {
  id: string;
  athleteId: string;
}

interface State {
  matches: Match[];
}

type Action =
  | { type: 'set'; payload: Match[] }
  | { type: 'add'; payload: Match };

const MatchContext = createContext<{
  matches: Match[];
  sendLike: (id: string) => Promise<void>;
  sendPass: (id: string) => Promise<void>;
  fetchMatches: () => Promise<void>;
} | null>(null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set':
      return { matches: action.payload };
    case 'add':
      return { matches: [...state.matches, action.payload] };
    default:
      return state;
  }
};

export const MatchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { matches: [] });

  const sendLike = async (athleteId: string) => {
    await api.post('/api/matches/like', { athleteId });
  };

  const sendPass = async (athleteId: string) => {
    await api.post('/api/matches/pass', { athleteId });
  };

  const fetchMatches = async () => {
    const { data } = await api.get<Match[]>('/api/matches');
    dispatch({ type: 'set', payload: data });
  };

  return (
    <MatchContext.Provider value={{ matches: state.matches, sendLike, sendPass, fetchMatches }}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const ctx = useContext(MatchContext);
  if (!ctx) throw new Error('useMatch must be inside MatchProvider');
  return ctx;
};
