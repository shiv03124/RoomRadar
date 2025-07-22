import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../images/background.jpg'
const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const email = sessionStorage.getItem('resetEmail');

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleVerify = async () => {
    const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });

    if (response.ok) {
      const data = await response.text();
      if (data === 'OTP verified.') {
        setMessage('OTP verified successfully.');
        sessionStorage.setItem('otp',otp)
        setTimeout(() => navigate('/reset-password'), 1500);
      } else {
        setMessage('Invalid OTP.');
      }
    } else {
      setMessage('Verification failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage:  `url(${image})`}}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Verify OTP</h2>
        <div className="space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Enter OTP" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={handleVerify}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Verify OTP
          </button>
          {message && (
            <p className={`text-center mt-4 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;