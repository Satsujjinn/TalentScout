import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { getPresignedUrl, uploadFile } from '../services/s3';

interface Media {
  id: string;
  url: string;
}

export default function ProfileEditor() {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [position, setPosition] = useState('');
  const [stats, setStats] = useState('');
  const [media, setMedia] = useState<Media[]>([]);

  useEffect(() => {
    api.get<Media[]>('/api/media').then((res) => setMedia(res.data));
  }, []);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await getPresignedUrl(file.name);
    await uploadFile(url, file);
    setMedia((m) => [...m, { id: file.name, url }]);
  };

  const deleteMedia = (id: string) => {
    api.delete(`/api/media/${id}`);
    setMedia((m) => m.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-1" />
      <input value={school} onChange={(e) => setSchool(e.target.value)} placeholder="School" className="border p-1" />
      <input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" className="border p-1" />
      <textarea value={stats} onChange={(e) => setStats(e.target.value)} placeholder="Stats" className="border p-1" />
      <input type="file" onChange={handleFile} />
      <div className="grid grid-cols-3 gap-2">
        {media.map((m) => (
          <div key={m.id} className="relative">
            <img src={m.url} alt={m.id} className="w-full h-24 object-cover" />
            <button className="absolute top-0 right-0 bg-red-500 text-white" onClick={() => deleteMedia(m.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
