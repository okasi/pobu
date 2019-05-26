import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { AppContext } from '../store/context';
import moment from 'moment';


const Overview = () => {

  const { state, actions } = useContext(AppContext);

  const [hostBookings, setHostBookings] = useState([]);
  const [clientBookings, setClientBookings] = useState([]);


  useEffect(() => {

    (async function () {
      if (state.user) {
        try {
          const hostRes = await actions({
            type: 'BOOKING_HOST',
          })

          const populatedHostBookings = await Promise.all(
            hostRes.map(async (hostBooking) => {
              hostBooking._host = await actions({
                type: 'USER_ID_GET',
                payload: hostBooking._host
              });

              return hostBooking;
            })
          );

          setHostBookings(populatedHostBookings);


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
          {/*Booked bookings as (client) */}
          {state.user && clientBookings && clientBookings.map(booking => {
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
                      {booking._host.slice(-10)}
                    </span>
                  </div>
                  <div className="sub-card-top">
                    <span className="sub-card-date">
                      <br />
                      <span>
                       Client
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
                    <i>{booking.duration} min</i>
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

          {/*Booked bookings as (Host) */}
          {state.user && hostBookings && hostBookings.map((booking) => {
            if (booking._client && booking._host) {
              return (
                <div className="overview-sub-card" key={booking._id}>
                  <div className="sub-card-top">
                    <button onClick={(e) => {
                      if (window.confirm(`Do you want to delete ${booking.name} with ${booking.clientName}?`)) {

                        alert('Deleted')
                        actions({
                          type: 'BOOKING_DELETE',
                          payload: { bookableId: booking._id }
                        })

                      }
                    }} className="deleteme" style={{ color: 'gray', background: 'none', border: 'none', padding: '0' }}>✖</button>
                    <span>
                      {booking.name}
                      <span>
                        with
                      </span>
                      {/* {booking._host} */}
                      {booking._client.slice(-10)}
                    </span>
                  </div>
                  <div className="sub-card-top">
                  <span className="sub-card-date">
                  <br />
                    host
                  </span>
                    <span className="sub-card-date">
                      {moment(booking.date).format('MM/DD/YYYY')}
                      <br />
                      <span>
                        {moment(booking.date).format('hh:mm')}
                      </span>
                  </span>
                  </div>
                  <div className="sub-card-details">
                    <i>{booking.duration} min</i>
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


        <div className="overview-card">
          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>Your Bookables</h1>
            <NavLink to="/bookable">
              <h1>+</h1>
            </NavLink>
          </span>

          {/*Booked bookings and bookables as (Host) */}
          {state.user && hostBookings && hostBookings.map((booking) => {
      
            if (booking._host._id == state.user._id && !booking._client && booking._host) {
        
              return (
                <div className="overview-sub-card" key={booking._id}>
                  <div className="sub-card-top">
                    <button onClick={(e) => {
                      
                      if (window.confirm(`Do you want to delete ${booking.name} with ${booking.clientName}?`)) {

                        alert('Deleted')
                        actions({
                          type: 'BOOKING_DELETE',
                          payload: { bookableId: booking._id }
                        })

                      }
                    }} className="deleteme" style={{ color: 'gray', background: 'none', border: 'none', padding: '0' }}>✖</button>
                    <span>
                      {booking.name}
                      <span>
                        with
                      </span>
                      {/* {booking._host} */}
                      {/* {booking._client &&
                      <i>HE</i>
                      } */}
                      {booking._host.firstName}
                      (You)
                    </span>
                  </div>
                  <div className="sub-card-top">
                  <span className="sub-card-date">
                  {booking._client &&
                      <i style={{color: 'red'}}>booked</i> 
                      }
                      </span>
                  <span className="sub-card-date">
                    {moment(booking.date).format('MM/DD/YYYY')}
                    <br />
                    <span>
                      {moment(booking.date).format('hh:mm')}
                    </span>
                  </span>
                  </div>
                  <div className="sub-card-details">
                    <i>{booking.duration} min</i>
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

                  {!booking._client &&
                  <i className="sub-card-urlbox">
                    <a href={`/booking/${booking._id}`}>
                      {booking._id}
                    </a>
                  </i>
                  }
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