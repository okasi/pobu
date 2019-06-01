import React from 'react';

import './App.css';
import './routes/auth/auth.css';

import { Router, Route, NavLink } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';

import { BrowserView, MobileView } from 'react-device-detect';

import {
  FaUserCircle,
  FaRegCalendarPlus,
  FaRegCalendarAlt,
  FaCalendarAlt,
} from 'react-icons/fa';

import history from './store/history';

import useGlobalism from './hooks/useGlobalism';
import { AppContext } from './store/context';

import Home from './routes/home/home';
import About from './routes/about';

import Login from './routes/auth/login';
import Register from './routes/auth/register';
import Profile from './routes/auth/profile';

import Overview from './routes/overview/overview';
import Bookable from './routes/bookable/bookable';
import Booking from './routes/booking/booking';

import logo from './assets/logod.png';

const App = () => {
  const store = useGlobalism();

  return (
    <Router history={history}>
      <div className="App">
        <AppContext.Provider value={store}>
          <div
            style={{
              color: 'black',
              height: '100%',
              width: '100%',
              marginLeft: 'auto',
            }}
          >
            <div className="nav">
              <div className="logo-cont">
                <NavLink exact to="/">
                  <img src={logo} className="logo" alt="logo" />
                </NavLink>
              </div>
              <BrowserView
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div className="nav-items">
                  <NavLink
                    exact
                    to="/"
                    className="navi"
                    activeClassName="nav-item-active"
                  >
                    <button type="button" className="nav-btns">
                      Home
                    </button>
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="navi"
                    activeClassName="nav-item-active"
                  >
                    <button type="button" className="nav-btns">
                      About
                    </button>
                  </NavLink>

                  {!store.state.isLoggedIn ? (
                    <>
                      <NavLink
                        to="/login"
                        className="navi"
                        activeClassName="nav-item-active"
                      >
                        <button type="button" className="nav-btns">
                          Login
                        </button>
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="navi"
                        activeClassName="nav-item-active"
                      >
                        <button type="button" className="nav-btns">
                          Register
                        </button>
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/overview"
                        className="navi"
                        activeClassName="nav-item-active"
                      >
                        <button type="button" className="nav-btns">
                          Overview
                        </button>
                      </NavLink>
                      <NavLink
                        to="/bookable"
                        className="navi"
                        activeClassName="nav-item-active"
                      >
                        <button type="button" className="nav-btns">
                          Bookable
                        </button>
                      </NavLink>
                      <NavLink
                        to="/profile"
                        className="navi"
                        activeClassName="nav-item-active"
                      >
                        <button type="button" className="nav-btns">
                          Profile
                        </button>
                      </NavLink>
                    </>
                  )}
                </div>
              </BrowserView>

              <MobileView
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div className="nav-items">
                  {/* <NavLink exact to="/" className="navi" activeClassName="nav-item-active"><button className="nav-btns">home</button></NavLink> */}
                  {!store.state.isLoggedIn ? (
                    <>
                      <NavLink
                        to="/about"
                        className="navi"
                        style={{ margin: 0 }}
                        activeClassName="nav-item-active"
                      >
                        <button type="button" className="nav-btns">About</button>
                      </NavLink>
                      <NavLink
                        to="/login"
                        className="navi"
                        style={{ margin: 0 }}
                        activeClassName="nav-item-active"
                      >
                        <button type="button" className="nav-btns">login</button>
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="navi"
                        style={{ margin: 0 }}
                        activeClassName="nav-item-active"
                      >
                        <button type="button" className="nav-btns">register</button>
                      </NavLink>
                    </>
                  ) : (
                    <>
                      {/*
                        <NavLink to="/overview" className="navi" style={{margin: 0}} activeClassName="nav-item-active"><button type="button" className="nav-btns"><FaCalendarAlt /></button></NavLink>
                        <NavLink to="/bookable" className="navi" style={{margin: 0}} activeClassName="nav-item-active"><button className="nav-btns"><FaRegCalendarPlus /></button></NavLink>
                      */}
                      <NavLink
                        to="/overview"
                        className="navi"
                        style={{ margin: 0 }}
                        activeClassName="nav-item-active"
                      >
                        <button type="button" className="nav-btns">
                          Overview
                        </button>
                      </NavLink>
                      <NavLink
                        to="/bookable"
                        className="navi"
                        style={{ margin: 0 }}
                        activeClassName="nav-item-active"
                      >
                        <button type="button" className="nav-btns">Bookables</button>
                      </NavLink>
                      <NavLink
                        to="/profile"
                        className="navi"
                        style={{ margin: 0 }}
                        activeClassName="nav-item-active"
                      >
                        <button type="button" className="nav-btns">
                          <FaUserCircle />
                        </button>
                      </NavLink>
                    </>
                  )}
                </div>
              </MobileView>
            </div>

            {/* Content */}
            {!store.state.isLoggedIn ? (
              <>
                <SwipeableRoutes enableMouseEvents>
                  <Route path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/booking/:id" component={Booking} />
                </SwipeableRoutes>
              </>
            ) : (
              <>
                <SwipeableRoutes enableMouseEvents>
                  <Route path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/overview" component={Overview} />
                  <Route path="/bookable" component={Bookable} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/booking/:id" component={Booking} />
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
