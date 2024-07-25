import { faArrowRight, faCheck, faPaperPlane, faPlane, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import axios from 'axios';
import LoadingScreen from "../../components/LoadingScreen";
import io from 'socket.io-client';

function GenInfoQ({ close, next }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [emailaddress, setEmailAddress] =useState();
  const [contactnum, setContactNum] = useState();
  const [mobilenum, setMobileNum] = useState();



  const [isLoading, setLoading] = useState(false);
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md">
      <div className="absolute inset-0 bg-gray-900 opacity-50">


      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white w-[50%]  p-4 rounded-lg shadow-lg">
        <div className='flex items-end justify-end'>
          <FontAwesomeIcon icon={faXmark} onClick={close} size='lg'
            className='cursor-pointer hover:scale-125' />
        </div>
        
        <form className='flex flex-col justify-start  items-center'>
          <h1 className='mb-4 text-2xl font-bold'>A. GENERAL INFORMATION</h1>
          <div className='grid grid-cols-2 gap-9'>
            <div>
              <div className='flex flex-col items-start mt-2'>
                <label className='text-lg ml-2'>1. Name</label>
                <input
                  className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)} required
                />
              </div>

              <div className='flex flex-col items-start mt-2'>
                <label className='text-lg ml-2'>2. Permanent Address</label>
                <input
                  className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)} required
                />
              </div>

              <div className='flex flex-col items-start mt-2'>
                <label className='text-lg ml-2'>3. Email Address</label>
                <input
                  className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                  type="email"
                  value={emailaddress}
                  onChange={(e) => setEmailAddress(e.target.value)} required
                />
              </div>

              <div className='flex flex-col items-start mt-2'>
                <label className='text-lg ml-2'>4. Telephone or Contact Number</label>
                <input
                  className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                  type="tel"
                  pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"
                  value={contactnum}
                  onChange={(e) => setContactNum(e.target.value)}
                />
              </div>
              
              <div className='flex flex-col items-start mt-2'>
                <label className='text-lg ml-2'>5. Mobile Number</label>
                <input
                  className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                  type="tel"
                  pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"
                  value={mobilenum}
                  onChange={(e) => setMobileNum(e.target.value)} required
                />
              </div>
            </div>

            <div>
              <div className='flex flex-col items-start mt-2'>
                <label className='text-lg ml-2'>6. Civil Status</label>
                <fieldset className=' text-lg flex justify-center'>
                  <div className='flex flex-col items-start ml-4'>
                    <div>
                      <input type="radio" id="single" name="civil-status" value="single" required/>
                      <label for="single" className='mr-2 ml-1'>Single</label>
                    </div>
                    
                    <div>
                      <input type="radio" id="married" name="civil-status" value="married"/>
                      <label for="married" className='mr-2 ml-1'>Married</label>
                    </div>
                    
                    <div>
                      <input type="radio" id="divorced" name="civil-status" value="separated"/>
                      <label for="divorced" className='mr-2 ml-1'>Separated</label>
                    </div>
                    
                  </div>
                  
                  <div className='flex flex-col items-start'>
                    <div>
                      <input type="radio" id="divorced" name="civil-status" value="single parent" />
                      <label for="divorced" className='mr-2 ml-1'>Single Parent</label>
                    </div>
                    
                    <div>
                      <input type="radio" id="widowed" name="civil-status" value="widowed"/>
                      <label for="widowed" className='mr-2 ml-1'>Widow or Widower</label>
                    </div>
                  </div>
                  
                </fieldset>
              </div>
              
              <div className='flex flex-col items-start mt-2'>
                <label className='text-lg ml-2'>7. Sex</label>
                <div className='flex text-lg'>
                  <div>
                    <input type="radio" id="widowed" name="sex" value="widowed"/>
                    <label for="male" className='mr-2 ml-1'>Male</label>
                  </div>

                  <div>
                    <input type="radio" id="widowed" name="sex" value="widowed"/>
                    <label for="widowed" className='mr-2 ml-1'>Female</label>
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-start mt-2'>
                <label className='text-lg ml-2'>8. Birthday</label>
                <input
                  className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                  type="date"
                  value={mobilenum}
                  onChange={(e) => setMobileNum(e.target.value)} required
                />
              </div>

              <div className='flex flex-col items-start mt-2'>
                <label className='text-lg ml-2'>9. Region of Origin</label>
                <select id="civil-status" name="civil-status" 
                className='text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none' required>
                  <option value="">Select</option>
                  <option value="Region 1">Region 1</option>
                  <option value="Region 2">Region 2</option>
                  <option value="Region 3">Region 3</option>
                  <option value="Region 4">Region 4</option>
                  <option value="Region 5">Region 5</option>
                  <option value="Region 6">Region 6</option>
                  <option value="Region 7">Region 7</option>
                  <option value="Region 8">Region 8</option>
                  <option value="Region 9">Region 9</option>
                  <option value="Region 10">Region 10</option>
                  <option value="Region 11">Region 11</option>
                  <option value="Region 12">Region 12</option>
                  <option value="NCR">NCR</option>
                  <option value="CAR">CAR</option>
                  <option value="ARMM">ARMM</option>
                  <option value="CARAGA">CARAGA</option>
                </select>
              </div>


              <div className='flex flex-col items-start mt-2'>
                <label className='text-lg ml-2'>10. Province</label>
                <input
                  className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                  type="tel"
                  pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"
                  value={contactnum}
                  onChange={(e) => setContactNum(e.target.value)}
                />
              </div>

              <div className='flex flex-col items-start mt-2'>
                <label className='text-lg ml-2'>11. Location of Residence</label>
                <div className='flex text-lg'>
                  <div>
                    <input type="radio" id="widowed" name="location" value="widowed"/>
                    <label for="widowed" className='mr-2 ml-1'>City</label>
                  </div>

                  <div>
                    <input type="radio" id="widowed" name="location" value="widowed"/>
                    <label for="widowed" className='mr-2 ml-1'>Municipality</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className='bg-slate-900 text-white w-32 h-20 flex justify-center items-center p-4 m-2 rounded-md' onClick={next}>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                <FontAwesomeIcon icon={faArrowRight} className='mr-2' type='submit' />
                <p>Next</p>
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  )
}

export default GenInfoQ