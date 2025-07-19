import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [email, setEmail] = useState(sessionStorage.getItem('userEmail') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userEmail', email);
      setIsAuthenticated(true);
    } else {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userEmail');
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