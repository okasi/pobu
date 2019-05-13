import React, { useState, useEffect } from 'react';
// import logo from "./logo.svg";
import './App.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';

import useGlobalState from './hooks/useGlobalState';

import { AppContext } from './store/context';

import Home from './routes/home';
import About from './routes/about';
import Login from './routes/login';
import Register from './routes/register';
import Overview from './routes/overview';
import Profile from './routes/profile';

import { setToken, getValidToken } from './services/auth';

// const OtherColorView = ({ match }) => (
//   <div style={{ height: 300, backgroundColor: match.params.color }}>
//     {match.params.color}
//   </div>
// );

const App = () => {
  const store = useGlobalState();

  useEffect(() => {
    setToken(getValidToken());
    console.log('useeffect has been run');
  }, []);


  return (

    <Router>
      <div
        className="App"
        style={{
          backgroundColor: '#d8d8d8',
        }}
      >

        <AppContext.Provider value={store}>

          {/* Navbar */}

          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>

          {!store.state.isLoggedin
            ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/overview">Overview</NavLink>
                <NavLink to="/profile">Profile</NavLink>
              </>
            )}


          {/* Content */}
          {!store.state.isLoggedin
            ? (
              <>
                <SwipeableRoutes enableMouseEvents>
                  <Route path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                </SwipeableRoutes>
              </>
            ) : (
              <>
                <SwipeableRoutes enableMouseEvents>
                  <Route path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/overview" component={Overview} />
                  <Route path="/profile" component={Profile} />
                  {/* <Route path="/booking/:id" component={booking} defaultParams={{ color: "grey" }} /> */}
                </SwipeableRoutes>
              </>
            )}

        </AppContext.Provider>
      </div>
    </Router>
  );
};

export default App;
