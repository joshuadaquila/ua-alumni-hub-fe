import React from 'react';
import ualogo from '../resources/ualogo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
function UserSidebar({ show, closeSb }) {
  
  return (
    <div className={`fixed left-0 top-0 z-50 p-4 text-white
     bg-slate-900 min-h-screen w-56 ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}>
      <div className='flex justify-end'>
        <FontAwesomeIcon icon={faTimes} color='white' size='lg' onClick={closeSb} className='text-right'/>

      </div>
      <div className="flex flex-col justify-center items-center">
        <img src={ualogo} className="rounded-full w-24 h-24"/>
        <p className="text-xl font-bold p-4">Alumni Hub</p>
      </div>



    </div>
  )
}

export default UserSidebar