// src/context/LogoutContext.tsx
import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import type { NavigateFunction } from 'react-router-dom';

type LogoutContextType = {
  handleLogout: () => void;
};

const LogoutContext = createContext<LogoutContextType | undefined>(undefined);

export const LogoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    let timerInterval: ReturnType<typeof setInterval>;

    Swal.fire({
      title: 'Signing out...',
      html: 'Redirecting in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer()?.querySelector('b');
        timerInterval = setInterval(() => {
          if (b) b.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        navigate('/');
      }
    });
  };

  return (
    <LogoutContext.Provider value={{ handleLogout }}>
      {children}
    </LogoutContext.Provider>
  );
};

export const useLogout = (): LogoutContextType => {
  const context = useContext(LogoutContext);
  if (!context) throw new Error('useLogout must be used within a LogoutProvider');
  return context;
};
