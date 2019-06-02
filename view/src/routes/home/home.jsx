import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTwitter } from 'react-icons/fa';
import { AppContext } from '../../store/context';

import vector from '../../assets/logo.png';

import './home.css';

function Home() {
  const { state } = useContext(AppContext);

  return (
    <>
      <div className="home">
        <div className="home-card-1">
          <img src={vector} alt="Vector" />
        </div>
        <div className="home-card-2">
          <div className="why">WHY POBU?</div>
          <div className="pitch">Appointments, made efficent</div>
          <div className="slogan">
            We value your privacy & time,
            <br/>
            with pobu you got it all.
          </div>
          {!state.isLoggedIn ? (
            <NavLink to="/register">
              <button type="button" className="reg-btn">Register Now</button>
            </NavLink>
          ) : null}
        </div>
      </div>
      <div className="home-social">
        <a
          href="http://twitter.com/pobu_io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
      </div>
    </>
  );
}

export default Home;
