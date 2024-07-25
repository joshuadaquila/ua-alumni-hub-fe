import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/users/Sidebar';
import EventCard from '../../components/EventCard';
import UserHeader from '../../components/users/UserHeader';
import AddBtn from '../../components/users/AddBtn';
import NewEventCon from '../../components/users/NewEventCon';
import axios from 'axios';
import io from 'socket.io-client';
import NotificationCard from '../../components/NotificationCard';
import EventCardAdmin from '../../components/users/EventCardAdmin';

const socket = io('http://localhost:3001', {
  withCredentials: true
});



function Events({ logout }) {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
  
  const [toggled, setToggle] = useState(true);
  const [addEventCon, setAddEventCon] = useState(false);
  const [events, setEvents] = useState([]); // initialize an empty array to store events
  const [notification, setNotification] = useState(null);

  const [get, setGet] = useState("all");
  const [happeningEvents, setHappeningEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    }
  }, [adminToken]);

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
    console.log(toget);
    setGet(toget);
  }

  const renderEvents = (events) => (
    events.map((event) => (
      <EventCardAdmin
        id={event.eventid}
        key={event.eventid}
        title={event.title}
        description={event.description}
        date={event.date}
        time={event.time}
        location={event.location}
        capacity={event.capacity}
        registrationdeadline={event.registrationdeadline}
        accessing={"user"}
      />
    ))
  );
  

  const pushCon = () => {
    setToggle(!toggled);
  }

  // Handle add event button click
  const handleAddEvent = () => {
    setAddEventCon(!addEventCon);
  }


  useEffect(() => {
    // Set up Socket.io event listener
    socket.on('eventNotification', (msg) => {
      setNotification(msg);
    });

    // Clean up Socket.io event listeners on component unmount
    return () => {
      socket.off('eventNotification');
    };
  }, [socket])
  setTimeout(() => setNotification(null), 8000);
  
  return (
    <div className='minbackground flex w-screen min-h-screen'>
      <div className={`${toggled ? "w-64" : ""}`}>
        <Sidebar handleClick={pushCon} />
      </div>
      <div className='p-4 flex-1 w-full flex flex-col items-center'>
        <div className='flex justify-center items-start'>
          <UserHeader page={"event"} getEvents={getEvent}/>
        </div>
        <div className='w-[70%] flex flex-col justify-center items-end mt-[6rem] relative'>
          <AddBtn add={handleAddEvent} />
          { notification ? <NotificationCard content={notification} show={true} /> : <NotificationCard content={notification} show={false} /> }
          {addEventCon && <NewEventCon close={handleAddEvent} />}
          {get === 'all' ? (events.length > 0 ? renderEvents(events) : <p className='text-center w-full font-bold text-xl opacity-50'>No events found</p>) 
                : get === 'past' ? (pastEvents.length > 0 ? renderEvents(pastEvents) : <p className='text-center w-full font-bold text-xl opacity-50'>No past events</p>) 
                : get === 'future' ? (futureEvents.length > 0 ? renderEvents(futureEvents) : <p className='text-center w-full font-bold text-xl opacity-50'>No upcoming events</p>) 
                : get === 'happening' ? (happeningEvents.length > 0 ? renderEvents(happeningEvents) : <p className='text-center w-full font-bold text-xl opacity-50'>No happening events</p>) 
                : <p className='text-center w-full font-bold text-xl opacity-50'>No events found</p>}
        </div>
      </div>
    </div>
  );
}

export default Events;
