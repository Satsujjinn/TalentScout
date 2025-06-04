'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import api from '@/lib/api';

export default function AthleteProfile() {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState('');

  const save = async () => {
    if (!user) return;
    await api.put(`/api/athletes/${user.id}`, { avatarUrl });
    alert('Profile updated');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Avatar URL</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </div>
      <button
        onClick={save}
        className="px-4 py-2 bg-orange-600 text-white rounded"
      >
        Save
      </button>
    </div>
  );
}
