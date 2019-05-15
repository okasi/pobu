import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import vector from '../assets/logo.png';

const Home = withRouter(({ history }) => (
  <>
    <div className="home">

      <div className="h-flex-1">
        <img src={vector} />
      </div>

      <div className="h-flex-2">

        <div className="why">
          WHY POBU?
        </div>

        <div className="pitch">
          Bookings +
          connections,
          made easy
        </div>

        <div className="slogan">
          we value your privacy & efficiency, with pobu
          you got it all blabla.
        </div>

        <NavLink to="/register">
          <button className="reg-btn">
            Register Now
          </button>
        </NavLink>

      </div>
    </div>
  </>
));

export default Home;
