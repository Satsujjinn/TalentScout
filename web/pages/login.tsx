import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { setToken } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.username.value,
        password: form.password.value
      }),
      credentials: 'include'
    });
    const data = await res.json();
    setToken(data.token);
    router.push('/profile');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="username" />
      <input name="password" type="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
}
