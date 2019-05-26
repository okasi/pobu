import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import { AppContext } from '../store/context';
import history from '../store/history';
import io from "socket.io-client";
import {Helmet} from "react-helmet";


export default function Booking({ match }) {

  const [who, setWho] = useState('Guest');
  const [data, setData] = useState('Guest');
  const [already, setAlready] = useState(true);

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

        if (!res.data._client) {
          setAlready(false)
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

  // First load
  useEffect(() => {
    (async function () {
      if (!await actions({ type: 'USER_GET_VALID_TOKEN' })) {
        history.push('/login');
        window.location.reload();
      }
    }());
  // eslint-disable-next-line
  }, [])

  // When changes to login & router url
  useEffect(() => {
    if (state.user) {
      checkBooking()
    }
  // eslint-disable-next-line
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

// SOCKET MAGIC

// var config = {
//   openSocket: function (config) {
//       var SIGNALING_SERVER = `${process.env.REACT_APP_API_URL}`,
//           defaultChannel = history.replace(/\/|:|#|%|\.|\[|\]/g, '');

//       var channel = config.channel || defaultChannel;
//       var sender = Math.round(Math.random() * 999999999) + 999999999;

//       io.connect(SIGNALING_SERVER).emit('new-channel', {
//           channel: channel,
//           sender: sender
//       });

//       var socket = io.connect(SIGNALING_SERVER + channel);
//       socket.channel = channel;
//       socket.on('connect', function () {
//           if (config.callback) config.callback(socket);
//       });

//       socket.send = function (message) {
//           socket.emit('message', {
//               sender: sender,
//               data: message
//           });
//       };

//       socket.on('message', config.onmessage);
//   },
//   onRemoteStream: function (media) {
//       var video = media.video;
//       video.setAttribute('id', media.stream.id);
//       videosContainer.appendChild(video);
//   },
//   onRemoteStreamEnded: function (stream) {
//       var video = document.getElementById(stream.id);
//       if (video) video.parentNode.removeChild(video);
//   },
//   onRoomFound: function (room) {
//       var alreadyExist = document.querySelector('button[data-broadcaster="' + room.broadcaster + '"]');
//       if (alreadyExist) return;

//       var tr = document.createElement('tr');
//       tr.innerHTML = '<td><strong>' + room.roomName + '</strong> shared a conferencing room with you!</td>' +
//           '<td><button class="join">Join</button></td>';
//       roomsList.appendChild(tr);

//       var joinRoomButton = tr.querySelector('.join');
//       joinRoomButton.setAttribute('data-broadcaster', room.broadcaster);
//       joinRoomButton.setAttribute('data-roomToken', room.broadcaster);
//       joinRoomButton.onclick = function () {
//           this.disabled = true;

//           var broadcaster = this.getAttribute('data-broadcaster');
//           var roomToken = this.getAttribute('data-roomToken');
//           captureUserMedia(function () {
//               conferenceUI.joinRoom({
//                   roomToken: roomToken,
//                   joinUser: broadcaster
//               });
//           });
//       };
//   }
// };

// var conferenceUI = conference(config);
// var videosContainer = document.getElementById('videos-container') || document.body;
// var roomsList = document.getElementById('rooms-list');

// document.getElementById('setup-new-room').onclick = function () {
//   this.disabled = true;
//   captureUserMedia(function () {
//       conferenceUI.createRoom({
//           roomName: 'Anonymous'
//       });
//   });
// };

// function captureUserMedia(success_callback, failure_callback) {
//   var video = document.createElement('video');
//   video.muted = true;
//   video.volume = 0;

//   video.setAttributeNode(document.createAttribute('autoplay'));
//   video.setAttributeNode(document.createAttribute('playsinline'));
//   video.setAttributeNode(document.createAttribute('controls'));

//   getUserMedia({
//       video: video,
//       onsuccess: function (stream) {
//           config.attachStream = stream;
//           videosContainer.appendChild(video);
//           success_callback();
//       }
//   });
// }


  function messageHandler(e){
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log(e.target.value)
    }

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

    {/* 
    <Helmet>
      <script src="https://cdn.webrtc-experiment.com/socket.io.js"> </script>
      <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
      <script src="https://cdn.webrtc-experiment.com/IceServersHandler.js"></script>
      <script src="https://cdn.webrtc-experiment.com/CodecsHandler.js"></script>
      <script src="https://cdn.webrtc-experiment.com/video-conferencing/RTCPeerConnection-v1.5.js"> </script>
      <script src="https://cdn.webrtc-experiment.com/video-conferencing/conference.js"> </script>
      <script>try{Typekit.load({ async: true })}catch(e){}</script>
    </Helmet>

    <button id="setup-new-room">Setup New Conference</button>
    <table style="width: 100%;" id="rooms-list"></table>
    <div id="videos-container"></div>
  */}

  {/* messagingBox
  <div id="messagingBox">
  <textarea onKeyDown={messageHandler}></textarea>
</div> */}



    </>
  );
}
