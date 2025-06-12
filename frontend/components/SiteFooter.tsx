import Link from 'next/link';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 bg-green-900 text-green-200 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex justify-center space-x-6 mb-4">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </nav>
        <p className="text-sm">© {year} TalentScout. All rights reserved.</p>
      </div>
    </footer>
  );
}
