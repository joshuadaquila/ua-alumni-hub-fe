import { faSignOut, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function LogoutCon({  }) {
  return (
    <div className='bg-white absolute -bottom-10 rounded-sm w-36 shadow-md cursor-pointer '>
      <div className='flex justify-center items-center text-gray-600 hover:bg-gray-200 m-2'>
        <FontAwesomeIcon icon={faSignOutAlt} className='mr-2 ' />
        <p>Logout</p>
      </div>
      
    </div>
  )
}

export default LogoutCon