import React, { Component, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";

import useGlobalState from './hooks/useGlobalState.js.js'
import { AppContext } from './store/context'

import Home from "./routes/home";
import About from "./routes/about";
import Login from "./routes/login";
import Register from "./routes/register";
import Overview from "./routes/overview";
import Profile from "./routes/profile";

import { AppBar, Tabs, Tab } from '@material-ui/core';


// const OtherColorView = ({ match }) => (
//   <div style={{ height: 300, backgroundColor: match.params.color }}>
//     {match.params.color}
//   </div>
// );

const App = () => {
  const store = useGlobalState()

  const [index, setIndex] = useState(0);

  const handleChange = (event, value) => {
    setIndex(value);
  };

  return (

    <Router>
      <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <AppContext.Provider value={store}>

          {/* Navbar */} 
          {/* Needs a bug fix because when wrapping Tab in Link it makes the selected indicator not work */}
          <Tabs 
            value={index} 
            variant="fullWidth" 
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
          >
            <Link to="/"><Tab label="Home" /></Link>
            <Link to="/about"><Tab label="About" /></Link>
            {!store.state.isLoggedin
              ? (
                <>
                  <Link to="/login"><Tab label="Login" /></Link>
                  <Link to="/register"><Tab label="Register" /></Link>
                </>
              ) : (
                <>
                  <Link to="/overview"><Tab label="Overview" /></Link>
                  <Link to="/profile"><Tab label="Profile" /></Link>
                </>
              )}
          </Tabs>

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