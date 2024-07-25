import React from 'react'
import Header from '../components/Header'
import profilepic from "../resources/profilepictemp.jpg"
import AddBtn from "../components/users/AddBtn.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

function EmploymentCon() {
  return (
    <div>
      <div className='flex flex-col mt-10'>
        <p className='text-xl font-bold'>D. Employment Data</p>
        

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Are you presently employed?</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Male</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>Reason(s) why not employed.</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Married</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>18. Present employment status</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>19. Present occupation</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>20. Major line of business of the company you are presenlty employed in</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>21. Place of work</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>22. Is this your first job after college?</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>23. What are your reason(s) for staying on the job?</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>24. Is your first job related to the course you took up in college?</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>25. What were you reasons for accepting the job?</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>26. What were your reason(s) for changing job?</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>27. How long did you stay in your first job?</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>28. How did you find your first job?</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>


        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>29. How long did it take to land your fist job?</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>30. Job Level Position</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>31. What is your initial gross monthly earning in your first job after college?</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>32. Was the curriculum you had in college relevant to your first job?</h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>

        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>33. If yes, what competencies learned in college did you find very useful in your first job? </h3>
          <div className='grid grid-cols-[1fr,auto] gap-2'>
            <p  className='text-md'>Bachelor's Degree</p>
            <div className='justify-self-end'>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>
        <div className='m-2 p-2 border-b-2 border-gray-500'>
          <h3 className='font-bold text-lg text-start'>34. List down suggestions to further improve your course curriculum</h3>
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

export default EmploymentCon