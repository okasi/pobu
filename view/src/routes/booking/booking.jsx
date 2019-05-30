import React, { useContext, useEffect, useState } from 'react';

import moment from 'moment';

import { AppContext } from '../../store/context';
import history from '../../store/history';

import './booking.css';


let myVideo
let userVideo

export default function Booking({ match }) {

  const [who, setWho] = useState('Guest');
  const [data, setData] = useState('');
  const [alreadyBooked, setAlreadyBooked] = useState(true);

  const [hostName, setHost] = useState('');
  const [clientName, setClient] = useState('');


  const [messages, setMessages] = useState([]);

  const [hasMedia, setHasMedia] = useState(false);

  const { state, actions } = useContext(AppContext);

  const [visibility, setVisibility] = useState(true);

  function checkBooking() {
    (async function () {
      try {

        let res = await actions({
          type: 'BOOKING_DATA',
          payload: { bookableId: match.params.id }
        })

        if (res.data._host === state.user._id) {
          setWho('Host');
        }

        if (res.data._client === state.user._id) {
          setWho('Client');
        }

        if (!res.data._client) {
          setAlreadyBooked(false)
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
          history.push('/');
          window.location.reload();
        }

      }
      catch (error) {
        // alert(error.message);
      }
    }());
  }

  function getMedia() {

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setHasMedia(true)

        console.log(stream)


        try {
          myVideo.srcObject = stream;
        } catch (e) {
          myVideo.src = URL.createObjectURL(stream);
        }

        myVideo.play();

        // res(stream);
      })
      // .catch(err => {
      //   throw new Error(`Unable to fetch stream ${err}`);
      // })
  
  }

  // First load
  useEffect(() => {

    (async function () {
      if (!await actions({ type: 'USER_GET_VALID_TOKEN' })) {
        history.push('/login');
        window.location.reload();
      }
    }());

    getMedia()
    // eslint-disable-next-line
  }, [match.params.id])



  useEffect(() => {
    if (state.socket != undefined) {
      state.socket.on('RECEIVE_MESSAGE', function (msgData) {
        if (msgData.id === match.params.id) {
          setMessages(prevState => (
            [...prevState, msgData]
          ))
        }
      })
    }
  }, [state.socket])

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

  function messageHandler(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (e.target.value.length > 0) {
        state.socket.emit('SEND_MESSAGE', {
          sender: state.user.firstName,
          msg: e.target.value,
          // timestamp: moment().parseZone().format("HH:mm:ss"),
          id: match.params.id,
        })
      }


      e.target.value = null;

      // actions({
      //   type: 'CHAT_SEND_MESSAGE',
      //   payload: e.target.value
      // })
    }

  }

  return (
    <>
    
      <div className={`booking ${visibility}`}>
        <div className="booking-con-com">
          <div className="booking-card-1-com">
            <div className="video-con">
              {who === "Host" && alreadyBooked &&
                <div className="booking-sub-desc">
                  {data.name}
                  <br/>
                    You are connected with {clientName}
                  <br/>
                  <br/>
                </div>
              }

              {who === "Client" && alreadyBooked &&
                <div className="booking-sub-desc">
                  {data.name}
                  <br/>
                    You are connected with {hostName}
                  <br/>
                  <br/>
                </div>
              }

              {data && who === "Guest" && !alreadyBooked &&
                <div className="booking-host-name">
                  {data.name}
                  <br/>
                    You are not yet connected with {hostName}
                  <br/>
                  <br/>
                </div>
              }

              {who === "Host" && !alreadyBooked &&
                <div className="booking-sub-desc">
                  {hostName}!<br></br> Your booking is not yet accepted
                  <br/>
                  <br/>
                </div>
              }
      
              <div id="videoContainer">
                <video id="myVideo" style={{width: '80%'}} ref={(ref) => {myVideo = ref;}}></video>
                {/* <video id="userVideo" style={{width: '60%'}} ref={(ref) => {userVideo = ref;}}></video> */}
              </div>
            </div>    
          </div>

          {alreadyBooked && (data.communication === "Chat" || data.communication === "Voice" || data.communication === "Video") &&
            <div className="booking-card-2-com">
              <button className="reg-btn"  onClick={() => setVisibility(!visibility)}>
                See details
              </button>
              <div className="booking-box-com">
                <div>
                  <div id="messagingWindow">
                    <div>
                      {messages.map((message, i) => {
                        return (
                          <div className="msg" key={i}>
                            <div className="msg-sender">
                              <span>{message.sender}</span>
                              <span><i>{message.timestamp}</i></span>
                            </div>
                            <br/>
                            <li className="msg-it">{message.msg}</li>
                            <br/>
                          </div>
                        )

                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div id="messagingBox" className="book-com">
                <textarea placeholder="Press enter to send..." onKeyDown={messageHandler}></textarea>
              </div>
            </div>
          }
        </div>
      </div>

      <div className="booking" >
        <div className="booking-con">
          <div className="booking-card-1">
            {who === "Host" && alreadyBooked &&
              // <div className="booking-sub-desc">
              //   Hello {hostName}!<br></br><br></br>You are this booking's host.<br></br><br></br>You will get connected with:<br></br>{clientName}
              // </div>
              <div>
                <div className="booking-sub-desc">
                  {/* Hello,
                  <br/> */}
                  You are this booking's host.
                </div>
                <div className="booking-host-name">
                  {hostName}
                </div>
                <div className="booking-sub-desc">
                  <br/>
                  <br/>
                  You will get connected with:
                  <br/>
                  {clientName}
                </div>
                <button className="reg-btn"  onClick={() => setVisibility(!visibility)}>
                  Start the {data.communication}
                </button>
              </div>
            }

            {who === "Client" && alreadyBooked &&
            <div>
              <div className="booking-sub-desc">
                You are this booking's client.
              </div>
              <div className="booking-host-name">
                  {clientName}
                </div>
                <div className="booking-sub-desc">
                  <br/>
                  <br/>
                  You will get connected with:
                  <br/>
                  {hostName}
                </div>
                <button className="reg-btn"  onClick={() => setVisibility(!visibility)}>
                Start the {data.communication}
              </button>
               </div>
            }

            {data && who === "Guest" && !alreadyBooked &&
              <div className="booking-host-name">
                {hostName}
              </div>
            }

            {who === "Host" && !alreadyBooked &&
              <div className="booking-sub-desc">
                Hello<br/> {hostName}!<br></br><br></br>You are this booking's host.<br></br><br></br>You don't have any client yet.<br></br><br></br>Share the URL with someone you would like to connect with.
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
    </>
  );
}
