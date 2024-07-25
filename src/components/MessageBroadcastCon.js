import React, { useState } from 'react'
import profileimg from '../resources/profilepictemp.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faEllipsisV, faEyeSlash, faHandDots, faListDots } from '@fortawesome/free-solid-svg-icons';
import Options from './users/Options';
import axios from 'axios';
import { useEffect } from 'react';
import EditMessageCon from './users/EditMessageCon';

function MessageBroadcastCon({ id, username, usertype, date, content, accessing, edit }) {
  const [hidden, setHidden]= useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [errors, setErrors] = useState([]);
  const [editMessage, setEditMessage] = useState(false);

  const optionsClicked = () => {
    setShowOptions(!showOptions);
  }
  const handleEditMessage = () => {
    setEditMessage(!editMessage);
  }
  useEffect(() => {
    const msgId = id; // replace with the actual event ID
    axios.get(`http://localhost:3001/checkMessage?messageid=${msgId}`)
     .then(response => {
        // console.log(response.data[0].status)
        if (response.data[0].status === "active"){
          setHidden(false);
        }else{
          setHidden(true);
        }
      })
     .catch(error => {
        console.log("error in home get events");
        console.log("I am the error")
        console.error(error);
        // logout();
      });
  }, [showOptions]);

  const messageid = id;
  const  hideMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3001/hideMessage', {
        messageid
      }, { withCredentials: true });
        setShowOptions(false)
      
    } catch (error) {
      setErrors([...errors, error.response?.status || "Unknown error"]);
      // setLoading(false);
    }
  }

  return (
    <div className={`bg-orange-300 bg-opacity-20 rounded-md shadow-md p-4 min-w-full mb-2 relative `}>
      <div className='flex flex-col justify-center'>
        <div className=' flex flex-row mb-2'>
          <img src={profileimg} className='rounded-full w-16 h-16' />
          <div className='flex flex-col justify-center text-start ml-2'>
            <p className='font-bold'>{username}</p>
            {accessing === "user" && <FontAwesomeIcon icon={faEllipsisH} className='absolute right-4 top-4 opacity-50 cursor-pointer' 
            onClick={optionsClicked}/>}
            {hidden && <FontAwesomeIcon icon={faEyeSlash} className='absolute right-4 bottom-4 opacity-50' /> }

            {showOptions && <Options msgid={id} hidden={hidden} hideMessage={hideMessage} edit={handleEditMessage} />}
            <p className='opacity-80 text-sm'>{usertype}</p>
            <p className='text-sm opacity-80'>{date}</p>


            {editMessage && <EditMessageCon close={handleEditMessage} id={id} />}
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='text-start'>{content}</p>
        </div>
      </div>
      
    </div>
  )
}

export default MessageBroadcastCon