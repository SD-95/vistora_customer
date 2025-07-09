import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();

  const isWelcome = location.pathname === '/';

  return (
    <React.Fragment>
      <div className={`welcome-wrapper new-design ${isWelcome ? '' : 'auth-page'}`}>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default Auth;
