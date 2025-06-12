'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import ThemeToggle from './ThemeToggle';

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-green-900 text-white dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-lg">
          TalentScout
        </Link>
        <nav className="space-x-4 text-sm flex items-center">
          {user?.role === 'recruiter' && (
            <Link href="/recruiters/dashboard" className="hover:underline">
              Recruiter
            </Link>
          )}
          {user?.role === 'athlete' && (
            <Link href="/athletes/dashboard" className="hover:underline">
              Athlete
            </Link>
          )}
          <ThemeToggle />
          <button onClick={logout} className="hover:underline">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
