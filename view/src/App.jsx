import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';

import useGlobalState from './hooks/useGlobalStore';
import { AppContext } from './store/context';

import Home from './routes/home';
import About from './routes/about';
import Login from './routes/login';
import Register from './routes/register';
import Overview from './routes/overview';
import Profile from './routes/profile';

import logo from './assets/logod.png';

// const OtherColorView = ({ match }) => (
//   <div style={{ height: 300, backgroundColor: match.params.color }}>
//     {match.params.color}
//   </div>
// );

const App = () => {
  const store = useGlobalState();

  return (
    <Router>
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
                <img src={logo} className="logo" alt="logo" />
              </div>
              <div className="nav-items">
                <NavLink exact to="/" style={{ textDecoration: 'none' }} activeClassName="nav-item-active"><button type="button" className="nav-btns">home</button></NavLink>
                <NavLink to="/about" style={{ textDecoration: 'none' }} activeClassName="nav-item-active"><button type="button" className="nav-btns">About</button></NavLink>

                {!store.state.isLoggedIn
                  ? (
                    <>
                      <NavLink to="/login" style={{ textDecoration: 'none' }} activeClassName="nav-item-active"><button type="button" className="nav-btns">login</button></NavLink>
                      <NavLink to="/register" style={{ textDecoration: 'none' }} activeClassName="nav-item-active"><button type="button" className="nav-btns">register</button></NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink to="/overview" activeClassName="nav-item-active"><button type="button" className="nav-btns">Overview</button></NavLink>
                      <NavLink to="/profile" activeClassName="nav-item-active"><button type="button" className="nav-btns">Profile</button></NavLink>
                    </>
                  )}
              </div>
            </div>


            {/* Content */}
            {!store.state.isLoggedIn
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
