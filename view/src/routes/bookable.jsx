import React, { useState } from 'react';
import moment from 'moment';
var day = moment().date();
var month = moment().month();
var year= moment().year();
var hour =moment().hour();





var days = [];
for (var i = day; i < 31; i++) {
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
for (var i = 1; i < 61; i++) {
  minutes.push(<option value={i}>{i}</option>);
}





export default function Bookable({ match }) {



  return (

    
    <>

    
      <div className="bookable-con">
        <div className="bookable-con-sub">
          <h1>Add bookables</h1>
          <input type="text" placeholder="Type of..."/>

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
          <div className="form-input">
            <select className="time-sel">
              <option value="" disabled>day</option>
              {days}
            </select>
            <label style={{margin:'auto 2px', color: 'black', fontSize:25}}>/</label>
            <select className="time-sel">
              <option value="" disabled>month</option>
             {months}
            </select>
            <label style={{margin:'auto 2px', color: 'black', fontSize:25}}>/</label>
            <select className="time-sel">
              <option value="" disabled>year</option>
             {years}
            </select>
          </div>

            <br/>

          <label style={{margin:'0'}}>
            Avalible hour intervals:
          </label>
          <div className="form-input">
            <select className="time-sel">
              <option value="" disabled>Hour</option>
              {hours}
            </select>
            <label style={{margin:'auto 2px', color: 'black', fontSize:25}}>:</label>
            <select className="time-sel">
              <option value="" disabled>Minute:</option>
              {minutes}
            </select>

            <label style={{margin:'auto'}}>
              to:
            </label>

            <select className="time-sel">
              <option value="" disabled>Hour</option>
              {hours}
            </select>
            <label style={{margin:'auto 2px', color: 'black', fontSize:25}}>:</label>
            <select className="time-sel">
              <option value="" disabled>Minute:</option>
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
              <select>
                <option value="" disabled>Duration:</option>
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
              <input type="checkbox" value="Paid" name="paid"/>
              <label for="paid" style={{margin: 'auto 10px auto 0'}}>Paid</label>
          
              <input type="checkbox" value="free" name="free"/>
              <label for="paid" style={{margin: 'auto 10px auto 0'}}>free</label>
            </div>

            <br/>

          <label for="communication" style={{margin:'0',fontWeight: 'bold'}}>
            Communication:
          </label>
          <div className="form-input" name="communication" >
              <input type="checkbox" value="text" name="text"/>
              <label for="text" style={{margin: 'auto 10px auto 0'}}>Text</label>
          
              <input type="checkbox" value="voice" name="voice"/>
              <label for="voice" style={{margin: 'auto 10px auto 0'}}>Voice</label>

              <input type="checkbox" value="video" name="Video"/>
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
          <div className="box">
          </div>
        </div>    
      </div>
    </>
  );
}
