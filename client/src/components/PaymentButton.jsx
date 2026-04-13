import axios from 'axios';

const PaymentButton = ({ amount, carId }) => {
    const handlePayment = async () => {
        try {
            // This data should ideally come from your App state or Auth context
            const paymentData = {
                amount: amount || 1500,
                userId: "65f1a3b8e4b0a1a2b3c4d5e7", // Placeholder ID
                carId: carId || "660d1a2b3c4d5e6f7a8b9c0d", // Placeholder ID
                userName: "Hafiz",
                userEmail: "hafiz@example.com"
            };

            const response = await axios.post('http://localhost:5000/api/payment/init', paymentData);

            if (response.data?.url) {
                // This redirects the user away from your site to SSLCommerz
                window.location.replace(response.data.url);
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment failed to initialize. Is the server running?");
        }
    };

    return (
        <button 
            onClick={handlePayment}
            className="payment-btn"
            style={{
                backgroundColor: '#d946ef', // Kawaii pink/purple to match your style
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
            }}
        >
            Pay with SSLCommerz
        </button>
    );
};

export default PaymentButton;