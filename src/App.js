import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './componants/Home';
import Login from './componants/Login';
import Signup from './componants/Signup';
import Dashboard from './componants/pages/Dashboard';
import AdminDashboard from './componants/pages/AdminDashboard';
import ProfilePage from './componants/profile/UserProfile';
import Header from './componants/layout/Header';
import { Toaster } from 'react-hot-toast';
import { fetchUserProfile } from './componants/utils/fetchUserProfile';
import Footer from './componants/layout/Footer';
import RoomDetailsPage from './componants/rooms/RoomDetailsPage';
import AboutUs from './componants/pages/AboutUs';
import ForgotPasswordPage from './componants/forgotpassword/ForgotPasswordPage';
import VerifyOtpPage from './componants/forgotpassword/VerifyOtpPage';
import ResetPasswordPage from './componants/forgotpassword/ResetPasswordPage';
import ListingsPage from './componants/rooms/ListingsPage';
import AdminLogin from './componants/AdminLogin';

function ProtectedRoute({ children, allowedRoles }) {
  const role = sessionStorage.getItem("role");
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    const role = sessionStorage.getItem("role");

    if (token && email && role !== "admin") {
      fetchUserProfile(token)
        .then(data => {
          if (data) {
            setUserData({ ...data, token });
          } else {
            console.warn("User data is null, possibly due to invalid email/token.");
          }
        })
        .catch(err => {
          console.error("Auto-login fetch failed:", err);
        });
    }
  }, []);

  const handleLoginSuccess = async (data, role) => {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("role", role);

    if (role === "admin") {
      setUserData({ email: data.email, role, token: data.token });
      navigate("/admindashboard");
    } else {
      try {
        const fullProfile = await fetchUserProfile(data.token);
        const updatedUserData = { ...fullProfile, token: data.token };
        setUserData(updatedUserData);
        navigate("/dashboard");
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    }
  };

  const hideHeaderOnRoutes = ["/", "/login", "/signup"];
  const shouldShowHeader = !hideHeaderOnRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#363636', color: '#fff' },
        }}
      />

      {shouldShowHeader && (
        <Header
          userData={userData}
          setUserData={setUserData}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/login" element={
          <Login
            onLoginSuccess={handleLoginSuccess}
            userData={userData}
          />
        } />
        <Route path="/adminlogin" element={
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            userData={userData}
          />
        } />
        <Route path="/dashboard" element={<Dashboard userData={userData} />} />
        <Route path="/admindashboard" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard userData={userData} />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={["user"]}>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/room/:roomId" element={<RoomDetailsPage />} />
        <Route path="/listings/:type" element={
          <ProtectedRoute allowedRoles={["user"]}>
            <ListingsPage />
          </ProtectedRoute>
        } />
      </Routes>

      {/* Optional: <Footer /> */}
    </div>
  );
}

export default App;
