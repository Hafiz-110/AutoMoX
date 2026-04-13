import { useEffect, useState } from 'react'
import './App.css'
import API from './api'
import AdminVerification from './components/AdminVerification'

function App() {
  const [status, setStatus] = useState("Connecting...")

  useEffect(() => {
    API.get('/')
      .then(res => setStatus(res.data))
      .catch(() => setStatus("Offline ❌"))
  }, [])

  return (
    <div className="App">
      <header style={{ borderBottom: '1px solid #444', marginBottom: '20px' }}>
        <h1>AutoMoX Admin Portal</h1>
        <p>Server Status: <strong>{status}</strong></p>
      </header>

      <main className="card">
        {/* Feature 19 Component */}
        <AdminVerification />
      </main>
    </div>
  )
}

export default App