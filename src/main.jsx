import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Editor from './pages/Editor.jsx'
import Viewer from './pages/Viewer.jsx' // you'll create this
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/xviewx" element={<Viewer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
