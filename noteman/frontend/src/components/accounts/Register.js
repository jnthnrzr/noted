import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import { createMessage } from "../../actions/messagesActions";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  static defaultProps = {
    isAuthenticated: false,
  };

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    const { createMessage, registerUser } = this.props;
    if (password !== password2) {
      createMessage({ passwordsNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        username,
        password,
        email
      };
      registerUser(newUser);
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                className="form-control"
                type="password"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              {"Already have an account? "}
              <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  { registerUser, createMessage }
)(Register);
