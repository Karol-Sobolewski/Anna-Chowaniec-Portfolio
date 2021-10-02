import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import { Loader } from '../components/common/Loader/Loader';

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loader />, // eslint-disable-line react/display-name
    })}
    {...args} // eslint-disable-line react/jsx-props-no-spreading
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.node,
};

export default ProtectedRoute;
