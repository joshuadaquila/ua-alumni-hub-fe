import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/users/Sidebar';
import EventCard from '../../components/EventCard';
import UserHeader from '../../components/users/UserHeader';
import AddBtn from '../../components/users/AddBtn';
import NewEventCon from '../../components/users/NewEventCon';
import axios from 'axios';
import io from 'socket.io-client';
import NotificationCard from '../../components/NotificationCard';
import MessageBroadcastCon from '../../components/MessageBroadcastCon';
import moment from 'moment';
import NewMessageCon from '../../components/users/NewMessageCon';
import EditMessageCon from '../../components/users/EditMessageCon';

const socket = io('http://localhost:3001', {
  withCredentials: true
});

function AdminMessageBroadcast() {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const [toggled, setToggle] = useState(true);
  const [addMessageCon, setAddMessageCon] = useState(true);
  const [message, setMessage] = useState([]); // initialize an empty array to store events
  const [notification, setNotification] = useState(null);
  

  useEffect(() => {
    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    }
  }, [adminToken]);

  useEffect(() => {
    // Fetch events from the server
    axios.get('http://localhost:3001/getMessages')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    
  }, [notification]);



  const pushCon = () => {
    setToggle(!toggled);
  }

  // Handle add event button click
  const handleAddEvent = () => {
    // console.log("cliked");
    setAddMessageCon(!addMessageCon);
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

  console.log(message);

  return (
    <div className='minbackground flex w-screen min-h-screen'>
      
      <div className={`${toggled ? "w-64" : ""}`}>
        <Sidebar handleClick={pushCon} />
      </div>
      <div className='p-4 flex-1 w-full flex flex-col items-center'>
      <div className='flex justify-center items-start'>
          <UserHeader />
        </div>

        <div className='w-[70%] flex flex-col justify-center items-center  mt-[6rem] relative'>
          <div className='flex items-end justify-end w-full'>
 
          </div>
          <h1 className='mb-4 text-2xl font-bold'>COMMUNITY CHAT</h1>
          { notification ? <NotificationCard content={notification} show={true} /> : <NotificationCard content={notification} show={false} /> }
          {addMessageCon && <NewMessageCon close={handleAddEvent} />}
          {message.map(message => (
            <MessageBroadcastCon
              id = {message.messageid}
              key={message.messageid}
              username={message.username}
              usertype={message.usertype}
              date={moment(message.date).format('YYYY-MM-DD HH:mm')}
              content={message.content}
              accessing={"user"} 
            />
          ))}


        </div>
      </div>
    </div>
  )
}

export default AdminMessageBroadcast