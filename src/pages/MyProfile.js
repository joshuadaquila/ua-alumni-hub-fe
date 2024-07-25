import React, { useState } from 'react'
import Header from '../components/Header'
import profilepic from "../resources/profilepictemp.jpg"
import AddBtn from "../components/users/AddBtn.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faArrowCircleRight, faPen } from '@fortawesome/free-solid-svg-icons'
import GeneralInfoCon from '../components/GeneralInfoCon'
import EducBackCon from '../components/EducBackCon'
import TrainingCon from '../components/TrainingCon'
import EmploymentCon from '../components/EmploymentCon'
import GenInfoQ from '../components/tracer/GenInfoQ'
import EducBackQ from '../components/tracer/EducBackQ'

function MyProfile() {
  const [conShowing, setConShowing] = useState(1);
  const [showGen, setShowGen] = useState(true);
  const [showEdB, setShowEdB] = useState(false);
  const [showTrainF, setShowTrain] = useState(false);

  const nextPage = () => {
    console.log("nextpage");
    setConShowing(conShowing < 4 ? conShowing + 1 : 1);
  }
  
  const prevPage = () => {
    console.log("prevpage");
    setConShowing(conShowing > 1 ? conShowing - 1 : 4);
  }
  
  const handleGen = () => {
    setShowGen(!showGen);
  }

  const handleEd = () => {
    setShowEdB(!showEdB);
    setShowGen(false);
  }

  const handleTrain = () => {
    setShowTrain(!showTrainF);
  }
  return (
    <div className=' flex minbackground flex-col min-h-screen'>
      <Header />
      <div>
        {showGen && <GenInfoQ close={handleGen} next={handleEd}  />}
        {showEdB && <EducBackQ close={handleEd} next={handleTrain} />}
      </div>
      
      <div className=' mt-[6rem] pl-4 pr-4 pt-4 flex justify-center '>

        <div className='profileMainCon bg-opacity-20 w-[50%] rounded-lg p-10 flex flex-col items-center m-4'>

          <div className='profileFCon flex justify-center items-center '>
            <img src={profilepic} className='w-40 rounded-full' />

            <div className='text-start ml-4'>
              <p className='text-3xl font-bold'>Juan Dela Cruz</p>
              <p className='t'>BS Computer Science</p>
              <p>Batch 2024</p>
            </div>

            

          </div>
          <div className='w-full flex items-center justify-center'>
            <FontAwesomeIcon icon={faArrowCircleLeft} size='xl' className='mr-2 cursor-pointer hover:scale-110' onClick={prevPage} />
            <div className='profilePagesCon w-[80%] shadow-md p-6 rounded-md border border-opacity-50 border-black mt-2'>
              {conShowing === 1 ? <GeneralInfoCon /> : conShowing === 2 ? <EducBackCon /> : conShowing === 3 ? <TrainingCon /> : conShowing === 4 ? <EmploymentCon /> : ""}
            </div>
            <FontAwesomeIcon icon={faArrowCircleRight} size='xl' className='ml-2 cursor-pointer hover:scale-110' onClick={nextPage} />
          </div>
          

          

        </div>
      </div>

    </div>
  )
}

export default MyProfile