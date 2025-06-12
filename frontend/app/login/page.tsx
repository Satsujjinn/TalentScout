'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

const HERO_IMAGE = '/hero-background.jpg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'athlete' | 'recruiter'>('athlete');

  const router = useRouter();
  const [verifyMsg, setVerifyMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setVerifyMsg(new URLSearchParams(window.location.search).get('verify'));
    }
  }, []);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const u = await login(email, password, role);
    if (u.role !== role) {
      alert('Incorrect role selected');
      return;
    }
    if (u.role === 'recruiter') router.push('/recruiters/dashboard');
    else router.push('/athletes/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section
        className="relative flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-green-900 bg-opacity-60 dark:bg-black dark:bg-opacity-60" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-80">
          <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
            Sign In
          </h1>
          {verifyMsg && (
            <p className="mb-4 text-green-700 text-center">Please check your email for a verification link.</p>
          )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-green-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-green-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-green-700 mb-1">
                Role
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                value={role}
                onChange={(e) => setRole(e.target.value as 'athlete' | 'recruiter')}
              >
                <option value="athlete">Athlete</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-400 transition"
            >
              Login
            </button>
            <p className="mt-4 text-sm text-center text-green-700">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-green-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
