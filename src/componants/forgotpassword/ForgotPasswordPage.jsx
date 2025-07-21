import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../images/background.jpg'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://roomradarbackend-production.up.railway.app/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.text();

      if (response.ok) {
        sessionStorage.setItem('resetEmail', email);
        setMessage('OTP sent successfully! Redirecting...');
        setTimeout(() => navigate('/verify-otp'), 1500);
      } else {
        setError(result || 'Failed to send OTP.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${image})`,
         backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>

        {error && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded text-sm">
            {message}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleSendOtp}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Sending OTP...' : 'Send OTP'}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Remembered your password?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              Back to Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;