import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  static defaultProps = {
    isAuthenticated: null,
  };

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { loginUser } = this.props;
    loginUser(username, password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p>
              {"Don't have an account? "}
              <Link to="/register">Register</Link>
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
  { loginUser }
)(Login);
