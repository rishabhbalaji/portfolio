// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' 
import { BrowserRouter } from 'react-router-dom' 
// import Theme from '@/components/theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. WRAP APP */}
    {/* <Theme> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </Theme> */}
    {/* 3. END WRAP */}
  </React.StrictMode>,
)