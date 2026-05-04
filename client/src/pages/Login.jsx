import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);

    const handleSend = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/send-otp', { email });
            setStep(2);
            // REMOVED setEmail(''); <--- This was causing your "Invalid" error
            alert("OTP sent! Check your inbox.");
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Check your backend terminal"));
        }
    };

    const handleVerify = async () => {
        try {
            // Now 'email' is still "your@mail.com" and 'otp' is "123456"
            const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
            alert("Success! Redirecting...");
            localStorage.setItem('userEmail', email);
            window.location.href = '/';
        } catch (err) {
            alert("Still failing: " + (err.response?.data?.message || "Check Console"));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>AutoMoX Login</h2>
                <p style={styles.subtitle}>
                    {step === 1 ? "Enter email to receive OTP" : `Enter code sent for ${email}`}
                </p>

                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder={step === 1 ? "Email Address" : "Enter 6-Digit Code"}
                        style={styles.input}
                        // Added value and logic to keep the box clean for the OTP
                        value={step === 1 ? email : otp} 
                        onChange={(e) => {
                            if (step === 1) setEmail(e.target.value);
                            else setOtp(e.target.value);
                        }}
                    />
                    <button
                        onClick={step === 1 ? handleSend : handleVerify}
                        style={styles.button}
                    >
                        {step === 1 ? "Request OTP" : "Verify & Login"}
                    </button>
                    {step === 2 && (
                        <button onClick={() => setStep(1)} style={{background: 'none', border: 'none', color: 'blue', cursor: 'pointer'}}>
                            Change Email
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};



const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f7f6',
    },
    card: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '10px',
        color: '#333',
    },
    subtitle: {
        color: '#666',
        marginBottom: '30px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        fontSize: '1rem',
    },
    button: {
        padding: '12px',
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
    }
};

// ... keep your styles exactly as they are ...

export default Login;