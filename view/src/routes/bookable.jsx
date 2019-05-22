import React, { useState, useContext } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { withRouter } from 'react-router-dom';
import { bookingCreate, getUser } from '../services/api';

import { AppContext } from '../store/context';

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const Bookable = withRouter(({ history }) => {

  const { state, actions } = useContext(AppContext);
 
  const [name, setName] = useState("");

  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
 
  const [fee, setFee] = useState(false);
  const [nano, setNano] = useState(false);

  // const [irl, setIrl] = useState(false);
  const [chat, setChat] = useState(true);
  const [voice, setVoice] = useState(false);
  const [video, setVideo] = useState(false);

  // const [location, setLocation] = useState("");

  const [theDuration, setTheDuration] = useState(10);

  const [selDate, setSelDate] = useState(null);



  async function onCreateSubmit() {

    const date = (day + ' ' + time);

    const communication = (() => {
      if (video) {
        return "Video"
      }
      if (voice) {
        return "Voice"
      }
      if (chat) {
        return "Chat"
      }
    })();

    const duration = parseInt(theDuration, 10)
    
    let objId = await bookingCreate(
      { 
        name, 
        date,
        ...fee && {fee},
        ...nano && {nano},
        communication,
        duration,
      }
    )

    alert(objId)

    history.replace(`/booking/${objId}`);

    let data = await getUser()
    actions({
      type: 'setState',
      payload: { user: data }
    })

  }

 
  return (
   
    <>
      <div className="bookable-con">
        <div className="bookable-con-sub">
          <h1>Add bookable</h1>

          <label htmlFor="name" style={{marginBottom:'4px'}}>
            Name:
          </label>
          <input
            style={{textTransform: 'capitalize'}} 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
            name="name"
          />
          <BrowserView className="browserview">
            <br/>

            <label>
              Select Date :
            </label>
            <DatePicker
              selected={selDate}
              // onChange={input =>  setDay(moment(input).format("dddd, MMMM Do YYYY"))}
              onChange={input =>  setDay(moment(input).format("YYYY-MM-DD"))}
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText={day}
              minDate={moment().toDate()}
            />

              <br/>
              <br/>

            <label>
              Select Time:
            </label>
            <DatePicker
              selected={selDate}
              onChange={input =>  setTime(moment(input).format("hh:mm a"))}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              timeCaption="Time"
              placeholderText={time}
            />
          </BrowserView>
          <MobileView>
            
          <br/>

          <label>
            Select Date :
          </label>

          <input
                type="date"
                onChange={(e) =>  setDay(e.target.value)}
              ></input>

            <br/>
            <br/>

              <label>
                Select Time:
              </label>
              <input
                type="time"
                step="600"
                onChange={(e) =>  setTime(e.target.value)}
              ></input>
          </MobileView>

            <br/>

          <label htmlFor="duration" style={{marginBottom:'4px'}}>
            Duration:
          </label>
          <div className="form-input" name="duration">
            <select name="minutes" onChange={e => setTheDuration(e.target.value+" min")}>
              <option value="" disabled defaultValue>Duration:</option>
              <option value="10">10 min</option>
              <option value="20">20 min</option>
              <option value="30">30 min</option>
              <option value="40">40 min</option>
              <option value="50">50 min</option>
              <option value="60">60 min</option>
            </select>
          </div>

            <br/>

          <label htmlFor="fee" style={{fontWeight: 'bold'}}>
            Fee:
          </label>
          <div className="form-input" name="fee">
            <input 
              type="checkbox" 
              value={fee} 
              name="paid"
              onClick={ () => setFee(!fee)}
            />
            <label htmlFor="paid" style={{margin: 'auto 10px auto 0'}}>
              Paid
            </label>

            {fee === true &&
              <label style={{fontWeight: 'bold'}}>
                Nano Wallet Public Key
                <input 
                type="text" 
                name="nano"
                onChange={e => setNano(e.target.value)}
                maxlength="8"
                />
              </label>
            }
          </div>

            <br/>

          <label htmlFor="communication" style={{fontWeight: 'bold'}}>
            Communication:
          </label>
          <div className="form-input" name="communication" >
            <input 
              type="checkbox" 
              value={chat} 
              name="chat"
              // onClick={ () => setChat(!chat)}
              defaultChecked
              readOnly
            />
            <label htmlFor="text" style={{margin: 'auto 10px auto 0'}}>
              Chat
            </label>

            <input
              type="checkbox" 
              value={voice} 
              name="voice"
              onClick={ () => setVoice(!voice)}
            />
            <label htmlFor="voice" style={{margin: 'auto 10px auto 0'}}>
              Voice
            </label>

            <input 
              type="checkbox"
              value={video}
              name="Video"
              onClick={ () => setVideo(!video)}
            />
            <label htmlFor="Video" style={{margin: 'auto 10px auto 0'}}>
              Video
            </label>
            {/* <input type="checkbox" value="irl" name="IRL"/>
            <label for="irl" style={{margin: 'auto 10px auto 0'}}>
              IRL
            </label> */}
          </div>

          <div className="preview">
            <span className="prev-name">
              {name}
            </span>
            <span className="prev-day-time">
              {day}
              <br/>
              <span>{time}</span>
              <br/>
              {/* {irl === true &&
                <i style={{fontSize: '12px'}}>@{location}</i>
              } */}
            </span>

            <div className="prev-details">
              <i>{theDuration}</i>
              <i>
                {chat === true &&
                  <i> Chat</i>
                }
                {voice === true && 
                  <i>, Voice</i>
                }
                {video === true &&
                  <i>, Video</i>
                }
              </i>
              {fee === true &&
                <i> Paid </i>
              }
              { fee === false &&
                <i>Free </i>
              }
            </div> 

            {/* Checks if wallet key is vaild by checking that it has 8 digits atm */}
            {fee === true && nano.length === 8 &&
              <i style={{fontSize: '12px'}}>Payment Added</i>
            }
            {/* Checks if there is any input yet for the key*/}
            {fee === true && nano.length === 0 &&
              <i style={{fontSize: '12px'}}>Please add payment key</i>
            }
            {/* Checks if the key has an invaild count for the key*/}
            {fee === true &&  nano.length >= 1 && nano.length < 8 && 
              <i style={{fontSize: '12px'}}>Invaild key</i>
            }
          </div>
          <button className="reg-btn" onClick={onCreateSubmit}>
            Create bookable
          </button>
        </div>
      </div>
    </>
  );
})
export default Bookable;