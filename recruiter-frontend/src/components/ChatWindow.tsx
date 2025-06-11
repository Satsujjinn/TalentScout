import React from 'react';
import { useParams } from 'react-router-dom';
import { SendbirdProvider, ChannelList, Channel, MessageList, MessageInput } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useAuth } from '../context/AuthContext';

export default function ChatWindow() {
  const { channelUrl } = useParams();
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="h-screen">
      <SendbirdProvider appId="YOUR_SENDBIRD_APP_ID" userId={user.id} nickname={user.name}>
        <div className="flex h-full">
          <ChannelList className="w-64" />
          {channelUrl && (
            <Channel channelUrl={channelUrl}>
              <MessageList />
              <MessageInput />
            </Channel>
          )}
        </div>
      </SendbirdProvider>
    </div>
  );
}
