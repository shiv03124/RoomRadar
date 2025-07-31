import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AdminLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://roomradarbackend.onrender.com/auth/login/admin",
        formData
      );
      const data = response.data;

      if (!data.token) {
        throw new Error("No token received from server.");
      }

      toast.success("Admin login successful");

      // Save token, role, and email to sessionStorage
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", "admin");
      sessionStorage.setItem("email", formData.email); // Save email

      if (onLoginSuccess) {
        onLoginSuccess(data, "admin");
      }

      navigate("/admindashboard");
    } catch (err) {
      toast.error("Invalid admin credentials");
      console.error("Admin login error:", err);
    }
  };

  return (
    <div className="login-container pt-10">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
