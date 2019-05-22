import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import { bookingCheck, bookingAccept, getUser, getValidToken, getUserById } from '../services/api';

import { Redirect } from 'react-router'

import { AppContext } from '../store/context';

import { BrowserRouter, Route } from 'react-router-dom'

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
     
        let res = await bookingCheck(match.params.id)

        if (res.data.host == state.user._id) {
          setWho('Host');
        }

        if (res.data.client == state.user._id) {
          setWho('Client');
        }

        if (res.data.client) {
          setAlready(true)
        }

        setData(res.data)
        console.log(res.data)


        if (res.data.host) {
          let hostres = await getUserById(res.data.host)
          setHost(`${hostres.firstName} ${hostres.lastName}`);
        }

        if (res.data.client) {
          let clientres = await getUserById(res.data.client)
          setClient(`${clientres.firstName} ${clientres.lastName}`);
        }
        
        
      } 
      catch (error) {
        alert(error.message);
      }
    }());
  }

  useEffect(() => {
    if (state.user) {
      checkBooking()
    }

  }, [match.params.id, state.user])

  function acceptBooking() {
    (async function () {
      try {
        let res = await bookingAccept(match.params.id)
        checkBooking()
      } 
      catch (error) {
        alert(error.message);
      }
    }());
  }

  if (getValidToken() == null) {
    return <Redirect to='/login' />
  }

  return (
    <>
      <div className="booking">
        <div className="booking-con">
          <div className="booking-card-1">
            {who == "Host" && !already &&
              <div className="booking-sub-desc">
                You are this bookings host
              </div>
            }
            {who == "Guest" && !already &&
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
              <span>
                {data.name}
              </span>
              <span className="book-date">
                  {moment(data.date).format('MM/DD/YYYY hh:mm')}
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
                { data.fee != 1 &&
                  <i>Free</i>
                }
              </div> 
          </div>

          {who == "Guest" && !already &&
            <button className="book" 
              onClick={acceptBooking}
              onClick={() => { if (window.confirm(`Do you want to book ${data.name} with ${hostName} on ${moment(data.date).format('MM/DD/YYYY hh:mm')}`)) acceptBooking() } } 
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
