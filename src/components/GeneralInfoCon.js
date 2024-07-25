import React from 'react'
import Header from '../components/Header'
import profilepic from "../resources/profilepictemp.jpg"
import AddBtn from "../components/users/AddBtn.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

function GeneralInfoCon() {
  return (
    <div>
      <div className='flex flex-col mt-10'>
        <div className='flex justify-center items-center'>
          <p className='text-xl font-bold'>A. General Information</p>
          <div className='flex justify-center items-center'>
            <FontAwesomeIcon icon={faPen} className='ml-2' />
            <p className='underline'>Edit</p>
          </div>
          
        </div>
        
        

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Name</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Male</p>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Permanent Address</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Married</p>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Email Address</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
    
      

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Telephone or Contact Number(s)</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p className='text-md'>Male</p>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Mobile Number </h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p className='text-md'>Married</p>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Civil Status</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p className='text-md'>Bachelor's Degree</p>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Sex</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p className='text-md'>Bachelor's Degree</p>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Birthday</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p className='text-md'>Bachelor's Degree</p>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Region of Origin</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p className='text-md'>Bachelor's Degree</p>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Province</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p className='text-md'>Bachelor's Degree</p>
          </div>
          
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Location of Residence</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p className='text-md'>Bachelor's Degree</p>
          </div>
        </div>

      </div>

      


      
    </div>
  )
}

export default GeneralInfoCon