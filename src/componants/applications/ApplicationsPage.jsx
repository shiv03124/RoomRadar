import React, { useState, useEffect } from 'react';
import { fetchUserApplications } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Or get from context/state

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserApplications(userId);
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Applications</h1>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
      </div>

    </div>
  );
};

export default ApplicationsPage;