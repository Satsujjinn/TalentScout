'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import api from '@/lib/api';

export default function AthleteProfile() {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [achievements, setAchievements] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const save = async () => {
    if (!user) return;
    const achievementsArr = achievements
      .split('\n')
      .map((a) => a.trim())
      .filter(Boolean);
    let highlightUrl: string | undefined;
    if (videoFile) {
      const fd = new FormData();
      fd.append('video', videoFile);
      const uploadRes = await api.post(`/api/athletes/${user.id}/highlight`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      highlightUrl = uploadRes.data.url;
    }
    await api.put(`/api/athletes/${user.id}`, {
      avatarUrl,
      achievements: achievementsArr,
      highlightVideoUrl: highlightUrl,
    });
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
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Highlight Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Achievements (one per line)</label>
        <textarea
          className="border p-2 w-full rounded"
          rows={4}
          value={achievements}
          onChange={(e) => setAchievements(e.target.value)}
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
