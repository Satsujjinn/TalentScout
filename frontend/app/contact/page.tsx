'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    alert('Message sent! (not really, this is a demo)');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-4">
          For inquiries please reach out at{' '}
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">Message</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-500 transition"
        >
          Send Message
        </button>
      </form>

      <div className="h-64 w-full rounded overflow-hidden">
        <Map />
      </div>
    </div>
  );
}
