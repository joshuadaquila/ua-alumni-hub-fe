import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import axios from 'axios';
import LoadingScreen from "../../components/LoadingScreen";
import io from 'socket.io-client';
import api from '../../pages/api';

// Ensure the URL matches your backend setup
const socket = io('https://ua-alumhi-hub-be.onrender.com', {
  withCredentials: true
});

function NewMessageCon({ close }) {
  const [content, setContent] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const addMessage = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/addAdminMessage', {
        content,
      }, { withCredentials: true });


      // Emit the message ID or other relevant data to the server
      socket.emit('messageNotification', {
        insertId: response.data.insertId, // Ensure this matches your server's expected data
        content
      });

      setContent('');
      setLoading(false);

    } catch (error) {
      setErrors([...errors, error.response?.status || "Unknown error"]);
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 w-full flex justify-center z-40">
      <div className="bg-white w-full p-4 rounded-t-lg shadow-lg flex flex-col items-center">
        <div className='flex items-end justify-end w-full'>
          <FontAwesomeIcon icon={faXmark} onClick={close} size='lg' className='cursor-pointer hover:scale-125' />
        </div>
        <form className='flex flex-col items-center w-full' onSubmit={addMessage}>
          <h1 className='mb-4 text-2xl font-bold'></h1>
          <div className='flex items-center w-full justify-center'>
            <textarea
              className="text-xl rounded-none p-2 w-3/4 border-b-2 border-gray-900 outline-none resize-none"
              rows={4}
              placeholder='Type your message...'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <button type='submit' className='bg-slate-900 text-white w-32 h-20 flex justify-center items-center p-4 ml-2 rounded-md'>
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} className='mr-2' />
                  <p>Send</p>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewMessageCon;
