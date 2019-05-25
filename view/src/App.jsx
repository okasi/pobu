import React from 'react';

import './App.css';
import './Home.css';
import './datepick.css';
import './Overview.css';
import './Bookable.css';
import './Auth.css';
import './Profile.css';
import './Booking.css';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';

import history from './store/history';

import useGlobalState from './hooks/useGlobalism';
import { AppContext } from './store/context';

import Home from './routes/home';
import About from './routes/about';
import Login from './routes/login';
import Register from './routes/register';
import Overview from './routes/overview';
import Bookable from './routes/bookable';
import Booking from'./routes/booking';
import Profile from './routes/profile';

import logo from './assets/logod.png';

import { BrowserView, MobileView} from "react-device-detect";
import { FaUserCircle, FaRegCalendarPlus,FaRegCalendarAlt, FaCalendarAlt} from 'react-icons/fa'

const App = () => {

  const store = useGlobalState();

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
                  <img src={logo} className="logo" alt="logo"/>
                </NavLink>
              </div>
              <BrowserView style={{display: 'flex', flexDirection:'column', justifyContent:'center'}}>
                <div className="nav-items">
                  <NavLink exact to="/" className="navi" activeClassName="nav-item-active"><button className="nav-btns">home</button></NavLink>
                  <NavLink to="/about" className="navi" activeClassName="nav-item-active"><button className="nav-btns">About</button></NavLink>

                  {!store.state.isLoggedIn
                    ? (
                    <>
                      <NavLink to="/login" className="navi" activeClassName="nav-item-active"><button className="nav-btns">login</button></NavLink>
                      <NavLink to="/register" className="navi" activeClassName="nav-item-active"><button className="nav-btns">register</button></NavLink>
                    </>
                    ) : (
                    <>
                      <NavLink to="/overview" className="navi" activeClassName="nav-item-active"><button type="button" className="nav-btns">Overview</button></NavLink>
                      <NavLink to="/bookable" className="navi" activeClassName="nav-item-active"><button className="nav-btns">Bookable</button></NavLink>
                      <NavLink to="/profile" className="navi" activeClassName="nav-item-active"><button type="button" className="nav-btns">Profile</button></NavLink>
                    </>
                  )}
                </div>
              </BrowserView>
              
              <MobileView style={{display: 'flex', flexDirection:'column', justifyContent:'center'}}>
                <div className="nav-items">
                  {/* <NavLink exact to="/" className="navi" activeClassName="nav-item-active"><button className="nav-btns">home</button></NavLink> */}
                  {!store.state.isLoggedIn
                    ? (
                    <>
                      <NavLink to="/about" className="navi" style={{margin: 0}}activeClassName="nav-item-active"><button className="nav-btns">About</button></NavLink>
                      <NavLink to="/login" className="navi" style={{margin: 0}} activeClassName="nav-item-active"><button className="nav-btns">login</button></NavLink>
                      <NavLink to="/register" className="navi" style={{margin: 0}} activeClassName="nav-item-active"><button className="nav-btns">register</button></NavLink>
                    </>
                    ) : (
                    <>
                      {/* <NavLink to="/overview" className="navi" style={{margin: 0}} activeClassName="nav-item-active"><button type="button" className="nav-btns"><FaCalendarAlt /></button></NavLink>
                      <NavLink to="/bookable" className="navi" style={{margin: 0}} activeClassName="nav-item-active"><button className="nav-btns"><FaRegCalendarPlus /></button></NavLink> */}
                      <NavLink to="/overview" className="navi" style={{margin: 0}} activeClassName="nav-item-active"><button type="button" className="nav-btns">Overview</button></NavLink>
                      <NavLink to="/bookable" className="navi" style={{margin: 0}} activeClassName="nav-item-active"><button className="nav-btns">Bookables</button></NavLink>
                      <NavLink to="/profile" className="navi" style={{margin: 0}} activeClassName="nav-item-active"><button type="button" className="nav-btns"><FaUserCircle /></button></NavLink>
                    </>
                  )}
                </div>
              </MobileView>
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
