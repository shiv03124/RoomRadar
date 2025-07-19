// src/utils/toastConfig.js

const baseStyle = {
  padding: '16px',
  border: '1px solid',
};

export const toastOptions = {
  loading: {
    style: {
      ...baseStyle,
      background: 'white',
      borderColor: '#3b82f6', // blue-500
      color: '#1e40af', // blue-800
    },
  },
  success: {
    style: {
      ...baseStyle,
      background: '#eff6ff', // blue-50
      borderColor: '#3b82f6', // blue-500
      color: '#1e40af', // blue-800
    },
    iconTheme: {
      primary: '#3b82f6',
      secondary: 'white',
    },
  },
  error: {
    style: {
      ...baseStyle,
      background: '#fef2f2', // red-50
      borderColor: '#ef4444', // red-500
      color: '#b91c1c', // red-800
    },
    iconTheme: {
      primary: '#ef4444',
      secondary: 'white',
    },
  },
};
