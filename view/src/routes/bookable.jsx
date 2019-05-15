import React, { useState } from 'react';

export default function Bookable({ match }) {
  return (
    <>
      <div className="bookable-con">
        <div className="bookable-con-sub">
          <h1>Add bookables</h1>
          <input type="text" placeholder="Type of..."/>

            <br/>
            <br/>

          <label for="date" style={{margin:'0'}}>
            Avalible dates:
          </label>
          <div className="form-input" name="date">
            <select>
              <option value="" disabled>Dates:</option>
              <option value="23">23/5</option>
              <option value="24">24/5</option>
              <option value="25">25/5</option>
              <option value="26">26/5</option>
            </select>
            <button>
              Add
            </button>
          </div>

            <br/>

          <label style={{margin:'0'}}>
            Avalible hour intervals:
          </label>
          <div className="form-input">
            <select className="time-sel">
              <option value="" disabled>Hour</option>
              <option value="mon">12</option>
              <option value="mon">12</option>
            </select>
            <label style={{margin:'auto 2px', color: 'black', fontSize:25}}>:</label>
            <select className="time-sel">
              <option value="" disabled>Minute:</option>
              <option value="mon">23</option>
              <option value="Tue">13</option>
            </select>

            <label style={{margin:'auto'}}>
              to:
            </label>

            <select className="time-sel">
              <option value="" disabled>Hour</option>
              <option value="mon">12</option>
              <option value="mon">12</option>
            </select>
            <label style={{margin:'auto 2px', color: 'black', fontSize:25}}>:</label>
            <select className="time-sel">
              <option value="" disabled>Minute:</option>
              <option value="mon">23</option>
              <option value="Tue">13</option>
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
