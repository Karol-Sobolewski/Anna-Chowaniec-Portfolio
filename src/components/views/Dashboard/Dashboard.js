import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { Loader } from '../../common/Loader/Loader';

const Component = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      const timeOut = setTimeout(() => setAuth(true), 1);
      return () => clearTimeout(timeOut);
    }
  });

  useEffect(() => {});

  if (isLoading) {
    return <Loader />;
  }
  return auth ? <Redirect to="/" /> : null;
};

export { Component as Dashboard, Component as DashboardComponent };
