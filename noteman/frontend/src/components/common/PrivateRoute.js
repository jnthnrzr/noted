import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isLoading) {
        return <h2>Loading...</h2>;
      } else if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }),
};

PrivateRoute.defaultProps = {
  auth: {},
};

const mapStateToProps = state => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(PrivateRoute);
