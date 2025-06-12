'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

const HERO_IMAGE = '/hero-background.jpg';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'athlete' | 'recruiter'>('athlete');
  const [sport, setSport] = useState('');

  const router = useRouter();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(name, email, password, role, sport);
    router.push('/login?verify=1');
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
              Create Account
            </h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-green-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <label className="block text-sm font-medium text-green-700 mb-1">Role</label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                value={role}
                onChange={(e) => setRole(e.target.value as 'athlete' | 'recruiter')}
              >
                <option value="athlete">Athlete</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
            {role === 'athlete' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-green-700 mb-1">Sport</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-400 transition"
            >
              Sign Up
            </button>
            <p className="mt-4 text-sm text-center text-green-700">
              Already have an account?{' '}
              <Link href="/login" className="text-green-500 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
