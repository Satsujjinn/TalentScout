import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { MatchProvider } from './context/MatchContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <MatchProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MatchProvider>
    </AuthProvider>
  </React.StrictMode>
);
