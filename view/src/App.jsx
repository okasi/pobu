import React, { useState, useEffect } from 'react';

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

import logo from './assets/logod.png';

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
      <div className="App">
        <AppContext.Provider value={store}>
          <div
            style={{
              color: 'black', height: '100%', width: '100%', marginLeft: 'auto',
            }}
          >
            <div className="nav">
              <div className="logo-cont">
                <img src={logo} className="logo" />
              </div>
              <div className="nav-items">
                <NavLink exact to="/" className="navi" activeClassName="nav-item-active"><button className="nav-btns">home</button></NavLink>
                <NavLink to="/about" className="navi" activeClassName="nav-item-active"><button className="nav-btns">About</button></NavLink>

                {!store.state.isLoggedin
                  ? (
                    <>
                      <NavLink to="/login" className="navi" activeClassName="nav-item-active"><button className="nav-btns">login</button></NavLink>
                      <NavLink to="/register" className="navi" activeClassName="nav-item-active"><button className="nav-btns">register</button></NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink to="/overview" activeClassName="nav-item-active"><button className="nav-btns">Overview</button></NavLink>
                      <NavLink to="/profile" activeClassName="nav-item-active"><button className="nav-btns">Profile</button></NavLink>
                    </>
                  )}
              </div>
            </div>


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
          </div>

        </AppContext.Provider>

      </div>
    </Router>
  );
};

export default App;
