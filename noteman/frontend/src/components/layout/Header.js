import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

class Header extends Component {
  static defaultProps = {
    user: {},
    isAuthenticated: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string
    }),
    logoutUser: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user, logoutUser } = this.props;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.username}` : ""}</strong>
        </span>
        <li className="nav-item">
          <button
            type="button"
            onClick={logoutUser}
            className="nav-link btn btn-danger btn-md text-light"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-warning">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="/">
              Noted
            </a>
          </div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  // auth: state.authReducer,
  user: state.authReducer.user,
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { logout } from "../../actions/auth";
//
// export class Header extends Component {
//   static propTypes = {
//     auth: PropTypes.object.isRequired,
//     logout: PropTypes.func.isRequired
//   };
//
//   render() {
//     return (
//       <nav className="navbar navbar-expand-sm navbar-light bg-light">
//         <div className="container">
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarTogglerDemo01"
//             aria-controls="navbarTogglerDemo01"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//             <a className="navbar-brand" href="#">
//               Lead Managers
//             </a>
//           </div>
//           {isAuthenticated ? authLinks : guestLinks}
//         </div>
//       </nav>
//     );
//   }
// }
//
// const mapStateToProps = state => ({
//   auth: state.auth
// });
//
// export default connect(
//   mapStateToProps,
//   { logout }
// )(Header);

