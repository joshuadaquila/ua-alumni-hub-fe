import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/users/Sidebar';
import UserHeader from '../../components/users/UserHeader';
import axios from 'axios';
import io from 'socket.io-client';
import NotificationCard from '../../components/NotificationCard';
import MessageBroadcastCon from '../../components/MessageBroadcastCon';
import moment from 'moment';
import NewMessageCon from '../../components/users/NewMessageCon';
import api from '../api';

const socket = io('https://ua-alumhi-hub-be.onrender.com', {
  withCredentials: true
});

function AdminMessageBroadcast() {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
  const [toggled, setToggle] = useState(true);
  const [addMessageCon, setAddMessageCon] = useState(true);
  const [messages, setMessages] = useState([]); // initialize an empty array to store messages
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    }
  }, [adminToken]);

  useEffect(() => {
    // Fetch messages from the server
    api.get('/getMessages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [notification]);

  useEffect(() => {
    // Set up Socket.io event listener for new messages
    socket.on('messageNotification', (msg) => {
      console.log("Received message:", msg);

      // Add the new message to the existing list
      setMessages(prevMessages => [msg, ...prevMessages]);
    });

    // Clean up Socket.io event listeners on component unmount
    return () => {
      socket.off('messageNotification');
    };
  }, [socket]);

  useEffect(() => {
    // Set up Socket.io event listener for notifications
    socket.on('eventNotification', (msg) => {
      setNotification(msg);
    });

    // Clean up Socket.io event listeners on component unmount
    return () => {
      socket.off('eventNotification');
    };
  }, [socket]);

  // Handle toggle of sidebar
  const pushCon = () => {
    setToggle(!toggled);
  };

  // Handle add message button click
  const handleAddEvent = () => {
    setAddMessageCon(!addMessageCon);
  };

  return (
    <div className='minbackground flex w-screen min-h-screen'>
      <div className={`${toggled ? "w-64" : ""}`}>
        <Sidebar handleClick={pushCon} />
      </div>
      <div className='p-4 flex-1 w-full flex flex-col items-center'>
        <div className='flex justify-start items-start'>
          <UserHeader />
        </div>

        <div className='w-[50%] flex flex-col justify-start items-center mt-[6rem] relative'>
          <h1 className='mb-4 text-2xl font-bold'>COMMUNITY CHAT</h1>
          {notification && <NotificationCard content={notification} show={true} />}
          {addMessageCon && <NewMessageCon close={handleAddEvent} />}
          {messages.map(message => (
            <MessageBroadcastCon
              id={message.messageid}
              key={message.messageid}
              username={message.name}
              usertype={message.usertype}
              date={moment(message.date).format('YYYY-MM-DD HH:mm')}
              content={message.content}
              photo={message.photourl}
              accessing={"user"} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminMessageBroadcast;
