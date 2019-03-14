import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


import './App.css';

// NOTICE, there is no path for Navbar or Footer, this means they are rendered to the dom in EVERY path
// This is the same as having a base file and extending like in Django.
// Use this in the future, really important stuff 


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path = "/" component={Landing} />
            <div className="container">
              <Route exact path = "/register" component = {Register} />
              <Route exact path = "/login" component = {Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
