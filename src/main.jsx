// React core
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Styles
import './index.css'
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/dm-sans/800.css";

// App
import App from './App.jsx'

// Analytics
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
        <Analytics/>
        <SpeedInsights/>
    </StrictMode>,
)