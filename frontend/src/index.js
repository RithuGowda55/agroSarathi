// frontend/src/index.js
// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import { AuthProvider } from './AuthContext';
import { LanguageProvider } from "../src/components/LanguageContext";

ReactDOM.render(
    <AuthProvider>
        <LanguageProvider>
            <App />
        </LanguageProvider>
    </AuthProvider>,
    document.getElementById('root')
);
