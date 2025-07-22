import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'; // This works for decoding Google token
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Assuming you have a custom hook

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;

      // Decode the token to extract email
      const decoded = jwtDecode(googleToken);
      const email = decoded.email;

      const response = await fetch(
        `https://localhost:8080/auth/auth/google?email=${encodeURIComponent(email)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: googleToken }),
        }
      );

      if (!response.ok) {
        throw new Error('Google login failed');
      }

      const data = await response.json();

      // Save token and email in session
      sessionStorage.setItem('token', data.token);
      login(data.token, data.email);

      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error.message);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => console.log('Google Login Failed')}
    />
  );
};

export default GoogleLoginButton;
