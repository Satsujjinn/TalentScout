import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

export default function Signup() {
  const { setToken } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: (form as any).username.value,
        password: (form as any).password.value,
        role: 'talent'
      }),
      credentials: 'include'
    });
    const data = await res.json();
    setToken(data.token);
    router.push('/profile');
  }

  return (
    <Layout>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Username
          <input name="username" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit" className="btn primary">Sign Up</button>
      </form>
    </Layout>
  );
}
