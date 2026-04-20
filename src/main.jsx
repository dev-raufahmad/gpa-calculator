import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MainApp } from './MainApp.jsx'
import './style.css'

createRoot(document.getElementById('root')).render(
    <MainApp />
)
