import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "./styles/main.css";
import "leaflet/dist/leaflet.css";
import App from './App'

// Para la pwa
import { registerSW } from "virtual:pwa-register";

registerSW();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)