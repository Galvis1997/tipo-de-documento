import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Desktop from './pages/Desktop'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/desktop" replace />} />
        <Route path='/desktop' element={<Desktop />} />
      </Routes>
    </BrowserRouter> */}
    <Desktop />
  </StrictMode>
)
