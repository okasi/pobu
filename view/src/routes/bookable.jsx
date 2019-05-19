import React, { useState } from 'react';
import moment from 'moment';

// import MultipleDatePicker from 'react-multiple-datepicker'

var day = moment().date();
var month = moment().month();
var year= moment().year();
var hour = moment().hour();




export default function Bookable({ match }) {
  var daysinmonth = moment().daysInMonth();


  var days = [];
  for (var i = day; i < daysinmonth+1; i++) {
    days.push(<option value={i}>{i}</option>);
  }
  
  var months = [];
  for (var i = month; i < 13; i++) {
    months.push(<option value={i}>{i}</option>);
  }
  
  var years = [];
  for (var i = year; i < 2025; i++) {
    years.push(<option value={i}>{i}</option>);
  }
  
  var hours = [];
  for (var i = 1; i < 25; i++) {
    hours.push(<option value={i}>{i}</option>);
  }
  
  var minutes= [];
  for (var i = 0; i < 61; i+=5) {
    minutes.push(<option value={i}>{i}</option>);
  }
  
  const [type, setType] = useState("");
  const [fee, setFee] = useState("");
  const [video, setVideo] = useState(" No");
  const [voice, setVoice] = useState(" No");
  const [chat, setChat] = useState(" No");
  const [theDay, setTheDay] = useState(day);
  const [theMonth, setTheMonth] = useState(month);
  const [theYear, setTheYear] = useState(year);
  const [theDuration, setTheDuration] = useState(0);
  const [Hour1, setHour1] = useState("--");
  const [Minute1, setMinute1] = useState("--");
  const [Hour2, setHour2] = useState("--");
  const [Minute2, setMinute2] = useState("--");


  
  return (
    

    
    <>


      <div className="bookable-con">
        <div className="bookable-con-sub">
        
          <h1>Add bookables</h1>

          <label for="type" style={{margin:'0'}}>
            Type: {type}
          </label>
          <input 
            type="text" 
            placeholder="Type of..."
            value={type}
            onChange={e => setType(e.target.value)}
            name="type"
          />
            <br/>
            <br/>
          
          {/* <label for="date" style={{margin:'0'}}>
            Avalible dates:
          </label>
          <div className="form-input" name="date">
            <select>
              <option value="" disabled>Dates:</option>
              <option value="23">{day}</option>
              <option value="24">24/5</option>
              <option value="25">25/5</option>
              <option value="26">26/5</option>
            </select>
            <select>
              <option value="" disabled>Dates:</option>
              <option value="23">{month}</option>
              <option value="24">24/5</option>
              <option value="25">25/5</option>
              <option value="26">26/5</option>
            </select>
            <button>
              Add
            </button>
          </div> */}

          <label style={{margin:'0'}}>
            Day/month/Year
          </label>
          
          {/*
          <MultipleDatePicker 
          onSubmit={dates => console.log("selected dates ", dates)}
        />
        */}

          {/* <div className="form-input">
            <select className="time-sel" multiple size="10" onChange={e => setTheDay(e.target.value)}>
              <option value="" disabled selected>Day</option>
              {days}
            </select>
            <label style={{margin:'auto 2px', color: 'black', fontSize:25}}>/</label>
            <select className="time-sel" onChange={e => setTheMonth(e.target.value)}>
              <option value="" disabled selected>Month</option>
             {months}
            </select>
            <label style={{margin:'auto 2px', color: 'black', fontSize:25}}>/</label>
            <select className="time-sel"  onChange={e => setTheYear(e.target.value)}>
              <option value="" disabled selected>Year</option>
             {years}
            </select>
            
          </div> */}

            <br/>

          <label style={{margin:'0'}}>
            Avalible hour intervals:
          </label>
          <div className="form-input">
            <select className="time-sel" onChange={e => setHour1(e.target.value)}>
              <option value="" disabled selected>Hour</option>
              {hours}
            </select>
            <label style={{margin:'auto 2px', color: 'black', fontSize:25}}>:</label>
            <select className="time-sel" onChange={e => setMinute1(e.target.value)}>
              <option value="" disabled selected>Minute:</option>
              {minutes}
            </select>

            <label style={{margin:'auto'}}>
              to:
            </label>

            <select className="time-sel" onChange={e => setHour2(e.target.value)}>
              <option value="" disabled selected>Hour</option>
              {hours}
            </select>
            <label style={{margin:'auto 2px', color: 'black', fontSize:25}}>:</label>
            <select className="time-sel" onChange={e => setMinute2(e.target.value)}>
              <option value="" disabled selected>Minute:</option>
              {minutes}
            </select>
            <button>
              Add
            </button>
          </div>

            <br/>

          <label for="duration" style={{margin:'0'}}>
            Duration:
          </label>
          <div className="form-input" name="duration">
              <select onChange={e => setTheDuration(e.target.value)}>
                <option value="" disabled selected>Duration:</option>
                <option value="10">10 min</option>
                <option value="20">20 min</option>
                <option value="30">30 min</option>
                <option value="40">40 min</option>
                <option value="50">50 min</option>
                <option value="60">60 min</option>
              </select>
              <button>
                Add
              </button>
            </div>

            <br/>

          <label for="fee" style={{margin:'0', fontWeight: 'bold'}}>
            Fee:
          </label>
          <div className="form-input" name="fee">
              <input 
                type="checkbox" 
                value={fee} 
                name="paid"
                onClick={ () => setFee(' Paid')}
                />
              <label for="paid" style={{margin: 'auto 10px auto 0'}}>Paid</label>
          
              <input
                type="checkbox"
                value={fee} 
                name="free"
                onClick={ () => setFee(' Free')}
              />
              <label for="paid" style={{margin: 'auto 10px auto 0'}}>free</label>
            </div>

            <br/>

          <label for="communication" style={{margin:'0',fontWeight: 'bold'}}>
            Communication:
          </label>
          <div className="form-input" name="communication" >
              <input 
                type="checkbox" 
                value={chat} 
                name="chat"
                onClick={ () => setChat(' Yes')}
                />
              <label for="text" style={{margin: 'auto 10px auto 0'}}>Chat</label>
          
              <input
                type="checkbox" 
                value={voice} 
                name="voice"
                onClick={ () => setVoice(' Yes')}
                />
              <label for="voice" style={{margin: 'auto 10px auto 0'}}>Voice</label>

              <input 
                type="checkbox"
                value={video}
                name="Video"
                onClick={ () => setVideo(' Yes')}
                />
              <label for="Video" style={{margin: 'auto 10px auto 0'}}>Video</label>

              <input type="checkbox" value="irl" name="IRL"/>
              <label for="irl" style={{margin: 'auto 10px auto 0'}}>IRL</label>
            </div>

          <button style={{width: 150}} className="reg-btn">
            Add to bookables
          </button>
        </div>

        <div className="bookable-con-sub">
          <h1>Recent Bookables</h1>
          <div className="boxa">
            <h5>Type of Service:{type}</h5>
            <h5>Paid or free:{fee}</h5>
            <h5>Chat:{chat}</h5>
            <h5>Voice:{voice}</h5>
            <h5>Video:{video}</h5>
            <h5>Date: {theDay}/{theMonth}/{theYear}</h5>
            <h5>Duration: {theDuration} min</h5>
            <h5>Avaliable hours: {Hour1}:{Minute1}  to {Hour2}:{Minute2}</h5>
          </div>
        </div>    
      </div>
    </>
  );
}
