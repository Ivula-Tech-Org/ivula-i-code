import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GirafProvider } from './giraff/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GirafProvider>
        <App />
      </GirafProvider>
    </BrowserRouter>
  </StrictMode>,
)
