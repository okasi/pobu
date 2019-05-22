import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import { bookingCheck, bookingAccept, getUser, getValidToken } from '../services/api';

import { Redirect } from 'react-router'

import { AppContext } from '../store/context';

import { BrowserRouter, Route } from 'react-router-dom'

export default function Booking({ match }) {

  const [who, setWho] = useState('Guest');
  const [data, setData] = useState('Guest');
  const [already, setAlready] = useState(false);
  
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
      <h1>Booking</h1>
      <h2>You are: {who}</h2>
      <h2>ID: {match.params.id}</h2>
      <h2>Name: {data.name}</h2>
      <h2>Communication: {data.communication}</h2>
      <h2>Duration: {data.duration} min</h2>
      <h2>Date: {moment(data.date).format('MM/DD/YYYY hh:mm')}</h2>

      {who == "Guest" && !already &&
        <button onClick={acceptBooking}>
          Accept booking
        </button>
      }
    </>
  );
}
