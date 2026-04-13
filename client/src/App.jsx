import { useEffect, useState } from 'react'
import './App.css'
import API from './api' // Your custom axios instance
import PaymentButton from './components/PaymentButton' // The new component

function App() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    // Checking if the server is alive
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
      <h1>AutoMoX Dashboard</h1>
      
      <div className="card">
        <p>Backend Status: <strong>{message}</strong></p>
        
        {/* Horizontal line for visual separation */}
        <hr style={{ margin: '20px 0', borderColor: '#444' }} />

        <h3>Feature 8: Payment Gateway</h3>
        <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
          Test the SSLCommerz integration by clicking the button below.
        </p>

        {/* Passing dummy props for testing. 
            In the final version, these will come from your Car selection logic.
        */}
        <PaymentButton amount={1200} carId="660d1a2b3c4d5e6f7a8b9c0d" />
      </div>
    </div>
  )
}

export default App