import axios from 'axios';

const useMock = !process.env.NEXT_PUBLIC_API_URL;

let api: any;

if (useMock) {
  const mockAthletes = [
    {
      _id: 'ath1',
      name: 'Jane Doe',
      sport: 'Soccer',
      avatarUrl: 'https://picsum.photos/seed/ath1/200/200',
      achievements: ['State Champion', 'MVP 2023'],
    },
    {
      _id: 'ath2',
      name: 'John Smith',
      sport: 'Basketball',
      avatarUrl: 'https://picsum.photos/seed/ath2/200/200',
      achievements: ['All-American', '3x All-Star'],
    },
    {
      _id: 'ath3',
      name: 'Maria Garcia',
      sport: 'Tennis',
      avatarUrl: 'https://picsum.photos/seed/ath3/200/200',
      achievements: ['Grand Slam Finalist'],
    },
    {
      _id: 'ath4',
      name: 'Liu Wei',
      sport: 'Table Tennis',
      avatarUrl: 'https://picsum.photos/seed/ath4/200/200',
      achievements: ['World Junior Champion'],
    },
  ];

  const mockMatches = [
    { _id: 'm1', athleteId: 'ath1', recruiterId: 'rec1', status: 'pending' },
    { _id: 'm2', athleteId: 'ath1', recruiterId: 'rec2', status: 'accepted' },
  ];

  api = {
    get: async (url: string) => {
      if (url.startsWith('/api/athletes')) {
        return { data: mockAthletes };
      }
      if (url.startsWith('/api/matches/athlete/')) {
        return { data: mockMatches };
      }
      if (url.startsWith('/api/matches/recruiter/')) {
        return { data: mockMatches };
      }
      if (url.startsWith('/api/matches/')) {
        return { data: { status: 'accepted' } };
      }
      return { data: [] };
    },
    post: async () => ({ data: {} }),
    patch: async () => ({ data: {} }),
    put: async () => ({ data: {} }),
  };
} else {
  api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  api.interceptors.request.use((config: any) => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auth');
      if (stored) {
        const { token } = JSON.parse(stored);
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });
}

export default api;
