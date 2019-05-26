import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../store/context';
import moment from 'moment';

const Overview = () => {

  const { state, actions } = useContext(AppContext);
  const [allBookings, setAllBookings] = useState([]);

  


  useEffect(() => {

    // DUUUUDE
    // CREATE A SOLUTION TO THIS MADNESS
    // Combine populated bookings, don't seperate logic for host & client bookings
    // Generate cards jsx function
    // Then return it with conditonal on which side they should be

    (async function () {
      if (state.user) {
        try {

          const hBookings = await actions({ type: 'BOOKING_HOST' })
          const cBookings = await actions({ type: 'BOOKING_CLIENT' })

          const bookings = hBookings.concat(cBookings);

          let populated = await Promise.all(
            await bookings.map(async (booking) => {
              booking.host = await actions({ type: 'USER_ID_GET', payload: booking._host });
              booking.client = await actions({ type: 'USER_ID_GET', payload: booking._client });

              console.log(booking)

  
              await setAllBookings([...allBookings, booking])

              // console.log(booking)
              // if (state.user._id === booking.host._id) {
              //   console.log(booking.host)
              //   setHostBookings([...hostBookings, booking])
              // }

              // console.log(booking.client)
              // if (state.user._id === booking.client._id) {
                
              //   setClientBookings([...clientBookings, booking])
              // }
              
            })
        
          );

  

          

          
          


          

          // const populatedHostBookings = await Promise.all(
          //   hostRes.map(async (hostBooking) => {
          //     hostBooking._host = await actions({
          //       type: 'USER_ID_GET',
          //       payload: hostBooking._host
          //     });

          //     return hostBooking;
          //   })
          // );

          // setHostBookings(populatedHostBookings);

          // //Host names
          // const hostRes = await actions({
          //   type: 'BOOKING_HOST',
          // })

          // const populatedHostBookings = await Promise.all(
          //   hostRes.map(async (hostBooking) => {
          //     hostBooking._host = await actions({
          //       type: 'USER_ID_GET',
          //       payload: hostBooking._host
          //     });

          //     return hostBooking;
          //   })
          // );

          // setHostBookings(populatedHostBookings);

          // //Client names
          // const clientRes = await actions({
          //   type: 'BOOKING_CLIENT',
          // })

          // const populatedClientBookings = await Promise.all(
          //   clientRes.map(async (clientBooking) => {
          //     clientBooking._client = await actions({
          //       type: 'USER_ID_GET',
          //       payload: clientBooking._client
          //     });

          //     return clientBooking;
          //   })
          // );

          // console.log(populatedClientBookings)

          // setClientBookings(populatedClientBookings)

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

        {allBookings.length}

  {/* 
        {hostBookings.length}
        {clientBookings.length}
  
          <h1>Bookings</h1>
          {state.user && clientBookings && clientBookings.map((booking) => {

            if (booking.client._id === state.user._id) {
              console.log("WOOOOOP")
              return (
                <div className="overview-sub-card" key={booking._id}>
                  <div className="sub-card-top">
                    <button onClick={() => alert("trying to delete")}>✖</button>
                    <span>
                      {booking.name}
                      <span>
                        with
                      </span>
                      {booking._host.firstName}
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


          {state.user && hostBookings && hostBookings.map((booking) => {
            if (booking._host._id === state.user._id) {
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
                      {booking._host.firstName}
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
*/}
        </div>

      </div>
    </>
  )

}

export default Overview;