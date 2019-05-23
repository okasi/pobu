import React, { useContext } from 'react';
import { AppContext } from '../store/context';
import { NavLink, withRouter } from 'react-router-dom';
import vector from '../assets/logo.png';

function Home() {
  const { state } = useContext(AppContext);

  return (
    <>
      <div className="home">

        <div className="home-card-1">
          <img src={vector} alt=""/>
        </div>

        <div className="home-card-2">
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
          {!state.isLoggedIn 
            ? (
              <NavLink to="/register">
                <button className="reg-btn">
                  Register Now
                </button>
              </NavLink>
            ) : (null)
          }
        </div>
      </div>
    </>
  );
}

export default Home;
