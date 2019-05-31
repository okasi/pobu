import React, { useContext, useEffect, useState } from 'react';

import moment from 'moment';

import { AppContext } from '../../store/context';
import history from '../../store/history';

import VideoCall from '../../helpers/peer'

import './booking.css';


let localVideo
let remoteVideo
let peer

let localStream

let initiator = false


let videoCall = new VideoCall()

export default function Booking({ match }) {

  const [who, setWho] = useState('Guest');
  const [data, setData] = useState('');
  const [alreadyBooked, setAlreadyBooked] = useState(true);

  const [hostName, setHost] = useState('');
  const [clientName, setClient] = useState('');

  const [messages, setMessages] = useState([]);

  const [hasMedia, setHasMedia] = useState(false);

  // const [localStream, setLocalStream] = useState({});
  // const [remoteStreamUrl, setRemoteStreamUrl] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  // const [initiator, setInitiator] = useState(false)
  // const [peer, setPeer] = useState({})


  const { state, actions } = useContext(AppContext);


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

  function getUserMedia(cb) {
    return new Promise((resolve, reject) => {
      navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
      
      const op = {
        video: {
          width: { min: 160, ideal: 640, max: 1280 },
          height: { min: 120, ideal: 360, max: 720 },
        },
        audio: true
      }
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(op, stream => {
          localStream = stream
          localVideo.srcObject = stream
          resolve()
        }, () => { })
      }

      if (navigator.getWebcam) {
        navigator.getWebcam(op, stream => {
          localStream = stream
          localVideo.srcObject = stream
          resolve()
        }, () => { })
      }
      
    })
  }

  // First load
  useEffect(() => {
    (async function () {
      if (!await actions({ type: 'USER_GET_VALID_TOKEN' })) {
        history.push('/login');
        window.location.reload();
      }
    }());
    // eslint-disable-next-line
  }, [match.params.id])

  const enter = (roomId) => {
    peer = videoCall.init(localStream, initiator)
    peer.on('signal', data => {
      const signal = {
        room: roomId,
        desc: data
      }
      state.socket.emit('signal', signal)
    })

    peer.on('stream', stream => {
      console.log("Other: ")
      
      remoteVideo.srcObject = stream
      console.log(remoteVideo.srcObject)
    })
    peer.on('error', function (err) {
      console.log(err)
    })
  }

  const call = (otherId) => {
    videoCall.connect(otherId)
  }

  useEffect(() => {
    if (state.socket != undefined) {
      state.socket.on('RECEIVE_MESSAGE', function (msgData) {
        if (msgData.id === match.params.id) {
          setMessages(prevState => (
            [...prevState, msgData]
          ))
        }
      })

      getUserMedia().then(() => {
        state.socket.emit('join', { roomId: match.params.id })
      })
      state.socket.on('init', () => {
        initiator = true
      })
      state.socket.on('ready', () => {
        enter(match.params.id)
      })
      state.socket.on('desc', (data) => {
        if (data.type === 'offer' && initiator) return
        if (data.type === 'answer' && !initiator) return
        call(data)
      })
      state.socket.on('disconnected', () => {
        initiator = true
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


      {alreadyBooked && (data.communication === "Chat" || data.communication === "Voice" || data.communication === "Video") &&
        <center>
          <div id="messagingWindow">
            <ul>
              {messages.map((message, i) => {
                return (
                  <li style={{ backgroundColor: 'white' }} key={i}>
                    <small><i>{message.timestamp}</i></small>
                    <br></br>
                    <u>{message.sender}</u>
                    <br></br>
                    <b>{message.msg}</b>
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

      <center>
        <div id="videoContainer">
          <video id="localVideo" style={{ width: '40%', backgroundColor: 'blue' }} ref={(ref) => { localVideo = ref; }} muted autoPlay></video>
          <br></br>
          <video id="remoteVideo" style={{ width: '60%', backgroundColor: 'yellow' }} ref={(ref) => { remoteVideo = ref; }} autoPlay></video>
        </div>
      </center>




    </>
  );
}
