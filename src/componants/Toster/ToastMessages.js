import React from 'react';
import './ToastMessages.css';
import toast from 'react-hot-toast';

// Common Close Button Component
export const CloseButton = ({ onClose }) => (
  <button
    onClick={onClose}
    className="ml-4 text-gray-700 hover:text-gray-500 focus:outline-none"
    aria-label="Close toast"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </button>
);

export const LoadingToast = ({ message, t }) => (
  <div className="toast-message flex items-center justify-between w-full">
    <div className="flex items-center space-x-2">
      <svg
        className="animate-spin h-5 w-5 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span>{message}</span>
    </div>
    {t && <CloseButton onClose={() => toast.dismiss(t.id)} />}
  </div>
);

export const SuccessToast = ({ message, t }) => (
  <div className="toast-message w-full sm:w-[20%] bg-green-100 p-4 rounded-lg flex items-center justify-between shadow-lg">
    <div className="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm text-green-900 font-medium">{message}</span>
    </div>
    {t && <CloseButton onClose={() => toast.dismiss(t.id)} />}
  </div>
);

export const WaitingToast = ({ message = "Please wait...", t }) => (
  <div className="toast-message bg-yellow-100 text-yellow-800 flex items-center justify-between w-full sm:w-[20%] p-4 rounded-lg shadow-md">
    <div className="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-yellow-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
      <span className="text-sm font-medium">{message}</span>
    </div>
    {t && <CloseButton onClose={() => toast.dismiss(t.id)} />}
  </div>
);



export const ErrorToast = ({ message, t }) => (
  <div className="toast-message bg-red-100 flex items-center justify-between w-full max-w-sm p-3 rounded shadow
                  sm:w-1/5 sm:max-w-none">
    <div className="flex items-center space-x-2 flex-1 min-w-0">
      <span className="text-red-800 font-medium text-sm sm:text-base truncate">{message}</span>
    </div>
    {t && (
      <div className="ml-3 flex-shrink-0">
        <CloseButton onClose={() => toast.dismiss(t.id)} />
      </div>
    )}
  </div>
);


export const LoginToApplyToast = ({ message, onLoginClick, t }) => (
  <div className="toast-message flex items-center justify-between w-full">
    <div className="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      <div className="flex flex-col">
        <span>{message || "You need to login to apply"}</span>
        <button 
          onClick={onLoginClick}
          className="text-blue-500 hover:text-blue-700 text-sm font-medium mt-1 self-start"
        >
          Click here to login
        </button>
      </div>
    </div>
    {t && <CloseButton onClose={() => toast.dismiss(t.id)} />}
  </div>
);