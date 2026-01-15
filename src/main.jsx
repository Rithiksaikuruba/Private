import React from 'react'
import ReactDOM from 'react-dom/client' // <--- This was likely missing
import App from './App.jsx'
import './index.css' // Ensure you have your CSS file imported here

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)