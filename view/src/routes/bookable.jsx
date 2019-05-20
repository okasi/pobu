import React, { useState } from 'react';
import moment, { now } from 'moment';

import DatePicker from 'react-datepicker';


export default function Bookable({ match }) {
 
  const currentDate = moment().toString();
  const [choosen, setChoosen] = useState();
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [fee, setFee] = useState("");
  const [video, setVideo] = useState("");
  const [voice, setVoice] = useState("");
  const [chat, setChat] = useState("");
  const [theDuration, setTheDuration] = useState("");

  const [selDate, setSelDate] = useState("");
  
 
  return (
   
    <>
      <div className="bookable-con">
        <div className="bookable-con-sub">
          <h1>Add bookable</h1>

          <label for="type" style={{margin:'0'}}>
            Type:
            {/* <b>{type}</b> */}
          </label>
          <input 
            type="text" 
            placeholder="Type of..."
            value={type}
            onChange={e => setType(e.target.value)}
            name="type"
          />

            <br/>
        
          <label style={{margin:'0'}}>
            Select Date :
            {/* <b>{choosen}</b> */}
          </label>
          <DatePicker
            selected={selDate}
            onChange={input =>  setChoosen(''+  moment(input).format("dddd, MMMM Do YYYY"))}
            // showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
            // placeholderText="Pick date & time"
            placeholderText={choosen}
            // inline
          />

            <br/>

          <label style={{margin:'0'}}>
            Select Time:
            {/* <b>{time}</b> */}
          </label>
          <DatePicker
            selected={selDate}
            onChange={input =>  setTime(''+ moment(input).format("hh:mm"))}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            timeCaption="Time"
            placeholderText={time}
          />
        
            <br/>

          <label for="duration" style={{margin:'0'}}>
            Duration:
            {/* <b>{theDuration}</b> */}
          </label>
          <div className="form-input" name="duration">
            <select onChange={e => setTheDuration(e.target.value)}>
              <option value="" disabled selected>Duration:</option>
              <option value="10 min">10 min</option>
              <option value="20 min">20 min</option>
              <option value="30 min">30 min</option>
              <option value="40 min">40 min</option>
              <option value="50 min">50 min</option>
              <option value="60 min">60 min</option>
            </select>
            {/* <button>
              Add
            </button> */}
          </div>

            <br/>

          <label for="fee" style={{margin:'0', fontWeight: 'bold'}}>
            Fee:
            {/* {fee} */}
          </label>
          <div className="form-input" name="fee">
            <input 
              type="checkbox" 
              value={fee} 
              name="paid"
              onClick={ () => setFee(' Paid')}
            />
            <label for="paid" style={{margin: 'auto 10px auto 0'}}>
              Paid
            </label>

            <input
              type="checkbox"
              value={fee} 
              name="free"
              onClick={ () => setFee(' Free')}
            />
            <label for="paid" style={{margin: 'auto 10px auto 0'}}>
              free
            </label>
          </div>

            <br/>

          <label for="communication" style={{margin:'0',fontWeight: 'bold'}}>
            Communication:
            {/* {chat} {voice} {video} */}
          </label>
          <div className="form-input" name="communication" >
            <input 
              type="checkbox" 
              value={chat} 
              name="chat"
              onClick={ () => setChat(' Chat')}
            />
            <label for="text" style={{margin: 'auto 10px auto 0'}}>
              Chat
            </label>
          
            <input
              type="checkbox" 
              value={voice} 
              name="voice"
              onClick={ () => setVoice(' Voice')}
            />
            <label for="voice" style={{margin: 'auto 10px auto 0'}}>
              Voice
            </label>

            <input 
              type="checkbox"
              value={video}
              name="Video"
              onClick={ () => setVideo(' Video')}
            />
            <label for="Video" style={{margin: 'auto 10px auto 0'}}>
              Video
            </label>

            {/* <input type="checkbox" value="irl" name="IRL"/>
            <label for="irl" style={{margin: 'auto 10px auto 0'}}>
              IRL
            </label> */}
          </div>

          <div className="boxa"  style={{textAlign: 'right'}}>
            <span style={{ fontWeight: '500', textTransform:'capitalize'}}>{type}</span>
            <span style={{ fontWeight: '100', fontSize: '14px', margin: '5px 0', padding: '5px 0',borderBottom: ' 0.5px solid #d4d4d4'}}>
              {choosen}
              <br/>
              <span style={{fontSize: '16px'}}>{time}</span>
            </span>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', fontSize: '14px'}}>
              <i>{theDuration}</i>
              <i>{fee}</i>
              <i>
                {chat}
                {voice}
                {video}
              </i>
            </div>
          </div>

          <button style={{width: 150}} className="reg-btn">
            Add bookable
          </button>
        </div>

        {/* <div className="bookable-con-sub">
          <h1>Recent Bookables</h1>
          <div className="boxa">
            <h5>Type of Service:{type}</h5>
            <h5>Paid or free:{fee}</h5>
            <h5>Chat:{chat}</h5>
            <h5>Voice:{voice}</h5>
            <h5>Video:{video}</h5>
            <h5>Date:</h5>
            <h5>Duration: {theDuration} min</h5>
            <h5>Avaliable hours:</h5>
          </div>
        </div>     */}
      </div>
    </>
  );
}
