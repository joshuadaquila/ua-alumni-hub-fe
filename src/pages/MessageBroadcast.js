import React, { useEffect } from 'react'
import Header from '../components/Header'
import MessageBroadcastCon from '../components/MessageBroadcastCon'
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel } from '@fortawesome/free-solid-svg-icons';


function MessageBroadcast() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [message, setMessage] = useState([]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    // Fetch events from the server
    axios.get(`http://localhost:3001/getMessages/:id`)
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className=' flex minbackground flex-col min-h-screen'>
      <Header />
      <div className=' mt-[6rem] pl-4 pr-4 pt-4 flex justify-center'>
        <div className='w-[40%] msgCon '>
          {message.map(message => (
            <MessageBroadcastCon
              key={message.messageid}
              username={message.username}
              usertype={message.usertype}
              date={moment(message.date).format('YYYY-MM-DD HH:mm')}
              content={message.content} 
              
            />
          ))}
        </div>
      </div>
      <p className='font-bold text-gray-500 text-xl'>{message == "" ? "No Messages" : ""}</p>


    </div>
  )
}

export default MessageBroadcast