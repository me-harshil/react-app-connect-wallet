import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThirdwebProvider } from "thirdweb/react";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
