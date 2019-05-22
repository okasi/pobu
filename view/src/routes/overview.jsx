import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
const Overview = () => {

   const booking1 = {
      name:"Recruitment", 
      day:"Thursday, May 23rd 2019", 
      time:"05:15 pm", 
      fee: false, 
      duration: "50 min", 
      chat: true, 
      voice: true, 
      video: false, 
      nano: false,
      id: "/booking",
      clientName: "Lucky Luke",
      who: "Host",
   };
  
   const booking2 = {
      name:"Meeting",
      day:"Friday, May 31st 2019", 
      time:"03:15 pm", fee: false, 
      duration: "30 min", 
      chat: true, 
      voice: true, 
      video: true, 
      nano: false,
      id: "/booking",
      clientName: "John Doe",
      who: "Guest",
   };


   const bookabledata = {
      name:"advisory services", 
      day:"2019-06-01", 
      time:"17:15", 
      fee: false, 
      duration: "50 min", 
      chat: true, 
      voice: true, 
      video: false, 
      nano: false,
      id: "0293248247",
      clientName: "You",
   };

   const link = `booking/${bookabledata.id}`
  

  
   return (
      <>
         <div className="overview-container">
            {/* <h1>Overview</h1> */}
            <div className="overview-card">
               <h1>Bookings</h1>
              
      
               {/* <NavLink to={booking1.id} style={{color: "#000", margin: "5px 0"}}> */}
               <div className="overview-sub-card">
                  <div className="sub-card-top">
                     <button onClick={() => alert("trying to delete")}>✖</button>
                     <span>
                        {booking1.name}
                        <span>
                           with
                        </span>
                        {booking1.clientName}
                     </span>
                  </div>
                  <div className="sub-card-top">
                     <span>
                        <br/>
                        <span style={{textTransform: 'capitalize', padding: 4, fontSize: 12, margin: 'auto', borderRadius: 5, background: '#fbc7c7'}}>{booking1.who}</span>
                     </span>
                     <span className="sub-card-date">
                        {booking1.day}
                        <br/>
                        <span>
                           {booking1.time}
                        </span>
                        <br/>
                     </span>
                  </div>
                  <div className="sub-card-details">
                     <i>{booking1.duration}</i>
                     <i>
                        {booking1.chat === true &&
                           <i> Chat</i>
                        }
                        {booking1.voice === true && 
                           <i>, Voice</i>
                        }
                        {booking1.video === true &&
                           <i>, Video</i>
                        }
                     </i>
                     {booking1.fee === true &&
                        <i> Paid </i>
                     }
                     {booking1.fee === false &&
                        <i>Free </i>
                     }
                  </div> 
               </div>
               {/* </NavLink> */}

               {/* <NavLink to={booking2.id} style={{color: "#000", margin: "5px 0"}}> */}
               <div className="overview-sub-card">
                  <div className="sub-card-top">
                     <button onClick={() => alert("trying to delete")}>✖</button>
                     <span>
                        {booking2.name} 
                        <span>
                           with
                        </span>
                        {booking2.clientName}
                     </span>
                  </div>
                  <div className="sub-card-top">
                     <span>
                        <br/>
                        <span style={{textTransform: 'capitalize', padding: 4, fontSize: 12, margin: 'auto', borderRadius: 5, background: '#fbc7c7'}}>{booking2.who}</span>
                     </span>  

                  <span className="sub-card-date">
                     {booking2.day}
                     <br/>
                     <span>
                        {booking2.time}
                     </span>
                     <br/>
                  </span>
                  </div>
                  <div className="sub-card-details">
                     <i>{booking2.duration}</i>
                     <i>
                        {booking2.chat === true &&
                           <i> Chat</i>
                        }
                        {booking2.voice === true && 
                           <i>, Voice</i>
                        }
                        {booking2.video === true &&
                           <i>, Video</i>
                        }
                     </i>
                     {booking2.fee === true &&
                        <i> Paid </i>
                     }
                     {booking2.fee === false &&
                        <i>Free </i>
                     }
                  </div> 
               </div>
               {/* </NavLink> */}
            </div>

            <div className="overview-card">
               <span style={{display: 'flex', justifyContent: 'space-between'}}>
                  <h1>Your Bookables</h1>
                  <NavLink to="/bookable">
                     <h1>+</h1>
                  </NavLink>
               </span>

               {/* <NavLink to={bookabledata.id} style={{color: "#000", margin: "5px 0"}}> */}
               <div className="overview-sub-card">
                  <div className="sub-card-top">
                     <button  onClick={(e) => { if (window.confirm(`Do you want to delete ${bookabledata.name} with ${bookabledata.clientName}?`)) window.onCancel(alert('Deleted')) } }  className="deleteme" style={{color:'gray', background: 'none', border: 'none', padding: '0'}}>✖</button>
                     <span>
                        {bookabledata.name}
                        <span>
                           with
                        </span>
                        {bookabledata.clientName}
                     </span>
                  </div>
                  
                  <span className="sub-card-date">
                     {bookabledata.day}
                     <br/>
                     <span>
                        {bookabledata.time}
                     </span>
                     <br/>
                  </span>
                  <div className="sub-card-details">
                     <i>{bookabledata.duration}</i>
                     <i>
                        {bookabledata.chat === true &&
                           <i> Chat</i>
                        }
                        {bookabledata.voice === true && 
                           <i>, Voice</i>
                        }
                        {bookabledata.video === true &&
                           <i>, Video</i>
                        }
                     </i>
                     {bookabledata.fee === 1 &&
                        <i> Paid </i>
                     }
                     {bookabledata.fee != 1 &&
                        <i>Free </i>
                     }
                  </div> 

                  <i className="sub-card-urlbox">
                     <a href={link}>
                        pobu.io/{link}
                     </a>
                  </i>
               </div>
               {/* </NavLink> */}
            
            </div>
         </div>
      </>
   )

}

export default Overview