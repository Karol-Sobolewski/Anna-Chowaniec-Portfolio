import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

// import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = () => {
  // const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useAuth0();
  // const { auth, SetAuth } = useContext(userContext);

  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      const timeOut = setTimeout(() => setAuth(true), 1);
      return () => clearTimeout(timeOut);
    }
  });

  useEffect(() => {});

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return auth ? <Redirect to="/" /> : null;
};

export { Component as Dashboard, Component as DashboardComponent };
