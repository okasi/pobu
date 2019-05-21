import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
const Overview = () => {

   const booking1 = {
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
  
   const booking2 = {
      name:"Meeting",
      day:"Friday, May 31st 2019", 
      time:"03:15 pm", fee: false, 
      theDuration: "30 min", 
      chat: true, 
      voice: true, 
      video: true, 
      nano: false,
      id: "/booking",
      clientName: "John Doe",
   };

   const booking3 = {
      name:"Meeting",
      day:"Tuesday, May 21st 2019", 
      time:"07:15 pm",
      fee: false, 
      theDuration: "30 min", 
      chat: true, 
      voice: true, 
      video: true, 
      nano: false,
      id: "/booking",
      clientName: "John Doe",
   };

   const bookable1 = {
      name:"advisory services", 
      day:"Thursday, May 23rd 2019", 
      time:"05:15 pm", 
      fee: false, 
      theDuration: "50 min", 
      chat: true, 
      voice: true, 
      video: false, 
      nano: false,
      id: "/bookable",
      clientName: "You",
      link: "pobu.io/booking/123212",
   };
  
   const bookable2 = {
      name:"Lunch Meeting",
      day:"Friday, May 31st 2019", 
      time:"03:15 pm", fee: false, 
      theDuration: "30 min", 
      chat: true, 
      voice: true, 
      video: true, 
      nano: false,
      id: "/bookable",
      clientName: "You",
      link: "pobu.io/booking/32322",
   };

  
    return (
      <>
      <div className="bookable-con">
        {/* <h1>Overview</h1> */}
         <div className="bookable-con-sub">
            <h1>Bookings</h1>
            {/* <label style={{margin: '0', textAlign: 'right', fontSize:'15px'}}>
               Today:
            </label> */}
            {/* <NavLink to={booking3.id} style={{color: "#000", margin: "5px 0"}}> */}
            <div className="boxa"  style={{textAlign: 'right', margin: '5px 0'}}>
               <div style={{display: 'flex', justifyContent:'space-between'}}>
                 <button  onClick={() => alert("trying to delete")} className="deleteme" style={{color:'gray', background: 'none', border: 'none', padding: '0'}}>✖</button>
               <span style={{ fontWeight: '500', textTransform:'capitalize'}}>
                  {booking3.name}
                  <span style={{ fontWeight: '100', margin: '0 4px'}}>
                     with
                  </span>
                  {booking3.clientName}
               </span>
               </div>
               <span style={{ fontWeight: '100', fontSize: '14px', margin: '5px 0', padding: '5px 0',borderBottom: ' 0.5px solid #d4d4d4'}}>
                  {booking3.day}
                  <br/>
                  <span style={{fontSize: '16px'}}>
                     {booking3.time}
                  </span>
                  <br/>
               </span>
               <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', fontSize: '14px'}}>
                    <i>{booking3.theDuration}</i>
                    <i>
                        {booking3.chat == true &&
                           <i> Chat</i>
                        }
                        {booking3.voice == true && 
                           <i>, Voice</i>
                        }
                        {booking3.video == true &&
                           <i>, Video</i>
                        }
                    </i>
                     {booking3.fee == true &&
                        <i> Paid </i>
                     }
                     {booking3.fee == false &&
                        <i>Free </i>
                     }
               </div> 
            </div>
         {/* </NavLink> */}
   
         {/* <hr style={{width: "333px"}}></hr> */}
{/* 
            <NavLink to={booking1.id} style={{color: "#000", margin: "5px 0"}}> */}
               <div className="boxa"  style={{textAlign: 'right', margin: '5px 0'}}>
               <div style={{display: 'flex', justifyContent:'space-between'}}>
                    <button  onClick={() => alert("trying to delete")} className="deleteme" style={{color:'gray', background: 'none', border: 'none', padding: '0'}}>✖</button>
                  <span style={{ fontWeight: '500', textTransform:'capitalize'}}>
                     {booking1.name}
                     <span style={{ fontWeight: '100', margin: '0 4px'}}>
                        with
                     </span>
                     {booking1.clientName}
                  </span>
               </div>
                  <span style={{ fontWeight: '100', fontSize: '14px', margin: '5px 0', padding: '5px 0',borderBottom: ' 0.5px solid #d4d4d4'}}>
                     {booking1.day}
                     <br/>
                     <span style={{fontSize: '16px'}}>
                        {booking1.time}
                     </span>
                     <br/>
                  </span>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', fontSize: '14px'}}>
                     <i>{booking1.theDuration}</i>
                     <i>
                           {booking1.chat == true &&
                              <i> Chat</i>
                           }
                           {booking1.voice == true && 
                              <i>, Voice</i>
                           }
                           {booking1.video == true &&
                              <i>, Video</i>
                           }
                     </i>
                        {booking1.fee == true &&
                           <i> Paid </i>
                        }
                        {booking1.fee == false &&
                           <i>Free </i>
                        }
                  </div> 
               </div>
            {/* </NavLink> */}

            {/* <NavLink to={booking2.id} style={{color: "#000", margin: "5px 0"}}> */}
            <div className="boxa"  style={{textAlign: 'right', margin: '5px 0'}}>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
                 <button  onClick={() => alert("trying to delete")} className="deleteme" style={{color:'gray', background: 'none', border: 'none', padding: '0'}}>✖</button>
               <span style={{ fontWeight: '500', textTransform:'capitalize'}}>
                  {booking2.name} 
                  <span style={{ fontWeight: '100', margin: '0 4px'}}>
                     with
                  </span>
                  {booking2.clientName}
               </span>
               </div>
               <span style={{ fontWeight: '100', fontSize: '14px', margin: '5px 0', padding: '5px 0',borderBottom: ' 0.5px solid #d4d4d4'}}>
                  {booking2.day}
                  <br/>
                  <span style={{fontSize: '16px'}}>
                     {booking2.time}
                  </span>
                  <br/>
               </span>
               <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', fontSize: '14px'}}>
                    <i>{booking2.theDuration}</i>
                    <i>
                        {booking2.chat == true &&
                           <i> Chat</i>
                        }
                        {booking2.voice == true && 
                           <i>, Voice</i>
                        }
                        {booking2.video == true &&
                           <i>, Video</i>
                        }
                    </i>
                     {booking2.fee == true &&
                        <i> Paid </i>
                     }
                     {booking2.fee == false &&
                        <i>Free </i>
                     }
               </div> 
            </div>
         {/* </NavLink> */}
         </div>

        <div className="bookable-con-sub">
            <span style={{display: 'flex', justifyContent: 'space-between'}}>
               <h1>Your Bookables</h1>
               <NavLink to="/bookable">
                  <h1>+</h1>
               </NavLink>
            </span>

            
            {/* <NavLink to={bookable1.id} style={{color: "#000", margin: "5px 0"}}> */}
               <div className="boxa"  style={{textAlign: 'right', margin: '5px 0'}}>
               <div style={{display: 'flex', justifyContent:'space-between'}}>
                 <button  onClick={(e) => { if (window.confirm(`Do you want to delete ${bookable1.name} with ${bookable1.clientName}?`)) window.onCancel(alert('Deleted')) } }  className="deleteme" style={{color:'gray', background: 'none', border: 'none', padding: '0'}}>✖</button>
                   <span style={{ fontWeight: '500', textTransform:'capitalize'}}>
                     {bookable1.name}
                     <span style={{ fontWeight: '100', margin: '0 4px'}}>
                        with
                     </span>
                     {bookable1.clientName}
                  </span>
                  </div>
                
                  <span style={{ fontWeight: '100', fontSize: '14px', margin: '5px 0', padding: '5px 0',borderBottom: ' 0.5px solid #d4d4d4'}}>
                     {bookable1.day}
                     <br/>
                     <span style={{fontSize: '16px'}}>
                        {bookable1.time}
                     </span>
                     <br/>
                  </span>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', fontSize: '14px'}}>
                        <i>{bookable1.theDuration}</i>
                        <i>
                           {bookable1.chat == true &&
                              <i> Chat</i>
                           }
                           {bookable1.voice == true && 
                              <i>, Voice</i>
                           }
                           {bookable1.video == true &&
                              <i>, Video</i>
                           }
                        </i>
                        {bookable1.fee == true &&
                           <i> Paid </i>
                        }
                        {bookable1.fee == false &&
                           <i>Free </i>
                        }
                  </div> 
                  <i style={{marginTop: '10px', textAlign: 'left', fontSize:'13px', boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)', padding: '5px', borderRadius:'8px',background:'paleturquoise'}}>
                     {/* URL:   */}
                     <a href={bookable1.link}>
                      {bookable1.link}
                     </a>
                  </i>
               </div>
            {/* </NavLink> */}
           
          
            {/* <NavLink to={bookable2.id} style={{color: "#000", margin: "5px 0"}}> */}
               <div className="boxa"  style={{textAlign: 'right', margin: '5px 0'}}>
               <div style={{display: 'flex', justifyContent:'space-between'}}>
                 <button onClick={() => alert("trying to delete")} className="deleteme" style={{color:'gray', background: 'none', border: 'none', padding: '0'}}>✖</button>
                  <span style={{ fontWeight: '500', textTransform:'capitalize'}}>
                     {bookable2.name} 
                     <span style={{ fontWeight: '100', margin: '0 4px'}}>
                        with
                     </span>
                     {bookable2.clientName}
                  </span>
                  </div>
                  <span style={{ fontWeight: '100', fontSize: '14px', margin: '5px 0', padding: '5px 0',borderBottom: ' 0.5px solid #d4d4d4'}}>
                     {bookable2.day}
                     <br/>
                     <span style={{fontSize: '16px'}}>
                        {bookable2.time}
                     </span>
                     <br/>
                  </span>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', fontSize: '14px'}}>
                     <i>{bookable2.theDuration}</i>
                     <i>
                           {bookable2.chat == true &&
                              <i> Chat</i>
                           }
                           {bookable2.voice == true && 
                              <i>, Voice</i>
                           }
                           {bookable2.video == true &&
                              <i>, Video</i>
                           }
                     </i>
                        {bookable2.fee == true &&
                           <i> Paid </i>
                        }
                        {bookable2.fee == false &&
                           <i>Free </i>
                        }
                  </div> 
                 
                  <i style={{marginTop: '10px', textAlign: 'left', fontSize:'13px', boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)', padding: '5px', borderRadius:'8px',background:'paleturquoise'}}>
                     <a href={bookable2.link}>
                      {bookable2.link}
                     </a>
                  </i>
               </div>
            {/* </NavLink>    */}

          
        </div>

      </div>
   </>
    )

}

export default Overview