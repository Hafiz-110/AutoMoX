import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      // Logic to save to DB can be added later, for now, we just show success!
      console.log("Newsletter Subscription for:", email);
    }
  };

  return (
    <footer style={{ 
      padding: '40px 20px', 
      marginTop: '50px', 
      textAlign: 'center', 
      backgroundColor: '#1a1a1a', 
      color: 'white',
      borderTop: '2px solid #333'
    }}>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Join the AutoMoX Club</h3>
        <p style={{ color: '#aaa', marginBottom: '20px' }}>Get exclusive price drop alerts and new inventory updates.</p>
        
        {subscribed ? (
          <div style={{ padding: '10px', backgroundColor: '#2e7d32', borderRadius: '5px', display: 'inline-block' }}>
            Thanks for subscribing! Check your inbox soon. 📧
          </div>
        ) : (
          <form onSubmit={handleSubscribe} style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{ 
                padding: '10px', 
                borderRadius: '5px', 
                border: 'none', 
                width: '250px' 
              }}
            />
            <button 
              type="submit" 
              style={{ 
                padding: '10px 20px', 
                borderRadius: '5px', 
                border: 'none', 
                backgroundColor: '#007bff', 
                color: 'white', 
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>

      <div style={{ borderTop: '1px solid #333', paddingTop: '20px', fontSize: '14px', color: '#777' }}>
        <p style={{ marginBottom: '5px' }}>📍 123 Luxury Drive, Auto City | 📞 +1 (555) 123-4567</p>
        <p>&copy; 2026 AutoMoX - Premium Next-Gen Dealership</p>
      </div>
    </footer>
  );
};

export default Footer;