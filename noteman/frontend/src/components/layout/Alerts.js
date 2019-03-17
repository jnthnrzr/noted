import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static defaultProps = {
    alert: {},
    error: {},
    message: {},
  };

  static propTypes = {
    error: PropTypes.shape({
      msg: PropTypes.shape({
        body: PropTypes.arrayOf(PropTypes.string),
        title: PropTypes.arrayOf(PropTypes.string),
        username: PropTypes.arrayOf(PropTypes.string),
        password: PropTypes.arrayOf(PropTypes.string),
        non_field_errors: PropTypes.arrayOf(PropTypes.string),
      }),
      status: PropTypes.number,
    }),
    message: PropTypes.shape({
      deleteNote: PropTypes.func,
      addNote: PropTypes.func,
      passwordsNotMatch: PropTypes.func,
    }),
    alert: PropTypes.shape({
      error: PropTypes.func,
      success: PropTypes.func,
    }),
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;

    if (error !== prevProps.error) {
      if (error.msg.title) alert.error(`Title: ${error.msg.title.join()}`);
      if (error.msg.body) alert.error(`Body: ${error.msg.body.join()}`);
      if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
      if (error.msg.username) alert.error(`Username: ${error.msg.username.join()}`);
      if (error.msg.password) alert.error(`Password: ${error.msg.password.join()}`);
    }

    if (message !== prevProps.message) {
      if (message.deleteNote) alert.success(message.deleteNote);
      if (message.addNote) alert.success(message.addNote);
      if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errorsReducer,
  message: state.messagesReducer,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
