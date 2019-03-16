import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import Header from './layout/Header';
import Dashboard from './notes/Dashboard';
import store from '../store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <Dashboard />
        </Fragment>
      </Provider>
    );
  }
}

export default App;
