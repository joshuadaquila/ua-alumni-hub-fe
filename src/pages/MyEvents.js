import React from 'react'
import Header from '../components/Header'
import EventCard from '../components/EventCard'
import UserHeader from '../components/users/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faCalendarCheck, faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import NotificationCard from '../components/NotificationCard'

function MyEvents ({ logout }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const [get, setGet] = useState("all");

  const [events, setEvents] = useState([]); // initialize an empty array to store events
  const [notification, setNotification] = useState(null);

  const [happeningEvents, setHappeningEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);
  
  useEffect(() => {
    axios.get('http://localhost:3001/getEvents')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log("error in home get events");
        console.error(error);
        logout();
      });
  }, [notification]);

  useEffect(() => {
    axios.get('http://localhost:3001/getPastEvents')
      .then(response => {
        setPastEvents(response.data);
      })
      .catch(error => {
        console.log("error in home get events");
        console.error(error);
        logout();
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/getFutureEvents')
      .then(response => {
        setFutureEvents(response.data);
      })
      .catch(error => {
        console.log("error in home get events");
        console.error(error);
        logout();
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/getHappeningEvents')
      .then(response => {
        setHappeningEvents(response.data);
      })
      .catch(error => {
        console.log("error in home get events");
        console.error(error);
        logout();
      });
  }, []);



  const getEvent = (toget) => {
    console.log(pastEvents);
    setGet(toget);
  }

  const renderEvents = (events) => (
    events.map((event) => (
      <EventCard
        id={event.eventid}
        key={event.eventid}
        title={event.title}
        description={event.description}
        date={event.date}
        time={event.time}
        location={event.location}
        capacity={event.capacity}
        registrationdeadline={event.registrationdeadline}
        accessing={"alumni"}
      />
    ))
  );

  return (
    <div className=' flex minbackground flex-col min-h-screen'>
      <Header />
      <div className=' mt-[6rem] pl-4 pr-4 pt-4 flex justify-center'>
        
        <div className='w-[70%] eventscon grid gap-4 '>
          <div className='fixed eventscateg left-8'>
            <div className={`${get === "all"? "bg-slate-900 text-white" : ""} flex justify-start items-center bg-slate-300
            p-2 rounded-md m-1 cursor-pointer hover:bg-slate-900 hover:text-white`} onClick={() => getEvent("all")}>
              <FontAwesomeIcon icon={faCalendarDay} />
              <p className='text-xl font-bold ml-2'>All</p>
            </div>

            <div className={`${get === "happening"? "bg-slate-900 text-white" : ""} flex justify-start items-center bg-slate-300
            p-2 rounded-md m-1 cursor-pointer hover:bg-slate-900 hover:text-white`} onClick={() => getEvent("happening")}>
              <FontAwesomeIcon icon={faCalendarDay} />
              <p className='text-xl font-bold ml-2'>Happening Now</p>
            </div>
            
            <div className={`${get === "future"? "bg-slate-900 text-white" : ""} flex justify-start items-center bg-slate-300
            p-2 rounded-md m-1 cursor-pointer hover:bg-slate-900 hover:text-white`} onClick={() => getEvent("future")}>
              <FontAwesomeIcon icon={faCalendarAlt} />
              <p className='text-xl font-bold ml-2'>Upcoming</p>
            </div>

            <div className={`${get === "past"? "bg-slate-900 text-white" : ""} flex justify-start items-center bg-slate-300
            p-2 rounded-md m-1 cursor-pointer hover:bg-slate-900 hover:text-white`} onClick={() => getEvent("past")}>
              <FontAwesomeIcon icon={faCalendarCheck} />
              <p className='text-xl font-bold ml-2'>Past</p>
            </div>
          </div>

          <div>
            <div className='col-span-2 bg-yellow flex flex-col items-center justify-center'>
              {notification ? <NotificationCard content={notification} show={true} /> : <NotificationCard content={notification} show={false} />}

              {get === 'all' ? (events.length > 0 ? renderEvents(events) : <p className='text-center w-full font-bold text-xl opacity-50'>No events found</p>) 
                : get === 'past' ? (pastEvents.length > 0 ? renderEvents(pastEvents) : <p className='text-center w-full font-bold text-xl opacity-50'>No past events</p>) 
                : get === 'future' ? (futureEvents.length > 0 ? renderEvents(futureEvents) : <p className='text-center w-full font-bold text-xl opacity-50'>No upcoming events</p>) 
                : get === 'happening' ? (happeningEvents.length > 0 ? renderEvents(happeningEvents) : <p className='text-center w-full font-bold text-xl opacity-50'>No happening events</p>) 
                : <p className='text-center w-full font-bold text-xl opacity-50'>No events found</p>}              
              
            </div>
          </div>
          
        </div>


      </div>

    </div>
  )
}

export default MyEvents