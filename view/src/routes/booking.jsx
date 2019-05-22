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

  const booking3 = {
    name:"Recruitment", 
    day:"Thursday, May 23rd 2019", 
    time:"05:15 pm", 
    fee: false, 
    theDuration: "50 min", 
    chat: true, 
    voice: true, 
    video: false, 
    nano: false,
    id: "/booking",
    clientName: "Lucky Luke",
  };

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
      {/* <h1>Booking</h1>
      <h2>You are: {who}</h2>
      <h2>ID: {match.params.id}</h2>
      <h2>Name: {data.name}</h2>
      <h2>Communication: {data.communication}</h2>
      <h2>Duration: {data.duration} min</h2>
      <h2>Date: {moment(data.date).format('MM/DD/YYYY hh:mm')}</h2>
      <h2>Host: {hostName}</h2>

      {who == "Guest" && !already &&
        <button onClick={acceptBooking}>
          Accept booking
        </button>
      } */}


      <div className="booking">
      <div className="booking-con">
        <div className="booking-card-1">
        {who == "Host" && !already &&
          <div className="booking-sub-desc">
            You are this bookings
          </div>
        }
        {who == "Guest" && !already &&
          <div className="booking-sub-desc">
            Get connected with
          </div>
        }
          <div className="booking-host-name">
            {/* Lucky Luke */}
            {who}
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
                {/* <i>{booking3.theDuration}</i> */}
                <i>
                  {data.communication}
                  
                </i>
                { data.fee === 1 &&
                  <i> Paid </i>
                }
                { data.fee != 1 &&
                  <i>Free </i>
                }
            </div> 
          </div>
          {who == "Guest" && !already &&
          <button className="book" 
          // onClick={()=> window.confirm(`You have a ${booking3.name} booked with ${booking3.clientName}, ${booking3.day} - ${booking3.time}`)}
          onClick={acceptBooking}
          onClick={() => { if (window.confirm(`Do you want to book ${data.name} on ${moment(data.date).format('MM/DD/YYYY hh:mm')}`)) acceptBooking() } } 
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
