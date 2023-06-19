import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { LoginPage } from './auth/pages/LoginPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>,
)
