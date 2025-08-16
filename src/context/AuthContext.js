import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', email);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      setIsAuthenticated(false);
    }
  }, [token, email]);

  const login = (token, email) => {
    setToken(token);
    setEmail(email);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      email, 
      isAuthenticated,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);