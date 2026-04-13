import { useEffect, useState } from 'react'
import './App.css'
import API from './api' 
import BookingForm from './components/BookingForm' // Import the new component

function App() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
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
      <h1>AutoMoX Portal</h1>
      
      <div className="card">
        <p>Backend Status: <strong>{message}</strong></p>
      </div>

      <hr style={{ margin: '20px 0', opacity: '0.2' }} />

      {/* Feature 1: Book Test Drive */}
      <BookingForm />
    </div>
  )
}

export default App