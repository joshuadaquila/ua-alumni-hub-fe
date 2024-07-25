import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarDay, faCalendarXmark, faCheck, faClock, faLocation, faLocationPin, faMapLocation, faPenClip, faRegistered, faTape, faUserAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import eventcover from "../resources/eventcover.jpg";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function EventCard(props) {
  const {id, title, description, date, time, location, capacity, registrationdeadline, accessing } = props;

  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('token'));
  const [registered, setRegistered] = useState(false);

  // useEffect(() => {
  //   // console.log(accessing)
  //   // if (accessing === "alumni") {
  //   //   console.log("The bearer is token")
  //   //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   // } else if (accessing === "user"){
  //   //   console.log("The bearer is ad")
  //   //   axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
  //   // }

  //   axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
  // }, [token, adminToken]);
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);
  

  useEffect(() => {
    const eventId = id; // replace with the actual event ID
    axios.get(`http://localhost:3001/checkEvent?eventid=${eventId}`)
     .then(response => {
        if (response.data.length === 0){
          setRegistered(false);
        }else{
          setRegistered(true);
        }
      })
     .catch(error => {
        console.log("error in home get events");
        console.log("I am the error")
        console.error(error);
        // logout();
      });
  }, []);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const day = dateObj.getDate();
    return `${month} ${day}, ${year}`;
  };

  const currentDate = new Date();
  const isRegistrationOpen = new Date(registrationdeadline) > currentDate;

  const registerEvent = async (event) => {
    event.preventDefault();
    const eventid = id;
    setLoading(true);
    if(!registered){
      try {
        const response = await axios.post('http://localhost:3001/registerEvent', {
          eventid
        }, { withCredentials: true });
        setLoading(false);
        setRegistered(true);
        // sendNotification(content);
        
      } catch (error) {
        setErrors([...errors, error.response?.status || "Unknown error"]);
        setLoading(false);
      }
    }else{
      try {
        const response = await axios.post('http://localhost:3001/cancelRegistration', {
          eventid
        }, { withCredentials: true });
        setLoading(false);
        setRegistered(false);
        // sendNotification(content);
        
      } catch (error) {
        setErrors([...errors, error.response?.status || "Unknown error"]);
        setLoading(false);
      }
      setRegistered(false);
    }
    
  };
  return (
    <div className='bg-orange-300 bg-opacity-20 mb-2 shadow-md rounded-md grid grid-cols-2 p-4 gap-4 eventcard'>
      <div className=''>
        <img src={eventcover} className='mr-2 h-full object-cover' />
      </div>
      <div className='flex flex-col justify-center items-start'>
        <div className='flex justify-center items-center'>
          <FontAwesomeIcon icon={faCalendarDay} /> 
          <p className='font-bold text-xl ml-2'>{title}</p>
        </div>
        
        {/* <div className='flex justify-center items-center'> 
          <p className='font-bold text-lg'>Subtitle</p>
        </div> */}

        <div className='flex flex-col justify-center items-start w-full ml-5 mt-3'>
          <div className='flex justify-center'>
            <div className='flex justify-center items-center border border-black shadow-md pl-2 pr-2 rounded-md'>
              <FontAwesomeIcon icon={faUserCheck} className='mr-2' />
              <p className='text-lg mr-2'>{capacity}</p>
            </div>
            <div className='flex justify-center items-center ml-2 border border-black shadow-md pl-2 pr-2 rounded-md'>
              <FontAwesomeIcon icon={faCalendarCheck} className='mr-2' />
              <p className='text-lg'>{formatDate(date)}</p>
            </div>
            
          </div>

          <div className='flex mt-2'>
            <div className='flex justify-center items-center border border-black shadow-md pl-2 pr-2 rounded-md'>
              <FontAwesomeIcon icon={faClock} className='mr-2' />
              <p className='text-lg mr-2'>{time}</p>
              
            </div>
            <p className='ml-2 mr-2'>-</p>
            <div className='flex justify-center items-center border border-black shadow-md pl-2 pr-2 rounded-md'>
              <FontAwesomeIcon icon={faClock} className='mr-2' />
              <p className='text-lg mr-2'>{time}</p>
            </div>
          </div>

          <div className='flex justify-center items-center border border-black shadow-md pl-2 pr-2 rounded-md mt-2'>
            <FontAwesomeIcon icon={faLocationPin} className='mr-2 ' />
            <p className='text-lg mr-2'>{location}</p>
          </div>
          <div className='flex justify-center items-center border border-black shadow-md pl-2 pr-2 rounded-md mt-2'>
            <FontAwesomeIcon icon={faCalendarXmark} className='mr-2' />
            <p className='text-lg mr-2'>{formatDate(registrationdeadline)}</p>
          </div>
        </div>

        <div className='text-left'>
          <p className='text-md mt-2'>{description}</p>
        </div>
        
        <div className={`${accessing === "user" ? "hidden" : "flex"} justify-center items-center w-full  
          mt-2 p-2 rounded-md`}>
            <div className={`w-40 ${registered? "bg-green-800" : "bg-slate-900" } text-white  rounded-md p-2 btn cursor-pointer`}>
              {registered? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faStar} size='lg' />}
              <button className='p-2' onClick={registerEvent} >{registered? "JOINED" : "JOIN"}</button>
            </div>
        </div>
      </div>

    </div>
  )
}

export default EventCard;