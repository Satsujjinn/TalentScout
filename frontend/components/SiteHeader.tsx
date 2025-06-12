import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="bg-green-900 text-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-lg">
          TalentScout
        </Link>
        <nav className="space-x-4 text-sm">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}
