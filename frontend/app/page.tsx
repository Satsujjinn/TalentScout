// frontend/app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import FifaPlayerCard from '@/components/FifaPlayerCard';

// ----------------------------------------------------------------------------
// HERO IMAGE (replace '/hero-background.jpg' with your actual path)
const HERO_IMAGE = '/hero-background.jpg';

// ----------------------------------------------------------------------------
// FEATURE LIST
const FEATURES = [
  {
    title: 'AI-Powered Matching',
    description: 'Our platform uses advanced AI algorithms to match you with the best athletes.',
    icon: (
      <svg 
        className="w-8 h-8 text-orange-500" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8c.667 0 1.333.667 1.333 1.333v3.334C13.333 13.333 12.667 14 12 14s-1.333-.667-1.333-1.333v-3.334C10.667 8.667 11.333 8 12 8z" 
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 2v2M12 18v2M4.929 4.929l1.414 1.414M18.657 18.657l1.414 1.414M2 12h2M20 12h2M4.929 19.071l1.414-1.414M18.657 5.343l1.414-1.414" 
        />
      </svg>
    ),
  },
  {
    title: 'Real-Time Chat',
    description: 'Communicate instantly with athletes or recruiters directly in the app.',
    icon: (
      <svg 
        className="w-8 h-8 text-orange-500" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.8L3 21l1.8-4a9.863 9.863 0 01-.8-4c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
        />
      </svg>
    ),
  },
  {
    title: 'Secure Payments',
    description: 'Handle all transactions securely through our integrated payment gateway.',
    icon: (
      <svg 
        className="w-8 h-8 text-orange-500" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 11c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z" 
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10zM2 12h20" 
        />
      </svg>
    ),
  },
  {
    title: 'Analytics Dashboard',
    description: 'Gain insights with our powerful analytics tools and reporting features.',
    icon: (
      <svg 
        className="w-8 h-8 text-orange-500" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 17v-6h4v6m2-10h-6v4h6V7z" 
        />
      </svg>
    ),
  },
];

// ----------------------------------------------------------------------------
// PROCESS STEPS
const STEPS = [
  {
    step: 1,
    title: 'Create an Account',
    description: 'Sign up in just a few clicks and verify your email to get started.',
  },
  {
    step: 2,
    title: 'Build Your Profile',
    description: 'Add your athletic skills, statistics, and preferences to get matched faster.',
  },
  {
    step: 3,
    title: 'Browse Opportunities',
    description: 'Explore teams or athletes and filter by sport, position, and experience.',
  },
  {
    step: 4,
    title: 'Connect & Compete',
    description: 'Chat in real-time, schedule tryouts, and collaborate with teams or athletes.',
  },
];

// ----------------------------------------------------------------------------
// TESTIMONIALS
const TESTIMONIALS = [
  {
    name: 'Alice Johnson',
    role: 'Professional Swimmer',
    text: 'TalentScout connected me with a national team coach in days—unbelievable!',
    avatar: '/testimonials/alice.jpg',
  },
  {
    name: 'Mark Lee',
    role: 'Sports Recruiter',
    text: 'We filled key roster slots 50% faster thanks to AI-driven athlete matching.',
    avatar: '/testimonials/mark.jpg',
  },
  {
    name: 'Priya Patel',
    role: 'Fitness Coach',
    text: 'Real-time chat and scheduling made scouting athletes for my team seamless.',
    avatar: '/testimonials/priya.jpg',
  },
];

// ----------------------------------------------------------------------------
// SAMPLE ATHLETES FOR SHOWCASE
const SAMPLE_ATHLETES = [
  {
    _id: '1',
    name: 'Chris Taylor',
    sport: 'Soccer',
    avatarUrl: '/athletes/sample1.jpg',
    achievements: ['MVP 2022', 'Top Scorer'],
  },
  {
    _id: '2',
    name: 'Dana Smith',
    sport: 'Basketball',
    avatarUrl: '/athletes/sample2.jpg',
    achievements: ['All-Star Team', 'Championship Winner'],
  },
  {
    _id: '3',
    name: 'Evan Rodriguez',
    sport: 'Tennis',
    avatarUrl: '/athletes/sample3.jpg',
    achievements: ['Grand Slam Finalist'],
  },
  {
    _id: '4',
    name: 'Fatima Khan',
    sport: 'Running',
    avatarUrl: '/athletes/sample4.jpg',
    achievements: ['Olympic Qualifier'],
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col font-sans">
      {/* HERO SECTION */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-green-900 bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            className="text-6xl md:text-7xl font-extrabold text-green-50 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Top Athletes
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-green-200 mb-8 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Connect, match, and hire athletes with AI-driven insights and real-time collaboration.
          </motion.p>
          <div className="space-x-4">
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 transition"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED ATHLETES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
            Featured Athletes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {SAMPLE_ATHLETES.map((athlete) => (
              <FifaPlayerCard
                key={athlete._id}
                athlete={athlete}
                onMatch={() => {}}
                showMatchButton={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-green-800">{feature.title}</h3>
                <p className="text-green-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">How It Works</h2>
          <div className="space-y-12">
            {STEPS.map((step) => (
              <motion.div
                key={step.step}
                className="flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="md:w-1/4 text-center md:text-left mb-4 md:mb-0">
                  <div className="text-3xl font-bold text-orange-600">{step.step}</div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold text-green-800 mb-2">{step.title}</h3>
                  <p className="text-green-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 bg-green-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-12">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <p className="text-3xl font-bold mb-4">Free</p>
              <p>Browse athletes and receive limited matches.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">$29/mo</p>
              <p>Unlimited matches and chat history.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Elite</h3>
              <p className="text-3xl font-bold mb-4">$99/mo</p>
              <p>Priority support and advanced analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-12">What Users Say</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
          >
            {TESTIMONIALS.map((t, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-green-600 italic mb-4">“{t.text}”</p>
                  <div className="flex items-center justify-center space-x-4">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-green-800">{t.name}</p>
                      <p className="text-sm text-green-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-20 bg-green-400 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Recruiting?</h2>
          <p className="mb-8">Join TalentScout today and discover elite athletes in minutes.</p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-green-600 font-semibold rounded-md hover:bg-green-50 transition"
          >
            Start Now
          </Link>
        </div>
      </section>

    </div>
  );
}
