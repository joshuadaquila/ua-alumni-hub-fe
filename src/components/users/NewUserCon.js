import { faCheck, faPaperPlane, faPlane, faPlus, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import axios from 'axios';
import LoadingScreen from "../../components/LoadingScreen";
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  withCredentials: true
});

function NewUserCon({ close }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const addMessage = async (event) => {
    event.preventDefault();

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrors([...errors, "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/addMessage', {
        username,
        password,
      }, { withCredentials: true });
      close();
      setLoading(false);
    } catch (error) {
      setErrors([...errors, error.response?.status || "Unknown error"]);
      setLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white w-[20%] p-4 rounded-lg shadow-lg">
        <div className='flex items-end justify-end'>
          <FontAwesomeIcon icon={faXmark} onClick={close} size='lg'
            className='cursor-pointer hover:scale-125' />
        </div>
        
        <form className='flex flex-col justify-start items-center' onSubmit={addMessage}>
          <h1 className='mb-4 text-2xl font-bold'>ADD NEW USER</h1>
          <div className='place-content-center place-items-center'>
            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Username</label>
              <input
                type="text"
                className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Password</label>
              <input
                type="password"
                className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
          </div>
          {errors.length > 0 && (
            <div className="text-red-500">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <button className='bg-slate-900 text-white w-32 h-20 flex justify-center items-center p-4 m-2 rounded-md'>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} className='mr-2' type='submit' />
                <p>Add</p>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewUserCon;
