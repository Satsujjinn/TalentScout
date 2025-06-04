'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        For any inquiries please reach out at{' '}
        <a href="mailto:support@talentscout.example.com" className="text-blue-600 underline">
          support@talentscout.example.com
        </a>
        .
      </p>
      <p>
        You can also visit our{' '}
        <Link href="/about" className="text-blue-600 underline">
          About page
        </Link>{' '}
        to learn more about the project.
      </p>
    </div>
  );
}
