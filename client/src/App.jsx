import { useEffect, useState } from 'react'
import './App.css'
import API from './api' // Import your custom instance

function App() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    // Notice we only put '/' because the baseURL handles the rest!
    API.get('/')
      .then(res => {
        setMessage(res.data)
      })
      .catch(err => {
        console.error(err)
        setMessage("Backend is not reaching out ❌")
      })
  }, [])

  return (
    <div className="App">
      <h1>MERN Team Project</h1>
      <div className="card">
        <p>Backend Status: <strong>{message}</strong></p>
      </div>
    </div>
  )
}

export default App
