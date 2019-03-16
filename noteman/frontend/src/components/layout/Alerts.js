import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    alert: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const { alert } = this.props;
    // console.log(alert);
    alert.show('It works');
  }

  render() {
    return <Fragment />;
  }
}

export default withAlert()(Alerts);
