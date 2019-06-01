/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext, useEffect, useState } from 'react';

import moment from 'moment';

import { AppContext } from '../../store/context';
import history from '../../store/history';

import VideoCall from '../../helpers/peer';

import './booking.css';

let localStream;
let localVideo;
let remoteVideo;
let peer;
let initiator = false;
const videoCall = new VideoCall();

export default function Booking({ match }) {
  const [bookingData, setBookingData] = useState({});
  const [whoIsViewing, setWhoIsViewing] = useState('Guest');
  const [alreadyBooked, setAlreadyBooked] = useState(true);

  const [hostName, setHost] = useState('');
  const [clientName, setClient] = useState('');

  const [currentDurationStatus, setCurrentDurationStatus] = useState('');

  const [ongoingCommunication, setOngoingCommunication] = useState(false);

  const [detailVisibility, setDetailVisibility] = useState(true);

  const [messages, setMessages] = useState([]);

  const { state, actions } = useContext(AppContext);

  //Quick fix to unload component on leave 
  history.listen((location) => {
    if (location.pathname.includes('booking') === false) {
      window.location.reload(); 
    }
  });

  // First load
  useEffect(() => {
    // eslint-disable-next-line func-names
    (async function () {
      if (!(await actions({ type: 'USER_GET_VALID_TOKEN' }))) {
        history.push('/login');
        window.location.reload();
      }
    }());
    // eslint-disable-next-line
  }, [match.params.id]);  


  function checkBooking() {
    // eslint-disable-next-line func-names
    (async function () {
      try {
        const res = await actions({
          type: 'BOOKING_DATA',
          payload: { bookableId: match.params.id },
        });

        if (res.data._host === state.user._id) {
          setWhoIsViewing('Host');
        }

        if (res.data._client === state.user._id) {
          setWhoIsViewing('Client');
        }

        if (!res.data._client) {
          setAlreadyBooked(false);
        } else {
          setAlreadyBooked(true);
        }

        setBookingData(res.data);

        if (res.data._host) {
          const hostres = await actions({
            type: 'USER_ID_GET',
            payload: res.data._host,
          });
          setHost(`${hostres.firstName} ${hostres.lastName}`);
        }

        if (res.data._client) {
          const clientres = await actions({
            type: 'USER_ID_GET',
            payload: res.data._client,
          });
          setClient(`${clientres.firstName} ${clientres.lastName}`);
        }

        if (
          res.data._client !== state.user._id
          && res.data._host !== state.user._id
          && res.data._client
        ) {
          history.push('/');
          window.location.reload();
        }
      } catch (error) {
        alert(error.message);
      }
    }());
  }

    // When data gets updated
    useEffect(() => {
      if (Object.keys(bookingData).length > 0) {

        const startDate = moment(bookingData.date).format('LLLL')
        const endDate = moment(startDate).add(bookingData.duration, 'minutes').format('LLLL')

        let status = ''
   
        setInterval(() => { 
         
            if (moment().isSameOrAfter(startDate) && !moment().isSameOrAfter(endDate)) {
              setCurrentDurationStatus('Ongoing')
              status = 'Ongoing'
            } else {
              setCurrentDurationStatus('Pending')
              status = 'Pending'
            }

            if (moment().isSameOrAfter(endDate)){
              setCurrentDurationStatus('Ended')
              status = 'Ended'
            }
            console.log(status)
          
        }, 1000);
      }
      //eslint-disable-next-line
    }, [bookingData]);

  function startTextChat() {
    if (state.socket !== undefined) {
      state.socket.on('RECEIVE_MESSAGE', (msgData) => {
        if (msgData.id === match.params.id) { // Dangerous solution 
          setMessages(prevState => [...prevState, msgData]);
          document
            .querySelector('#messagingWindow')
            .scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      });
    }
  }

  function startVideoChat() {
    if (state.socket !== undefined) {

      function getUserMedia(cb) {
        return new Promise((resolve, reject) => {

          const op = {
            video: {
              width: { min: 160, ideal: 640, max: 1280 },
              height: { min: 120, ideal: 360, max: 720 },
            },
            audio: true
          }

          navigator.mediaDevices.getUserMedia(op)
            .then(stream => {
              localStream = stream
              localVideo.srcObject = stream
              resolve()
            })
            .catch(e => {console.log(e)})
            .then(() => resolve())
        })
      }

      function enter(roomId) {
        peer = videoCall.init(localStream, initiator);
    
        peer.on('signal', (data) => {
          const signal = {
            room: roomId,
            desc: data,
          };
          state.socket.emit('signal', signal);
        });
    
        peer.on('stream', (stream) => {
          remoteVideo.srcObject = stream;
        });
    
        peer.on('error', (err) => {
          console.log(err);
        });
      };
    
      function call(otherId) {
        videoCall.connect(otherId);
      };

      getUserMedia()
        .then(() => {
          state.socket.emit('join', { roomId: match.params.id });
        })

      state.socket.on('init', () => {
        initiator = true;
      });

      state.socket.on('ready', () => {
        enter(match.params.id);
      });

      state.socket.on('desc', (data) => {
        if (data.type === 'offer' && initiator) return;
        if (data.type === 'answer' && !initiator) return;
        call(data);
      });

      state.socket.on('disconnected', () => {
        initiator = true;
      });

    }
  }

  // When changes to login & router url
  useEffect(() => {
    if (state.user) {
      checkBooking();
    }
    // eslint-disable-next-line
  }, [match.params.id && state.user]);

  function acceptBooking() {
    // eslint-disable-next-line func-names
    (async function () {
      try {
        await actions({
          type: 'BOOKING_ACCEPT',
          payload: { bookableId: match.params.id },
        });

        checkBooking();

        actions({ type: 'USER_DATA' }); // To fire a update for overview
      } catch (error) {
        alert(error.message);
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
          id: match.params.id,
          // Timestamp is handled on the backend
        }); 
      }
      e.target.value = null;
    }
  }

  return (
    <>
      {!detailVisibility && 
        <>
          <div className="booking">
            <div className="booking-con-com">
              <div className="booking-card-1-com">
                <div className="video-con">
      
                  {alreadyBooked &&
                    (whoIsViewing === 'Client' || whoIsViewing === 'Host') && (
                      <div className="booking-sub-desc">
                        {bookingData.name}
                        <br />
                        You are connected with&nbsp;
                        {whoIsViewing === 'Client' ? hostName : 
                        whoIsViewing === 'Host' ? clientName : null}
                        <br />
                        <br />
                      </div>
                  )}

                  {/* 
                  {bookingData && whoIsViewing === 'Guest' && !alreadyBooked && (
                    <div className="booking-host-name">
                      {bookingData.name}
                      <br />
                      You are not yet connected with&nbsp;
                      {hostName}
                      <br />
                      <br />
                    </div>
                  )}

                  {whoIsViewing === 'Host' && !alreadyBooked && (
                    <div className="booking-sub-desc">
                      {hostName}
                      !
                      <br />
                      Your booking is not yet accepted
                      <br />
                      <br />
                    </div>
                  )}
                  */}

                  {alreadyBooked && bookingData.communication === 'Video' && (
                    
                      <div id="videoContainer">
                        <video
                          id="localVideo"
                          style={{
                            width: '55%',
                            backgroundColor: 'grey',
                          }}
                          ref={(ref) => {
                            localVideo = ref;
                          }}
                          muted
                          autoPlay
                        />

                        <video
                          id="remoteVideo"
                          style={{
                            width: '89%',
                            backgroundColor: 'light-grey',
                          }}
                          ref={(ref) => {
                            remoteVideo = ref;
                          }}
                          autoPlay
                        />
                      </div>
                  
                  )}
                  </div>
                </div>
              

              {alreadyBooked
                && (bookingData.communication === 'Chat' || bookingData.communication === 'Video') && (
                  <div className="booking-card-2-com">

                    <button
                      type="submit"
                      className="reg-btn"
                      onClick={() => setDetailVisibility(!detailVisibility)}
                    >
                      Show only details
                    </button>

                    <div className="booking-box-com">
                      <div id="messagingWindow">
                        {messages.map((message, i) => (
                          <div className="msg" key={i}>
                            <div className="msg-sender">
                              <span>{message.sender}</span>
                              <span>
                                <i>{message.timestamp}</i>
                              </span>
                            </div>
                            <br />
                            <li className="msg-it">{message.msg}</li>
                            <br />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div id="messagingBox" className="book-com">
                      <textarea
                        placeholder="Press enter to send..."
                        onKeyDown={messageHandler}
                      />
                    </div>

                  </div>

              )}
              
            </div>
          </div>
        </>
      }

      <div className="booking">
        <div className="booking-con">
          <div className="booking-card-1">

            {alreadyBooked
              && (whoIsViewing === 'Client' || whoIsViewing === 'Host') && (
                <>
                  <div className="booking-sub-desc">
                    You are this booking&apos;s {whoIsViewing.toLowerCase()}.
                  </div>
                  {/* <div className="booking-host-name">{hostName}</div> */}
                  <div className="booking-sub-desc">
                    <br />
                    <br />
                    You will get connected with:&nbsp;
                    <br />
                    {whoIsViewing === 'Client' ? hostName : 
                    whoIsViewing === 'Host' ? clientName : null}
                    <br />
                    <br />
                    Status: {currentDurationStatus}
                    <br />
                  </div>


                {detailVisibility &&
                  <button
                    type="button"
                    className="reg-btn"
                    onClick={() => {
                      setDetailVisibility(!detailVisibility)
                  
                      if (bookingData.communication === 'Video') {
                        !ongoingCommunication && startTextChat()
                        startVideoChat()
                      }
                      if (bookingData.communication === 'Chat') {
                        !ongoingCommunication && startTextChat()
                      }
                      setOngoingCommunication(true)
                      
                    }}
                  >
                  {currentDurationStatus !== "Ongoing" ? (
                    <>
                      Start&nbsp;
                      {bookingData.communication && bookingData.communication.toLowerCase()}
                      &nbsp;communication
                      anyway
                    </>
                    
                    ) : (
                      <>
                        Start&nbsp;
                        {bookingData.communication && bookingData.communication.toLowerCase()}
                        &nbsp;communication
                      </>
                    )}
                  
                </button>
              }

              </>

            )}

            {bookingData && whoIsViewing === 'Guest' && !alreadyBooked && (
              <div className="booking-host-name">{hostName}</div>
            )}

            {whoIsViewing === 'Host' && !alreadyBooked && (
              <div className="booking-sub-desc">
                Hello
                <br />
                {hostName}
                !
                <br />
                <br />
                You are this booking&apos;s host.
                <br />
                <br />
                You don&apos;t have any client yet.
                <br />
                <br />
                Share the URL with someone you would like to connect with.
              </div>
            )}
          </div>

          <div className="booking-card-2">
            <div className="booking-box">
              <span
                className="book-title"
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  textTransform: 'capitalize',
                }}
              >
                {bookingData.name}
              </span>

              <span className="book-date">
                {moment(bookingData.date).format('MM/DD/YYYY - hh:mm')}
                <br />
                <span>
                  {bookingData.duration}
                  min
                </span>
                <br />
              </span>

              <div className="book-details">
                <i>{bookingData.communication}</i>
                {bookingData.fee === 1 && <i>Paid</i>}
                {bookingData.fee !== 1 && <i>Free</i>}
              </div>
            </div>

            {whoIsViewing === 'Guest' && !alreadyBooked && (
              <button
                type="submit"
                className="book"
                onClick={() => {
                  if (
                    // eslint-disable-next-line no-alert
                    window.confirm(
                      `Do you want to book ${
                        bookingData.name
                      } with ${hostName} on ${moment(bookingData.date).format(
                        'MM/DD/YYYY hh:mm',
                      )}`,
                    )
                  ) {
                    acceptBooking();
                  }
                }}
              >
                Accept booking
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
