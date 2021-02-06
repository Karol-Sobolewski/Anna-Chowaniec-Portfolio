import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
// import { Loading } from '../components/index';

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => `loading`,
    })}
    {...args} // eslint-disable-line
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.node,
};

export default ProtectedRoute;
