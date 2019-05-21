import React, { useState } from 'react';

export default function Booking({ match }) {


  const booking3 = {
    name:"Recruitment", 
    day:"Thursday, May 23rd 2019", 
    time:"05:15 pm", 
    fee: false, 
    theDuration: "50 min", 
    chat: true, 
    voice: true, 
    video: false, 
    nano: false,
    id: "/booking",
    clientName: "Lucky Luke",
  };
  
  return (
    <>
    <div className="booking">
      <div className="booking-con">
        <div className="booking-card-1">
          <div className="booking-sub-desc">
            Get connected with
          </div>
          <div className="booking-host-name">
            Lucky Luke
          </div>
        </div>

        <div className="booking-card-2">
          <div className="booking-box">      
            <span>
              {booking3.name}
            </span>
            <span className="book-date">
                {booking3.day}
                <br/>
                <span>
                  {booking3.time} - {booking3.theDuration}
                </span>
                <br/>
            </span>

            <div className="book-details">
                {/* <i>{booking3.theDuration}</i> */}
                <i>
                  {booking3.chat === true &&
                      <i> Chat</i>
                  }
                  {booking3.voice === true && 
                      <i>, Voice</i>
                  }
                  {booking3.video === true &&
                      <i>, Video</i>
                  }
                </i>
                {booking3.fee === true &&
                  <i> Paid </i>
                }
                {booking3.fee === false &&
                  <i>Free </i>
                }
            </div> 
          </div>
          <button className="book" onClick={()=> alert(`You have a ${booking3.name} booked with ${booking3.clientName}, ${booking3.day} - ${booking3.time}`)}>
            Book
          </button>
    
        </div>
        
      </div>
      </div>
    </>
  );
}
