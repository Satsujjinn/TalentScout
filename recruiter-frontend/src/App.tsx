import { Routes, Route } from 'react-router-dom';
import RecruiterFeed from './pages/RecruiterFeed';
import AthleteDashboard from './pages/AthleteDashboard';
import ProfileEditor from './components/ProfileEditor';
import ChatWindow from './components/ChatWindow';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <div className="min-h-screen p-4">
      <Routes>
        <Route path="/recruiter-feed" element={<RecruiterFeed />} />
        <Route path="/dashboard" element={<AthleteDashboard />} />
        <Route path="/profile" element={<ProfileEditor />} />
        <Route path="/chat/:channelUrl" element={<ChatWindow />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
