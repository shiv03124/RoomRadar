// // import { useState } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';

// // const Login = () => {
// //   const { login } = useAuth();
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isAdminLogin, setIsAdminLogin] = useState(false);
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setError('');

// //     try {
// //       const loginUrl = isAdminLogin
// //         ? 'https://localhost:8080/auth/login/admin'
// //         : 'https://localhost:8080/auth/login';

// //       const response = await fetch(loginUrl, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Login failed. Please check your credentials.');
// //       }

// //       const data = await response.json();

// //       if (!data.token) {
// //         throw new Error('No token received from server.');
// //       }

// //       login(data.token, email);
// //       sessionStorage.setItem('token', data.token);
// //       sessionStorage.setItem('email', email);
// //       sessionStorage.setItem('role', isAdminLogin ? 'admin' : 'user');

// //       if (isAdminLogin) {
// //         sessionStorage.setItem('authToken', data.token);
// //         sessionStorage.setItem('adminEmail', email);
// //       }

// //       navigate(isAdminLogin ? '/admindashboard' : '/dashboard');
// //     } catch (err) {
// //       setError(err.message || 'An error occurred during login');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
// //       <div className="w-full max-w-md mx-4">
// //         <div className="bg-white rounded-xl shadow-md overflow-hidden">
// //           <div className="p-6 sm:p-8">
// //             <div className="text-center mb-6">
// //               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Welcome back</h1>
// //               <p className="text-sm sm:text-base text-gray-600">Sign in to your account</p>
// //             </div>

// //             {error && (
// //               <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded">
// //                 <div className="flex items-start">
// //                   <div className="flex-shrink-0 pt-0.5">
// //                     <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// //                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// //                     </svg>
// //                   </div>
// //                   <div className="ml-2">
// //                     <p className="text-xs sm:text-sm text-red-700">{error}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Role Toggle - Stacked on small screens */}
// //             <div className="flex flex-col sm:flex-row sm:justify-center mb-4 sm:mb-6 gap-2 sm:gap-4">
// //               <button
// //                 type="button"
// //                 onClick={() => setIsAdminLogin(false)}
// //                 className={`px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg font-semibold ${!isAdminLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// //               >
// //                 User Login
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => setIsAdminLogin(true)}
// //                 className={`px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg font-semibold ${isAdminLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// //               >
// //                 Admin Login
// //               </button>
// //             </div>

// //             <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
// //               <div>
// //                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
// //                 <input
// //                   id="email"
// //                   type="email"
// //                   required
// //                   className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                   placeholder="you@example.com"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                 />
// //               </div>
// //               <div>
// //                 <div className="flex justify-between items-center mb-1">
// //                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
// //                   <Link to="/forgot-password" className="text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
// //                 </div>
// //                 <input
// //                   id="password"
// //                   type="password"
// //                   required
// //                   autoComplete="current-password"
// //                   className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                   placeholder="••••••••"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                 />
// //               </div>
// //               <div className="flex items-center">
// //                 <input id="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
// //                 <label htmlFor="remember-me" className="ml-2 block text-xs sm:text-sm text-gray-700">Remember me</label>
// //               </div>
// //               <button
// //                 type="submit"
// //                 disabled={isLoading}
// //                 className={`w-full flex justify-center items-center py-2 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
// //               >
// //                 {isLoading ? (
// //                   <>
// //                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                     </svg>
// //                     Signing in...
// //                   </>
// //                 ) : 'Sign in'}
// //               </button>
// //             </form>

// //             <div className="mt-4 sm:mt-6">
// //               <div className="relative">
// //                 <div className="absolute inset-0 flex items-center">
// //                   <div className="w-full border-t border-gray-300"></div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 rounded-b-xl text-center">
// //             <p className="text-xs sm:text-sm text-gray-600">
// //               Don't have an account?{' '}
// //               <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAdminLogin, setIsAdminLogin] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const loginUrl = isAdminLogin
//         ? 'https://localhost:8080/auth/login/admin'
//         : 'https://localhost:8080/auth/login';

//       const response = await fetch(loginUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed. Please check your credentials.');
//       }

//       const data = await response.json();

//       if (!data.token) {
//         throw new Error('No token received from server.');
//       }

//       login(data.token, email);
//       sessionStorage.setItem('token', data.token);
//       sessionStorage.setItem('email', email);
//       sessionStorage.setItem('role', isAdminLogin ? 'admin' : 'user');

//       if (isAdminLogin) {
//         sessionStorage.setItem('authToken', data.token);
//         sessionStorage.setItem('adminEmail', email);
//       }

//       navigate(isAdminLogin ? '/admindashboard' : '/dashboard');
//     } catch (err) {
//       setError(err.message || 'An error occurred during login');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md mx-4">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="p-6 sm:p-8">
//             <div className="text-center mb-6">
//               <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back</h1>
//               <p className="text-sm text-gray-600">Sign in to your account</p>
//             </div>

//             {error && (
//               <div className="mb-4 bg-red-100 border-l-4 border-red-500 p-3 rounded">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             )}

//             <div className="flex flex-col sm:flex-row sm:justify-center mb-6 gap-2 sm:gap-4">
//               <button
//                 type="button"
//                 onClick={() => setIsAdminLogin(false)}
//                 className={`px-4 py-2 rounded-lg font-semibold text-sm ${!isAdminLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//               >
//                 User Login
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsAdminLogin(true)}
//                 className={`px-4 py-2 rounded-lg font-semibold text-sm ${isAdminLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//               >
//                 Admin Login
//               </button>
//             </div>

//             <form className="space-y-5" onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
//                 <input
//                   id="email"
//                   type="email"
//                   required
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//                   placeholder="you@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                   <Link to="/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
//                     Forgot password?
//                   </Link>
//                 </div>
//                 <input
//                   id="password"
//                   type="password"
//                   required
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>

//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`w-full flex justify-center items-center px-4 py-2 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Signing in...
//                   </>
//                 ) : 'Sign in'}
//               </button>
//             </form>
//           </div>

//           <div className="bg-gray-50 px-6 py-4 rounded-b-xl text-center">
//             <p className="text-sm text-gray-600">
//               Don’t have an account?{' '}
//               <Link to="/signup" className="text-indigo-600 font-medium hover:text-indigo-500">Sign up</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import image from '../componants/images/background.jpg'

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const loginUrl = isAdminLogin
        ? 'https://localhost:8080/auth/login/admin'
        : 'https://localhost:8080/auth/login';

      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();

      if (!data.token) {
        throw new Error('No token received from server.');
      }

      login(data.token, email);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('role', isAdminLogin ? 'admin' : 'user');

      if (isAdminLogin) {
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('adminEmail', email);
      }

      navigate(isAdminLogin ? '/admindashboard' : '/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat" 
         style={{ backgroundImage:  `url(${image})`}}>
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div className="flex justify-center space-x-4 mb-6">
              <button
                type="button"
                onClick={() => setIsAdminLogin(false)}
                className={`px-5 py-2 rounded-lg font-medium transition-colors ${!isAdminLogin ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                User Login
              </button>
              <button
                type="button"
                onClick={() => setIsAdminLogin(true)}
                className={`px-5 py-2 rounded-lg font-medium transition-colors ${isAdminLogin ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Admin Login
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center px-4 py-3 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </form>
          </div>

          <div className="bg-gray-50 bg-opacity-70 px-6 py-5 rounded-b-xl text-center border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
