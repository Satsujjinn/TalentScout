import axios from 'axios';

const useMock = !process.env.NEXT_PUBLIC_API_URL;

let api: any;

if (useMock) {
  const mockAthletes = [
    {
      _id: 'a1',
      name: 'Sample Athlete',
      sport: 'soccer',
      achievements: ['champion'],
    },
  ];

  api = {
    get: async (url: string) => {
      if (url.startsWith('/api/athletes')) {
        return { data: mockAthletes };
      }
      if (url.includes('/api/matches/')) {
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
