import { useEffect, useState } from 'react'
import './App.css'
import API from './api' 
import BookingForm from './components/BookingForm' 
import ManageBookings from './components/ManageBookings'

function App() {
  const [message, setMessage] = useState("Loading...")
  const [currentEmail, setCurrentEmail] = useState(""); // Track user input

  useEffect(() => {
    API.get('/').then(res => setMessage(res.data)).catch(() => setMessage("Error ❌"))
  }, [])

  return (
    <div className="App">
      <h1>AutoMoX Portal</h1>
      <div className="card"><p>Status: {message}</p></div>

      {/* When user types in BookingForm, we update currentEmail */}
      <BookingForm onEmailChange={setCurrentEmail} />

      <hr style={{ margin: '30px 0' }} />

      {/* Show management list ONLY if email is typed */}
      {currentEmail && <ManageBookings userEmail={currentEmail} />}
    </div>
  )
}

export default App