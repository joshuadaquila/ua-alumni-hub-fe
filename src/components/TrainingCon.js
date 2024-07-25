import React from 'react'
import Header from '../components/Header'
import profilepic from "../resources/profilepictemp.jpg"
import AddBtn from "../components/users/AddBtn.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

function TrainingCon() {
  return (
    <div>
      <div className='flex flex-col mt-10'>
        <p className='text-xl font-bold'>C. Training(s)/Advance Studies Attended After College</p>
        

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Professional or work-related training program(s) including advance studies you have after college.</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Male</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>What made you pursue advance studies?</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Married</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        

        
      </div>
    </div>
  )
}

export default TrainingCon