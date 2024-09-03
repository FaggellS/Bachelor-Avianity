import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

// global contexts
import { AuthContextProvider } from './contexts/AuthContext';

disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <AuthContextProvider>
        <App />
    </AuthContextProvider>

  </React.StrictMode>
);
