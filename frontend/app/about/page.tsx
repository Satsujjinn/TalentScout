'use client';

import Image from 'next/image';

const HERO_IMAGE = '/hero-background.jpg';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

const TEAM: TeamMember[] = [
  { name: 'Alex Recruiter', role: 'Co-Founder', avatar: '/vercel.svg' },
  { name: 'Jordan Scout', role: 'CTO', avatar: '/next.svg' },
  { name: 'Taylor Athlete', role: 'Product Lead', avatar: '/globe.svg' },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section
        className="relative flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">About TalentScout</h1>
          <p className="max-w-2xl">
            TalentScout connects athletes and recruiters through AI powered
            matching, real time communication and streamlined collaboration.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
            Our Mission
          </h2>
          <p className="text-center text-blue-700 mb-8">
            We make it easier for athletes to showcase their skills and for
            recruiters to discover the perfect fit for their teams.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-blue-50 p-6 rounded-lg shadow text-center"
              >
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-blue-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-100 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Join our community
          </h2>
          <p className="mb-6 text-blue-600">
            Whether you&apos;re an athlete looking to get noticed or a recruiter
            seeking fresh talent, TalentScout is here to help.
          </p>
          <a
            href="/signup"
            className="inline-block px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-500 transition"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
