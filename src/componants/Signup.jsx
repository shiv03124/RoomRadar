import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import signupimage from './images/singupimage.jpg';
import logo from './images/logoimage.png';
import { ErrorToast } from './Toster/ToastMessages';
import toast from 'react-hot-toast';

import {
  FiSmile,
  FiMoon,
  FiSun,
} from 'react-icons/fi';
import {
  MdSmokingRooms,
  MdOutlinePets,
  MdOutlineCleaningServices,
  MdNoMeals,
  MdRestaurant,
  MdSmokeFree,
} from 'react-icons/md';

const Signup = () => {
  const [stage, setStage] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    phone: '',
    gender: 'MALE',
    dateOfBirth: '',
    address: '',
    currentCity: '',
  });
  const [preferences, setPreferences] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [margin, setMargin] = useState(true);
  const navigate = useNavigate();
const [citySearch, setCitySearch] = useState('');
const [showSuggestions, setShowSuggestions] = useState(false);
  const [cities, setCities] = useState([]);

  const preferenceOptions = [
    { label: "Vegetarian", icon: <MdNoMeals /> },
    { label: "Non-Vegetarian", icon: <MdRestaurant /> },
    { label: "Early Riser", icon: <FiSun /> },
    { label: "Night Owl", icon: <FiMoon /> },
    { label: "Non-Smoker", icon: <MdSmokeFree /> },
    { label: "Smoker", icon: <MdSmokingRooms /> },
    { label: "Pet Friendly", icon: <MdOutlinePets /> },
    { label: "Cleanliness", icon: <MdOutlineCleaningServices /> }
  ];

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India" })
        });
        const data = await res.json();
        if (data.data) {
          setCities(data.data.sort());
        }
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };

    fetchCities();
  }, []);

  const sendOtp = async () => {
    if (!email) return setError('Email is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Please enter a valid email');

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://roomradarbackend.onrender.com/api/otp/send?email=${encodeURIComponent(email)}`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to send OTP');
      setStage('otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return setError('OTP is required');
    if (!/^\d{6}$/.test(otp)) return setError('OTP must be 6 digits');

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://roomradarbackend.onrender.com/api/otp/verify?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Invalid OTP');
      setStage('form');
      setMargin(0);
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.password) {
      toast.custom((t) => <ErrorToast message="Full name and password are required" t={t} />);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const emailRes = await fetch(`https://roomradarbackend.onrender.com/api/users/check-email?email=${encodeURIComponent(email)}`);
      if ((await emailRes.text()) === 'exists') {
        toast.custom((t) => <ErrorToast message="Email is already registered" t={t} />);
        return;
      }

      if (formData.phone) {
        const phoneRes = await fetch(`https://roomradarbackend.onrender.com/api/users/check-phone?phone=${encodeURIComponent(formData.phone)}`);
        if ((await phoneRes.text()) === 'exists') {
          toast.custom((t) => <ErrorToast message="Phone number is already registered" t={t} />);
          return;
        }
      }

      const userDTO = {
        ...formData,
        email,
        preferences,
        dateOfBirth: formData.dateOfBirth || null,
      };

      const formPayload = new FormData();
      formPayload.append('userDTO', new Blob([JSON.stringify(userDTO)], { type: 'application/json' }));
      if (profileImage) {
        formPayload.append('image', profileImage);
      }

      const res = await fetch('https://roomradarbackend.onrender.com/api/users/saveUser', {
        method: 'POST',
        body: formPayload,
      });

      if (!res.ok) {
        const contentType = res.headers.get('content-type');
        let errorMessage = 'Signup failed';

        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await res.text();
        }

        throw new Error(errorMessage);
      }

      navigate('/login', { state: { signupSuccess: true } });

    } catch (err) {
      toast.custom((t) => <ErrorToast message={err.message || 'Signup failed. Please try again.'} t={t} />);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {stage !== 'form' && (
        <div className="hidden md:flex md:w-1/2 h-full">
          <img src={signupimage} alt="Community" className="w-full h-full object-cover" />
        </div>
      )}   

      <div className={`flex flex-col w-full ${margin ? 'mt-14 md:mt-8' : 'mt-0'} ${stage !== 'form' ? 'md:w-1/2' : 'md:w-full'} h-screen overflow-y-auto p-4 md:p-8 relative`}>
  {/* Logo - positioned differently on mobile vs desktop */}
        
        <div className="md:absolute md:right-8 md:top-8 flex justify-end mb-4 md:mb-0">
          <div
            onClick={() => navigate('/  ')}
            className="cursor-pointer w-32 sm:w-40 transition-transform hover:scale-105"
          >
            <img
              src={logo}
              alt="RoomRadar Logo"
              className="w-full object-contain"
            />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Find Your Perfect Roommate</h1>
        <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">Create an account to browse through hundreds of rooms</p>
        
        {stage === 'email' && (
          <div className="space-y-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 disabled:opacity-70"
            >
              {loading ? "Sending OTP..." : "Continue with Email"}
            </button>

            <p className="text-sm text-gray-600 text-center">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        )}

        {stage === 'otp' && (
          <div className="space-y-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
            <input
              type="text"
              id="otp"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
              maxLength="6"
            />
            <p className="text-sm text-gray-500 mt-1">We sent a code to <span className="font-medium">{email}</span></p>
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  setStage('email');
                  setError('');
                }}
                className="text-blue-600 hover:underline text-sm font-medium"
              >Back to email</button>
              <button
                onClick={verifyOtp}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 disabled:opacity-70"
              >{loading ? 'Verifying...' : 'Verify'}</button>
            </div>
          </div>
        )}

        {stage === 'form' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Complete Your Profile</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  minLength="6"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone no <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => {
                    const phone = e.target.value;
                    // Allow only numbers
                    if (/^\d{0,10}$/.test(phone)) {
                      setFormData({ ...formData, phone });
                    }
                  }}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  placeholder="Enter 10-digit phone number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formData.phone.length > 0 && formData.phone.length !== 10 && (
                  <p className="text-red-500 text-sm mt-1">Phone number must be 10 digits</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {['MALE', 'FEMALE'].map((genderOption) => (
                    <button
                      key={genderOption}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: genderOption })}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                        formData.gender === genderOption
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {genderOption.charAt(0) + genderOption.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-0">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="relative mt-0">
  <label htmlFor="currentCity" className="block text-sm font-medium text-gray-700 mb-1">
    Current City
  </label>
  <input
    type="text"
    id="currentCity"
    value={citySearch}
    onChange={(e) => {
      const value = e.target.value;
      setCitySearch(value);
      setShowSuggestions(true);
      setFormData({ ...formData, currentCity: '' }); // reset selected
    }}
    placeholder="Type to search cities..."
    autoComplete="off"
    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
  {showSuggestions && citySearch && (
    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto shadow-md">
      {cities
        .filter((city) =>
          city.toLowerCase().includes(citySearch.toLowerCase())
        )
        .slice(0, 10)
        .map((city, index) => (
          <li
            key={index}
            onClick={() => {
              setCitySearch(city);
              setFormData({ ...formData, currentCity: city });
              setShowSuggestions(false);
            }}
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
          >
            {city}
          </li>
        ))}
      {cities.filter((city) =>
        city.toLowerCase().includes(citySearch.toLowerCase())
      ).length === 0 && (
        <li className="px-4 py-2 text-gray-500">No cities found</li>
      )}
    </ul>
  )}
</div>
🧠


              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferences</label>
                <div className="flex flex-wrap gap-2">
                  {preferenceOptions.map((pref) => {
                    const isSelected = preferences.includes(pref.label);
                    return (
                      <button
                        key={pref.label}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setPreferences(preferences.filter(p => p !== pref.label));
                          } else {
                            setPreferences([...preferences, pref.label]);
                          }
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-all
                          ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50'}`}
                      >
                        <span className="text-lg">{pref.icon}</span>
                        <span>{pref.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setProfileImage(file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setPreviewImage(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {previewImage && (
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-200" 
                  />
                )}
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : 'Complete Sign Up'}
              </button>
            </div>

            <p className="text-xs md:text-sm text-gray-600 text-center pt-2">
              By signing up, you agree to our <a href="/" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;