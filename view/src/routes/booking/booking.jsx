import React, { useContext, useEffect, useState } from 'react';

import moment from 'moment';

import { AppContext } from '../../store/context';
import history from '../../store/history';

import io from "socket.io-client";

import './booking.css';


export default function Booking({ match }) {

  const [who, setWho] = useState('Guest');
  const [data, setData] = useState('');
  const [alreadyBooked, setAlreadyBooked] = useState(true);

  const [hostName, setHost] = useState('');
  const [clientName, setClient] = useState('');

  const [socket, setSocket] = useState(null);

  const [messages, setMessages] = useState([]);

  const { state, actions } = useContext(AppContext);


  function checkBooking() {
    (async function () {
      try {

        let res = await actions({
          type: 'BOOKING_DATA',
          payload: { bookableId: match.params.id }
        })

        console.log(res.data)


        if (res.data._host === state.user._id) {
          setWho('Host');
          console.log("you are host")
        }

        if (res.data._client === state.user._id) {
          setWho('Client');
          console.log("you are client")
        }

        if (!res.data._client) {
          setAlreadyBooked(false)
          console.log("available")
        } else {
          setAlreadyBooked(true)
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

        if (res.data._client !== state.user._id && res.data._host !== state.user._id && res.data._client) {
          // history.push('/');
          // window.location.reload();
        } 

      }
      catch (error) {
        // alert(error.message);
      }
    }());
  }

  // First load
  useEffect(() => {

    if (socket === null) {
      let socket = io(':5000')
      setSocket(socket)
      socket.on('RECEIVE_MESSAGE', function (msgData) {
        if (msgData.id === match.params.id) {
          setMessages(prevState => (
            [...prevState, msgData]
          ))
        }
        
      })
    }

    (async function () {
      if (!await actions({ type: 'USER_GET_VALID_TOKEN' })) {
        history.push('/login');
        window.location.reload();
      }
    }());
    // eslint-disable-next-line
  }, [match.params.id])

  // When changes to login & router url
  useEffect(() => {
    if (state.user) {
      checkBooking()
    }
    // eslint-disable-next-line
  }, [match.params.id && state.user])


  function acceptBooking() {
    (async function () {
      try {
        let res = await await actions({
          type: 'BOOKING_ACCEPT',
          payload: { bookableId: match.params.id }
        })
        console.log(res)
        checkBooking()
        // alert('Booked!')

        actions({
          type: 'USER_DATA',
        })
      }
      catch (error) {
        // alert(error.message);
      }
    }());
  }

  function messageHandler(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      socket.emit('SEND_MESSAGE', {
        sender: state.user.firstName,
        msg: e.target.value,
        timestamp: moment().format("HH:mm:ss"),
        id: match.params.id,
      })

      e.target.value = null;

      // actions({
      //   type: 'CHAT_SEND_MESSAGE',
      //   payload: e.target.value
      // })
    }

  }

  return (
    <>
      <div className="booking">
        <div className="booking-con">
          <div className="booking-card-1">

            {who === "Host" && alreadyBooked &&
              <div className="booking-sub-desc">
                Hello {hostName}!<br></br><br></br>You are this booking's host.<br></br><br></br>You will get connected with:<br></br>{clientName}
              </div>
            }

            {who === "Client" && alreadyBooked &&
              <div className="booking-sub-desc">
                Hello {clientName}!<br></br><br></br>You are this booking's client.<br></br><br></br>You will get connected with:<br></br>{hostName}
              </div>
            }

            {data && who === "Guest" && !alreadyBooked &&
              <div className="booking-host-name">
                {hostName}
              </div>
            }

            {who === "Host" && !alreadyBooked &&
              <div className="booking-sub-desc">
                Hello {hostName}!<br></br><br></br>You are this booking's host.<br></br><br></br>You don't have any client yet.<br></br><br></br>Share the URL with someone you would like to connect with.
              </div>
            }
       
        
          </div>

          <div className="booking-card-2">
            <div className="booking-box">
              <span
                className="book-title"
                style={{ fontWeight: 'bold', fontSize: 18, textTransform: 'capitalize' }}
              >
                {data.name}
              </span>

              <span className="book-date">
                {moment(data.date).format('MM/DD/YYYY - hh:mm')}
                <br />
                <span>
                  {data.duration} min
                  </span>
                <br />
              </span>

              <div className="book-details">
                <i>
                  {data.communication}
                </i>
                {data.fee === 1 &&
                  <i>Paid</i>
                }
                {data.fee !== 1 &&
                  <i>Free</i>
                }
              </div>
            </div>

            {who === "Guest" && !alreadyBooked &&
              <button className="book"
                onClick={() => {
                  if (window.confirm(`Do you want to book ${data.name} with ${hostName} on ${moment(data.date).format('MM/DD/YYYY hh:mm')}`)) {
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


      {alreadyBooked && 
      <center>
        <div id="messagingWindow">
          <ul>
            {messages.map((message, i) => {
              return (
                <li style={{ backgroundColor: 'white' }} key={i}>
                  <span><i>{message.timestamp}</i> <u>{message.sender}</u></span>
                  <br></br>
                  <span><b>{message.msg}</b></span>
                </li>
              )

            })}
          </ul>
        </div>
        <div id="messagingBox">
          <textarea placeholder="Press enter to send" onKeyDown={messageHandler}></textarea>
        </div>
      </center>
      }




    </>
  );
}
