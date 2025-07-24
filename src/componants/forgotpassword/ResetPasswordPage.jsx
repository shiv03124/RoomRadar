import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../images/background.jpg'

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const email = sessionStorage.getItem('resetEmail');
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) {
      setMessage("Session expired. Please start the process again.");
      return;
    }

    const response = await fetch('https://roomradarbackend-api.onrender.com/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword: password })
    });

    const result = await response.text();
    if (response.ok) {
      setMessage(result);
      setTimeout(() => {
        sessionStorage.removeItem('resetEmail'); // Clean up after success
        navigate('/login');
      }, 1500);
    } else {
      setMessage(result || 'Failed to reset password. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage:  `url(${image})`}}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Password</h2>
        <div className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={handleReset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Reset Password
          </button>
          {message && (
            <p className={`text-center mt-4 ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;