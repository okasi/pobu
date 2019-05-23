import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { AppContext } from '../store/context';
import moment from 'moment';

import { getHostBookings, getClientBookings, getUserById, bookingDelete } from '../services/api';

const Overview = () => {

  const { state, actions } = useContext(AppContext);

  const [hostBookings, setHostBookings] = useState(null);
  const [clientBookings, setClientBookings] = useState(null);


  useEffect(() => {

    (async function () {
      if (state.user) {
        try {
          const hostRes = await actions({
            type: 'BOOKING_HOST',
          })
          setHostBookings(hostRes.data)

          const clientRes = await actions({
            type: 'BOOKING_CLIENT',
          })
          setClientBookings(clientRes.data)

        } catch (e) {
          console.error(e);
        }
      }
    }());
  }, [state.user])

  return (
    <>

      <div className="overview-container">

        <div className="overview-card">
          <h1>Bookings</h1>
          {state.user && clientBookings && clientBookings.map(booking => {

            let cName = ""
            Promise.resolve(actions({
              type: 'USER_ID_GET',
              payload: booking._client
            }))
              .then(res => {
                console.log(res.firstName)
                cName = res.firstName;
              })

          

            if (booking._client == state.user._id) {
              return (
                <div className="overview-sub-card" key={booking._id}>
                  <div className="sub-card-top">
                    <button onClick={() => alert("trying to delete")}>✖</button>
                    <span>
                      {booking.name}
                      <span>
                        with
                      </span>
                      {cName}
                    </span>
                  </div>
                  <div className="sub-card-top">
                    <span className="sub-card-date">
                      <br />
                      <span>
                        {booking.who}
                      </span>
                    </span>
                    <span className="sub-card-date">
                      <br />
                      <span>
                        {moment(booking.date).format('MM/DD/YYYY hh:mm')}
                      </span>
                    </span>
                  </div>
                  <div className="sub-card-details">
                    <i>{booking.theDuration}</i>
                    <i>
                      {booking.communication}
                    </i>
                    {booking.fee === 1 &&
                      <i> Paid </i>
                    }
                    {booking.fee !== 1 &&
                      <i>Free </i>
                    }
                  </div>
                </div>
              )
            }
          })}
        </div>

        <div className="overview-card">
          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>Your Bookables</h1>
            <NavLink to="/bookable">
              <h1>+</h1>
            </NavLink>
          </span>


          {state.user && hostBookings && hostBookings.map(booking => {
            if (booking._host == state.user._id) {
              return (
                <div className="overview-sub-card" key={booking._id}>
                  <div className="sub-card-top">
                    <button onClick={(e) => { 
                      if (window.confirm(`Do you want to delete ${booking.name} with ${booking.clientName}?`)) {
                        
                          alert('Deleted')
                          actions({
                            type: 'BOOKING_DELETE',
                            payload: {bookableId: booking._id}
                          })
                        
                      }
                    }} className="deleteme" style={{ color: 'gray', background: 'none', border: 'none', padding: '0' }}>✖</button>
                    <span>
                      {booking.name}
                      <span>
                        with
                      </span>
                      {booking.clientName}
                    </span>
                  </div>
                  <span className="sub-card-date">
                      {moment(booking.date).format('MM/DD/YYYY')}
                    <br/>
                    <span>
                      {moment(booking.date).format('hh:mm')}
                    </span>
                  </span>
                  <div className="sub-card-details">
                    <i>{booking.duration}</i>
                    <i>{booking.theDuration}</i>
                    <i>
                      {booking.communication}
                    </i>
                    {booking.fee === 1 &&
                      <i> Paid </i>
                    }
                    {booking.fee !== 1 &&
                      <i>Free </i>
                    }
                  </div>
                  <i className="sub-card-urlbox">
                    <a href={`/booking/${booking._id}`}>
                      {booking._id}
                    </a>
                  </i>
                </div>
              )
            }
          })}

        </div>

      </div>
    </>
  )

}

export default Overview;