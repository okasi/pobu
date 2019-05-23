import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import { bookingCheck, bookingAccept, getUser, getValidToken, getUserById } from '../services/api';
import { Redirect } from 'react-router'
import { AppContext } from '../store/context';
import history from '../store/history';


export default function Booking({ match }) {

  const [who, setWho] = useState('Guest');
  const [data, setData] = useState('Guest');
  const [already, setAlready] = useState(false);

  const [hostName, setHost] = useState('');
  const [clientName, setClient] = useState('');
  
  const { state, actions } = useContext(AppContext);


  function checkBooking() {
    (async function () {
      try {
     
        let res = await actions({
          type: 'BOOKING_DATA',
          payload: {bookableId: match.params.id}
        })
        

        if (res.data._host === state.user._id) {
          setWho('Host');
        }

        if (res.data._client === state.user._id) {
          setWho('Client');
        }

        if (res.data._client) {
          setAlready(true)
        }

        setData(res.data)
        console.log(res.data)


        if (res.data._host) {
          let hostres = await actions({
            type: 'USER_ID_GET',
            payload: res.data._host
          })
          setHost(`${hostres.firstName} ${hostres.lastName}`);
        }

        if (res.data._client) {
          let clientres = await actions({
            type: 'USER_ID_GET',
            payload: res.data._client
          })
          setClient(`${clientres.firstName} ${clientres.lastName}`);
        }
        
        
      } 
      catch (error) {
        // alert(error.message);
      }
    }());
  }

  useEffect(() => {
    if (state.isLoggedIn != true) {
      history.push('/login');
    }
  }, [])

  useEffect(() => {
    if (state.user) {
      checkBooking()
    }
  }, [match.params.id, state.user])

  function acceptBooking() {
    (async function () {
      try {
        let res = await await actions({
          type: 'BOOKING_ACCEPT',
          payload: {bookableId: match.params.id}
        })
        console.log(res)
        checkBooking()

        actions({
          type: 'USER_DATA',
        })
      } 
      catch (error) {
        // alert(error.message);
      }
    }());
  }

  return (
    <>
      <div className="booking">
        <div className="booking-con">
          <div className="booking-card-1">
            {who === "Host" && !already &&
              <div className="booking-sub-desc">
                You are this bookings host
              </div>
            }
            {who === "Guest" && !already &&
              <div className="booking-sub-desc">
                Get connected with
              </div>
            }
            <div className="booking-host-name">
              {hostName}
            </div>
          </div>

          <div className="booking-card-2">
            <div className="booking-box">      
              <span 
                className="book-title"
                style={{fontWeight: 'bold', fontSize: 18}}
              >
                {data.name}
              </span>

              <span className="book-date">
                  {moment(data.date).format('MM/DD/YYYY - hh:mm')}
                  <br/>
                  <span>
                    {data.duration} min
                  </span>
                  <br/>
              </span>

              <div className="book-details">
                <i>
                  {data.communication}
                </i>
                { data.fee === 1 &&
                  <i>Paid</i>
                }
                { data.fee !== 1 &&
                  <i>Free</i>
                }
              </div> 
          </div>

          {who === "Guest" && !already &&
            <button className="book" 
              onClick={() => { 
                  if (window.confirm(`Do you want to book ${data.name} with ${hostName} on ${moment(data.date).format('MM/DD/YYYY hh:mm')}`)) {
                    acceptBooking() 
                  } 
                }
              } 
            >
              Accept booking
            </button>
          }
        </div>
      </div>
    </div>
    </>
  );
}
