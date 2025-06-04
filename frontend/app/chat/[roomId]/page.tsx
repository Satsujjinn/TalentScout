'use client';
import { useEffect, useState } from 'react';
import { getSocket } from '@/lib/socket';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import api from '@/lib/api';

interface Message {
  text: string;
  senderId: string;
  roomId: string;
}

export default function ChatRoom() {
  const params = useParams();
  const roomId = params.roomId as string;
  const { user } = useAuth();
  const userId = user?.id || '';
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');

  useEffect(() => {
    async function init() {
      const res = await api.get(`/api/matches/${roomId}`);
      setStatus(res.data.status);
      const socket = getSocket(userId, roomId);
      socket.on('message', (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
      });
    }
    init();
  }, [roomId, userId]);

  function send() {
    if (status !== 'accepted') return;
    const socket = getSocket();
    socket.emit('message', { roomId, text, senderId: userId });
    setText('');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="border p-4 mb-4 h-64 overflow-y-auto">
        {status !== 'accepted' ? (
          <p className="text-gray-600">Waiting for match acceptance...</p>
        ) : (
          messages.map((m, idx) => (
            <div key={idx} className="mb-2">
              <span className="font-semibold mr-2">{m.senderId}:</span>
              {m.text}
            </div>
          ))
        )}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 border p-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={send} className="px-4 py-2 bg-orange-600 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
}
