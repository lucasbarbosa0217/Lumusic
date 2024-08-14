import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MusicProvider } from './Context/MusicContext';
import "./Vars.css"
import "./index.css"

import './index.css'

createRoot(document.getElementById('root')).render(
  <MusicProvider>
    <App />
  </MusicProvider>,
)
