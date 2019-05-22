import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { AppContext } from '../store/context';
import moment from 'moment';

const Overview = () => {

   const { state, actions } = useContext(AppContext);

   const [bookings, setBookings] = useState([]);

   useEffect(() => {
      if (state.user && state.user.bookings) {
         setBookings(state.user.bookings)
      }
   }, [state.user && state.user.bookings])


   return (
      <>
         <div className="overview-container">

            <div className="overview-card">
               <h1>Bookings</h1>
               {bookings.length > 0 && bookings.map(booking => {
                  if(booking.client){
                     return (
                     <div className="overview-sub-card" key={booking._id}>
                        <div className="sub-card-top">
                           <button onClick={() => alert("trying to delete")}>✖</button>
                           <span>
                              {booking.name}
                              <span>
                                 with
                              </span>
                              {booking.clientName}
                              {booking.hostName}
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
               {state.user && state.user.bookings.map(booking => {
                  return (
                     <div className="overview-sub-card" key={booking._id}>
                        <div className="sub-card-top">
                           <button  onClick={(e) => { if (window.confirm(`Do you want to delete ${booking.name} with ${booking.clientName}?`)) window.onCancel(alert('Deleted')) } }  className="deleteme" style={{color:'gray', background: 'none', border: 'none', padding: '0'}}>✖</button>
                           <span>
                              {booking.name}
                              <span>
                                 with
                              </span>
                              {booking.clientName}
                           </span>
                        </div>
                        <span className="sub-card-date">
                           <br />
                           <span>
                              {moment(booking.date).format('MM/DD/YYYY hh:mm')}
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
               })}
            </div>

         </div>
      </>
   )

}

export default Overview;