import React from 'react'
import Header from '../components/Header'
import profilepic from "../resources/profilepictemp.jpg"
import AddBtn from "../components/users/AddBtn.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

function EducBackCon() {
  return (
    <div>
      <div className='flex flex-col mt-10'>
        <p className='text-xl font-bold'>B. Educational Background</p>
        

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Educational Attainment (Baccalaureate Degree Only) </h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Male</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Professional Examination(s) Passed</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Married</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Reason(s) for taking the course(s) or pursuing degree(s)</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>
      </div>
      

  
    </div>
  )
}

export default EducBackCon