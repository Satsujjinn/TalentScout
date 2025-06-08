import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { token } = useAuth();
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include'
      });
      const data = await res.json();
      setMessage(data.message);
    }
    if (token) fetchData();
  }, [token]);

  return <div>{message || 'Loading...'}</div>;
}
