import { faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function AddBtn({add}) {
  return (
    <div className='bg-blue-400 bg-opacity-50 pt-4 pb-4 flex justify-center 
      items-center rounded-full shadow-md w-16 mb-4 mr-4 cursor-pointer btn' onClick={add}>
      <FontAwesomeIcon icon={faPlus} size='lg'/>
    </div>
  )
}

export default AddBtn