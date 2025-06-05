'use client';
import { useAuth } from '@/lib/auth';

export default function SubscribePage() {
  const { subscribe, user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Subscribe</h1>
      {user?.isSubscribed ? (
        <p>You are subscribed. Thank you!</p>
      ) : (
        <button
          onClick={subscribe}
          className="px-4 py-2 bg-orange-600 text-white rounded"
        >
          Subscribe for $10/month
        </button>
      )}
    </div>
  );
}
