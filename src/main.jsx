// React core
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

// Styles
import './index.css'
import "@fontsource-variable/dm-sans";

// i18n
import './i18n.js';

// App
import App from './App.jsx'

// Analytics
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/react';

const isVercel = import.meta.env.VERCEL === '1';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
        {isVercel && <Analytics/>}
        {isVercel && <SpeedInsights/>}
    </StrictMode>
);