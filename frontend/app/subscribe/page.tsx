'use client';
import { useAuth } from '@/lib/auth';

export default function SubscribePage() {
  const { subscribe, user } = useAuth();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Subscribe</h1>
      {user?.isSubscribed ? (
        <p className="text-center">You are subscribed. Thank you!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tier: 'Starter', price: 'Free', desc: 'Browse limited profiles' },
            {
              tier: 'Pro',
              price: '$29/mo',
              desc: 'Unlimited matches and chat history',
            },
            {
              tier: 'Elite',
              price: '$99/mo',
              desc: 'Priority support and advanced analytics',
            },
          ].map((t) => (
            <div key={t.tier} className="bg-white p-6 rounded-lg shadow text-center">
              <h2 className="text-xl font-semibold mb-2">{t.tier}</h2>
              <p className="text-3xl font-bold mb-4">{t.price}</p>
              <p className="mb-4">{t.desc}</p>
              {t.tier !== 'Starter' && (
                <button
                  onClick={subscribe}
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-500 transition"
                >
                  Choose {t.tier}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
