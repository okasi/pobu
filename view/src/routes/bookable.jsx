import React, { useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { bookingCreate } from '../services/api';


export default function Bookable({ match }) {
 
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

  const [theDuration, setTheDuration] = useState(null);

  const [selDate, setSelDate] = useState(null);



  async function onCreateSubmit() {

    const date = moment(day + ' ' + time, 'dddd, MMMM Do YYYY HH:mm hh:mm a').toDate();

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
  

  }

 
  return (
   
    <>
      <div className="bookable-con">
        <div className="bookable-con-sub">
          <h1>Add bookable</h1>

          <label for="Name" style={{margin:'0'}}>
            Name:
            {/* <b>{name}</b> */}
          </label>
          <input
            style={{textTransform: 'capitalize'}} 
            type="text" 
          
            value={name}
            onChange={e => setName(e.target.value)}
            name="name"
          />

            <br/>
        
          <label style={{margin:'0'}}>
            Select Date :
          </label>
          <DatePicker
            selected={selDate}
            onChange={input =>  setDay(moment(input).format("dddd, MMMM Do YYYY"))}
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText={day}
            minDate={moment().toDate()}
          />

            <br/>

          <label style={{margin:'0'}}>
            Select Time:
            {/* <b>{time}</b> */}
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
        
            <br/>

          <label for="duration" style={{margin:'0'}}>
            Duration:
            {/* <b>{theDuration}</b> */}
          </label>
          <div className="form-input" name="duration">
            <select onChange={e => setTheDuration(e.target.value+" min")}>
              <option value="" disabled selected>Duration:</option>
              <option value="10">10 min</option>
              <option value="20">20 min</option>
              <option value="30">30 min</option>
              <option value="40">40 min</option>
              <option value="50">50 min</option>
              <option value="60">60 min</option>
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
              // onClick={ () => setFee(1)}
              onClick={ () => setFee(!fee)}
            />
            <label for="paid" style={{margin: 'auto 10px auto 0'}}>
              Paid
            </label>

            {fee == true &&
              <label style={{margin:'0', fontWeight: 'bold'}}>
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

          <label for="communication" style={{margin:'0',fontWeight: 'bold'}}>
            Communication:
            {/* {chat} {voice} {video} */}
          </label>
          <div className="form-input" name="communication" >
            <input 
              type="checkbox" 
              value={chat} 
              name="chat"
              // onClick={ () => setChat(!chat)}
              checked
            />
            <label for="text" style={{margin: 'auto 10px auto 0'}}>
              Chat
            </label>
          
            <input
              type="checkbox" 
              value={voice} 
              name="voice"
              onClick={ () => setVoice(!voice)}
            />
            <label for="voice" style={{margin: 'auto 10px auto 0'}}>
              Voice
            </label>

            <input 
              type="checkbox"
              value={video}
              name="Video"
              onClick={ () => setVideo(!video)}
            />
            <label for="Video" style={{margin: 'auto 10px auto 0'}}>
              Video
            </label>


            {/* <input type="checkbox" value="irl" name="IRL"/>
            <label for="irl" style={{margin: 'auto 10px auto 0'}}>
              IRL
            </label> */}
          </div>

          {/* <div className="form-input" name="fee">
            <input 
              type="checkbox" 
              value={irl} 
              name="irl"
              // onClick={ () => setFee(1)}
              onClick={ () => setIrl(!irl)}
            />
            <label for="paid" style={{margin: 'auto 10px auto 0'}}>
              IRL
            </label>

            {irl == true &&
              <label style={{margin:'0', fontWeight: 'bold'}}>
                Location
                <input 
                type="text" 
                name="location"
                onChange={e => setLocation(e.target.value)}
                />
              </label>
            }
          </div> */}

          <div className="boxa"  style={{textAlign: 'right'}}>
            <span style={{ fontWeight: '500', textTransform:'capitalize'}}>{name}</span>
            <span style={{ fontWeight: '100', fontSize: '14px', margin: '5px 0', padding: '5px 0',borderBottom: ' 0.5px solid #d4d4d4'}}>
              {day}
              <br/>
              <span style={{fontSize: '16px'}}>{time}</span>
              <br/>
              
              {/* {irl == true &&
                <i style={{fontSize: '12px'}}>@{location}</i>
              } */}
            
            </span>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', fontSize: '14px'}}>
              <i>{theDuration}</i>
              <i>
                {chat == true &&
                  <i> Chat</i>
                }
                {voice == true && 
                  <i>, Voice</i>
                }
                {video == true &&
                  <i>, Video</i>
                }
              </i>

             

              {fee == true &&
                <i> Paid </i>
              }
              { fee == false &&
                <i>Free </i>
              }
             
             
            </div> 
            {/* Checks if wallet key is vaild by checking that it has 8 digits atm */}
            {fee == true && nano.length == 8 &&
              <i style={{fontSize: '12px'}}>Payment Added</i>
            }

            {/* Checks if there is any input yet for the key*/}
            {fee == true && nano.length == 0 &&
              <i style={{fontSize: '12px'}}>Please add payment key</i>
            }

            {/* Checks if the key has an invaild count for the key*/}
            {fee == true &&  nano.length >= 1 && nano.length < 8 && 
              <i style={{fontSize: '12px'}}>Invaild key</i>
            }
           
          </div>

          <button style={{width: 150}} className="reg-btn" onClick={onCreateSubmit}>
            Create bookable
          </button>
        </div>

      </div>
    </>
  );
}
