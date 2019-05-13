import React, { useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Link, } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";

import useGlobalState from './hooks/useGlobalState.js'
import { AppContext } from './store/context'

import Home from "./routes/home";
import About from "./routes/about";
import Login from "./routes/login";
import Register from "./routes/register";
import Overview from "./routes/overview";
import Profile from "./routes/profile";

import logo from "./assets/logod.png";


const App = () => {
  const store = useGlobalState()

  const [index, setIndex] = useState(0);

  const handleChange = (event, value) => {
    setIndex(value);
  };
 
  return (

    <Router>
      <div className="App">
        <AppContext.Provider  style={{ height: '100%'}} value={store}>
          <div 
            style={{ color:'black', width: '100%', marginLeft: 'auto'}}
            value={index} 
            variant="fullWidth" 
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
          >

          <div className="nav">
            <div className="logo-cont">
              <img src={logo} className="logo" />
            </div>
            <div className="nav-items">
              <Link to="/" style={{ textDecoration: 'none'}}><button className="nav-btns">home</button></Link>
              <Link to="/about" style={{ textDecoration: 'none'}}><button className="nav-btns">About</button></Link>
      
              {!store.state.isLoggedin
                ? (
                  <>
                    <Link to="/login" style={{ textDecoration: 'none'}}><button className="nav-btns">login</button></Link>
                    <Link to="/register"style={{ textDecoration: 'none'}}><button className="nav-btns">register</button></Link>
                  </>
                ) : (
                  <>
                    <Link to="/overview"><button className="nav-btns">Overview</button></Link>
                    <Link to="/profile"><button className="nav-btns">Profile</button></Link>
                  </>
                )}
              </div>
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

        </AppContext.Provider>
      </div>
    </Router>
  );
}

export default App;