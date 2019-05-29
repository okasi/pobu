import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../store/context';
import moment from 'moment';
import './overview.css';


const Overview = () => {

  const { state, actions } = useContext(AppContext);
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    actions({ type: 'SOCKET_INITIALIZE' })
  }, [])


  useEffect(() => {

    (async function () {
      if (state.user) {
        try {

          const hBookings = await actions({ type: 'BOOKING_HOST' })
          const cBookings = await actions({ type: 'BOOKING_CLIENT' })

          const bookings = hBookings.concat(cBookings);

          const populatedBookings = await Promise.all(
            await bookings.map(async booking => {
              if (booking._host) {
                booking.host = await actions({ type: 'USER_ID_GET', payload: booking._host })
              }

              if(booking._client) {
                booking.client = await actions({ type: 'USER_ID_GET', payload: booking._client })
              }

              return booking 
            })
          )
          
          setAllBookings(populatedBookings)

        } catch (e) {
          console.error(e);
        }
      }
    }());

    // eslint-disable-next-line
  }, [state.user])


  return (
    <>
      <div className="overview-container">

        <div className="overview-card">
          <h1>Bookings</h1>
          {/*Booked bookings as (client) */}
          {state.user && allBookings.length > 0 && allBookings.map(booking => {
            if (booking._client === state.user._id) {
              return (
                <div className="overview-sub-card" key={booking._id}>
                  <div className="sub-card-top">
                    <button onClick={(e) => {
                      if (window.confirm(`Do you want to unbook ${booking.name} with ${booking.host.firstName}?`)) {
                        actions({
                          type: 'BOOKING_UNBOOK',
                          payload: { bookableId: booking._id }
                        })
                      }
                    }} className="deleteme">✖</button>
                    <span>
                      {booking.name}
                      <span>
                        with
                      </span>
                      {booking.host.firstName}
                    </span>
                  </div>
                  <div className="sub-card-top">
                    <span>
                      <br/>
                      <span className="client">
                        Client
                      </span>
                    </span>
                    <span className="sub-card-date">
                      <span className="date">
                        {moment(booking.date).format('MM/DD/YYYY')}
                      </span>
                      <br />
                      <span>
                        {moment(booking.date).format('hh:mm')}
                      </span>
                    </span>
                  </div>
                  <div className="sub-card-details">
                    <i>{booking.duration} min</i>
                    <i>{booking.communication}</i>
                    {booking.fee === 1 &&
                      <i> Paid </i>
                    }
                    {booking.fee !== 1 &&
                      <i>Free </i>
                    }
                  </div>
                  <i className="sub-card-urlbox">
                    <a href={`/booking/${booking._id}`} className="asclient-url">
                      {booking._id}
                    </a>
                  </i>
                </div>
              )
            }
          })}

          {/*Booked bookings as (Host) */}
          {state.user && allBookings && allBookings.map((booking) => {
            if (booking._client && booking._host && state.user._id === booking._host) {
              return (
                <div className="overview-sub-card" key={booking._id}>
                  <div className="sub-card-top">
                    <button onClick={(e) => {
                      if (window.confirm(`Do you want to delete ${booking.name} with ${booking.client.firstName}?`)) {
                        alert('Deleted')
                        actions({
                          type: 'BOOKING_DELETE',
                          payload: { bookableId: booking._id }
                        })
                      }
                    }} className="deleteme">✖</button>
                    <span>
                      {booking.name}
                      <span>
                        with
                      </span>
                      {booking.client.firstName}
                    </span>
                  </div>
                  <div className="sub-card-top">
                    <span >
                      <br />
                      <span className="host">
                        host
                      </span>
                    </span>
                    <span className="sub-card-date">
                      <span className="date">
                        {moment(booking.date).format('MM/DD/YYYY')}
                      </span>
                      <br />
                      <span>
                        {moment(booking.date).format('hh:mm')}
                      </span>
                    </span>
                  </div>
                  <div className="sub-card-details">
                    <i>{booking.duration} min</i>
                    <i>{booking.communication}</i>
                    {booking.fee === 1 &&
                      <i> Paid </i>
                    }
                    {booking.fee !== 1 &&
                      <i>Free </i>
                    }
                  </div>
                  <i className="sub-card-urlbox">
                    <a href={`/booking/${booking._id}`} className="ashost-url">
                      {booking._id}
                    </a>
                  </i>
                </div>
              )
            }
          })}
        </div>


        {/*Bookables as (Host) */}
        <div className="overview-card">
          <span className="bookablescolumn">
            <h1>Your Bookables</h1>
            <NavLink to="/bookable">
              <h1>+</h1>
            </NavLink>
          </span>

          {state.user && allBookings && allBookings.map((booking) => {
            if (booking._host === state.user._id && !booking._client) {
              return (
                <div className="overview-sub-card" key={booking._id}>
                  <div className="sub-card-top">
                    <button onClick={(e) => {
                      if (window.confirm(`Do you want to delete ${booking.name}?`)) {
                        alert('Deleted')
                        actions({
                          type: 'BOOKING_DELETE',
                          payload: { bookableId: booking._id }
                        })
                      }
                    }} className="deleteme">✖</button>
                    <span>
                      {booking.name}
                      <span>
                        with
                      </span>
                      {booking.host && booking.host.firstName}
                      (You)
                    </span>
                  </div>
                  <span className="sub-card-date">
                      {moment(booking.date).format('MM/DD/YYYY')}
                    <br />
                    <span>
                      {moment(booking.date).format('hh:mm')}
                    </span>
                  </span>
             
                  <div className="sub-card-details">
                    <i>{booking.duration} min</i>
                    <i>{booking.communication}</i>
                    {booking.fee === 1 &&
                      <i> Paid </i>
                    }
                    {booking.fee !== 1 &&
                      <i>Free </i>
                    }
                  </div>
                  {!booking._client &&
                  <i className="sub-card-urlbox">
                    <a href={`/booking/${booking._id}`} className="asbookable-url">
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