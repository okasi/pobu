import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { AppContext } from '../store/context';

const Overview = () => {

   const { state, actions } = useContext(AppContext);

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

   // const booking2 = {
   //    name:"Meeting",
   //    day:"Friday, May 31st 2019", 
   //    time:"03:15 pm", fee: false, 
   //    theDuration: "30 min", 
   //    chat: true, 
   //    voice: true, 
   //    video: true, 
   //    nano: false,
   //    id: "/booking",
   //    clientName: "John Doe",
   // };

   // const booking3 = {
   //    name:"Meeting",
   //    day:"Tuesday, May 21st 2019", 
   //    time:"07:15 pm",
   //    fee: false, 
   //    theDuration: "30 min", 
   //    chat: true, 
   //    voice: true, 
   //    video: true, 
   //    nano: false,
   //    id: "/booking",
   //    clientName: "John Doe",
   // };

   const bookable1 = {
      name: "advisory services",
      day: "Thursday, May 23rd 2019",
      time: "05:15 pm",
      fee: false,
      theDuration: "50 min",
      chat: true,
      voice: true,
      video: false,
      nano: false,
      id: "0293248247",
      clientName: "You",
   };

   // const bookable2 = {
   //    name: "Lunch Meeting",
   //    day: "Friday, May 31st 2019",
   //    time: "03:15 pm", fee: false,
   //    theDuration: "30 min",
   //    chat: true,
   //    voice: true,
   //    video: true,
   //    nano: false,
   //    id: "/bookable",
   //    clientName: "You",
   //    link: "pobu.io/booking/32322",
   // };


   return (
      <>
         <div className="overview-container">
            {/* <h1>Overview</h1> */}
            <div className="overview-card">
               <h1>Bookings</h1>

               {/* En booking ser ut såhär: http://prntscr.com/nrvar4 */}


               {state.user && state.user.bookings.map(booking => {
                  return (
                     <div className="overview-sub-card" key={booking._id}>
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
                        <span className="sub-card-date">
                           {booking1.day}
                           <br />
                           <span>
                              {booking1.time}
                           </span>
                           <br />
                        </span>

                        <div className="sub-card-details">
                           <i>{booking1.theDuration}</i>
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
                  )
               })}


               {/* <NavLink to={booking1.id} style={{color: "#000", margin: "5px 0"}}> */}
               {/*
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
                  <span className="sub-card-date">
                     {booking2.day}
                     <br/>
                     <span>
                        {booking2.time}
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
               */}
               {/* </NavLink> */}

               {/* <NavLink to={booking2.id} style={{color: "#000", margin: "5px 0"}}> */}
               {/*
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
               */}
               {/* </NavLink> */}
            </div>

            <div className="overview-card">
               <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h1>Your Bookables</h1>
                  <NavLink to="/bookable">
                     <h1>+</h1>
                  </NavLink>
               </span>

               {/* <NavLink to={bookabledata.id} style={{color: "#000", margin: "5px 0"}}> */}
               <div className="overview-sub-card">
                  <div className="sub-card-top">
                     <button  onClick={(e) => { if (window.confirm(`Do you want to delete ${bookable1.name} with ${bookable1.clientName}?`)) window.onCancel(alert('Deleted')) } }  className="deleteme" style={{color:'gray', background: 'none', border: 'none', padding: '0'}}>✖</button>
                     <span>
                        {bookable1.name}
                        <span>
                           with
                        </span>
                        {bookable1.clientName}
                     </span>
                  </div>

                  <span className="sub-card-date">
                     {bookable1.day}
                     <br />
                     <span>
                        {bookable1.time}
                     </span>
                     <br />
                  </span>
                  <div className="sub-card-details">
                     <i>{bookable1.duration}</i>
                     <i>
                        {bookable1.chat === true &&
                           <i> Chat</i>
                        }
                        {bookable1.voice === true &&
                           <i>, Voice</i>
                        }
                        {bookable1.video === true &&
                           <i>, Video</i>
                        }
                     </i>
                     {bookable1.fee === 1 &&
                        <i> Paid </i>
                     }
                     {bookable1.fee != 1 &&
                        <i>Free </i>
                     }
                  </div>

                  <i className="sub-card-urlbox">
                     <a href="">
                        pobu.io/
                     </a>
                  </i>
               </div>
               {/* </NavLink> */}


               {/* <NavLink to={bookable2.id} style={{color: "#000", margin: "5px 0"}}> */}
               {/*
               <div className="overview-sub-card">
                  <div className="sub-card-top">
                  <button onClick={() => alert("trying to delete")}>✖</button>
                     <span>
                        {bookable2.name} 
                        <span>
                           with
                        </span>
                        {bookable2.clientName}
                     </span>
                  </div>
                  <span className="sub-card-date">
                     {bookable2.day}
                     <br/>
                     <span>
                        {bookable2.time}
                     </span>
                     <br/>
                  </span>
                  <div className="sub-card-details">
                     <i>{bookable2.theDuration}</i>
                     <i>
                        {bookable2.chat === true &&
                           <i> Chat</i>
                        }
                        {bookable2.voice === true && 
                           <i>, Voice</i>
                        }
                        {bookable2.video === true &&
                           <i>, Video</i>
                        }
                     </i>
                     {bookable2.fee === true &&
                        <i> Paid </i>
                     }
                     {bookable2.fee === false &&
                        <i>Free </i>
                     }
                  </div> 
                  
                  <i className="sub-card-urlbox">
                     <a href={bookable2.link}>
                        {bookable2.link}
                     </a>
                  </i>
               </div>
               */}
               {/* </NavLink> */}
            </div>
         </div>
      </>
   )

}

export default Overview;