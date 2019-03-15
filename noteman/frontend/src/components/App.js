import React, { Component, Fragment } from 'react';
import Header from './layout/Header';
import Dashboard from './notes/Dashboard';

class App extends Component {
  render() {
    return (
        <Fragment>
          <Header />
          <Dashboard />
        </Fragment>
    );
  }
}

export default App;
