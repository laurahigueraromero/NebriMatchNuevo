import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Footer from './componentes/footer';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Footer/>
  </StrictMode>,
)
