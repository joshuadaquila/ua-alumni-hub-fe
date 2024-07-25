import { faCheck, faPaperPlane, faPlane, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import axios from 'axios';
import LoadingScreen from "../../components/LoadingScreen";
import { useEffect } from 'react';


function EditMessageCon({ close, id }) {
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const addMessage = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/addMessage', {
        content,
      }, { withCredentials: true });
      {close()}
      setLoading(false);
      // sendNotification(content);
      
    } catch (error) {
      setErrors([...errors, error.response?.status || "Unknown error"]);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getMessageInfo/${id}`);
        console.log(response);
        setContent(response.data[0]. content);
        // setUsername(response.data[0].username);
        // setPassword(''); // Typically you wouldn't fetch and pre-fill the password
      } catch (error) {
        setErrors([...errors, error.response?.status || "Failed to fetch user details"]);
      }
    };

    fetchUserDetails();
  
}, []);

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white w-[30%]  p-4 rounded-lg shadow-lg">
        <div className='flex items-end justify-end'>
          <FontAwesomeIcon icon={faXmark} onClick={close} size='lg'
            className='cursor-pointer hover:scale-125' />
        </div>
        
        <form className='flex flex-col justify-start  items-center' onSubmit={addMessage}>
          <h1 className='mb-4 text-2xl font-bold'>EDIT MESSAGE BROADCAST</h1>
          <div className=' place-content-center place-items-center'>

            

            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Content</label>
              <textarea
                className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none resize-none"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </div>
          <button className='bg-slate-900 text-white w-32 h-20 flex justify-center items-center p-4 m-2 rounded-md'>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} className='mr-2' type='submit' />
                <p>Send</p>
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditMessageCon;