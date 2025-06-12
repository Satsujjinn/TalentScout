import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

export default function Profile() {
  const { token } = useAuth();
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${baseUrl}/api/auth/verify`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      const data = await res.json();
      setMessage(data.message);
    }
    if (token) fetchData();
  }, [token]);

  return (
    <Layout>
      <h1>Profile</h1>
      <p>{message || 'Loading...'}</p>
    </Layout>
  );
}
