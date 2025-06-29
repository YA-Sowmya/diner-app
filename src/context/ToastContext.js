// context/ToastContext.js
import React, { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success', duration = 800) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <div className={`custom-toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
