import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <>
      <header className="header">
        <div className="container">
          <Link href="/" className="logo">TalentScout</Link>
          <nav className="nav">
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </nav>
        </div>
      </header>
      <main className="container" style={{ flexDirection: 'column' }}>{children}</main>
      <footer className="footer">
        <div className="container">© {year} TalentScout</div>
      </footer>
    </>
  );
}
