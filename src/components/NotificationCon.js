import { faCalendarAlt, faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function NotificationCon({ message, sentdate, type }) {
  return (
    <div className=' bg-opacity-20 w-[50%] msgCon rounded-md shadow-md p-4
    grid grid-cols-3 gap-4 mb-2 '>
      <div className='flex flex-row content-center items-center col-span-2'>
        {type == "event"? <FontAwesomeIcon icon={faCalendarAlt} className='ml-2 mr-4' size='xl'/> : 
        <FontAwesomeIcon icon={faMessage} className='ml-2 mr-4' size='xl'/>}
        <p className=' text-start'>{message}...</p>
      </div>
      <p className='opacity-80 text-sm'>{sentdate}</p>
    </div>
  )
}

export default NotificationCon