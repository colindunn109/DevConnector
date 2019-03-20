import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import { logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import PrivateRoute from './components/common/PrivateRoute';
import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';




import './App.css';

// Check for token
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decodedToken = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decodedToken));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decodedToken.exp < currentTime) {
    store.dispatch(logoutUser());

    store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = '/login';
  }
}

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

            {/* Routes */}
            <div className="container"> 
              <Route exact path = "/register" component = {Register} />
              <Route exact path = "/login" component = {Login} />
              <Switch>
                <PrivateRoute exact path = "/dashboard" component = {Dashboard} />
                <PrivateRoute exact path = "/createprofile" component = {CreateProfile} />
                <PrivateRoute exact path = "/editprofile" component = {EditProfile} />
              </Switch>
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
