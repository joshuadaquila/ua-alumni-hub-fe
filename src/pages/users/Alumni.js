import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/users/Sidebar';
import UserHeader from '../../components/users/UserHeader';
import AddBtn from '../../components/users/AddBtn';
import axios from 'axios';
import NewUserCon from '../../components/users/NewUserCon';
import AlumniTable from '../../components/users/AlumniTable';
import PrintReport from '../../components/users/PrintReport';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Alumni() {
  const [adminUName, setAdminUName] = useState(localStorage.getItem('adminUName'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const [alumni, setAlumni] = useState([]);
  const [toggled, setToggle] = useState(true);
  const [showUserCon, setShowUserCon] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Filter states
  const [graduationYear, setGraduationYear] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [program, setProgram] = useState('');

  const pushCon = () => {
    setToggle(!toggled);
  }
  
  const handleNewUserCon = () => {
    setShowUserCon(!showUserCon);
  }

  const toggleFilters = () => {
    if (filtersVisible) {
      // Clear filters when hiding the advanced search
      setGraduationYear('');
      setName('');
      setAddress('');
      setProgram('');
    }
    setFiltersVisible(!filtersVisible);
  }

  useEffect(() => {
    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    }
  }, [adminToken]);

  useEffect(() => {
    api.get('/getAlumni')
      .then(response => {
        setAlumni(response.data);
      })
      .catch(error => {
        console.log("Error in fetching alumni data");
        console.error(error);
      });
  }, []);

  // Filter function
  const filteredAlumni = alumni.filter(alumnus => {
    const alumnusGraduationYear = alumnus.graduationyear ? alumnus.graduationyear.toString() : '';
    return (
      (graduationYear ? alumnusGraduationYear === graduationYear : true) &&
      (name ? alumnus.name?.toLowerCase().includes(name.toLowerCase()) : true) &&
      (address ? alumnus.address?.toLowerCase().includes(address.toLowerCase()) : true) &&
      (program ? alumnus.program?.toLowerCase().includes(program.toLowerCase()) : true)
    );
  });

  return (
    <div className='minbackground flex w-screen min-h-screen'>
      <div className={`${toggled ? "w-64" : ""}`}>
        <Sidebar handleClick={pushCon} />
      </div>
      <div className='p-4 flex-1 w-full flex flex-col items-center'>
        <div className='flex justify-center items-start'>
          <UserHeader />
        </div>

        <div className='mt-[6rem] shadow-md text-black'>
          <p className='text-2xl font-bold mb-12'>List of Alumni</p>
          
          

          {/* Search Filters */}
          {filtersVisible && (
            <div className='relative mb-4'>
              <div className='absolute top-0 left-4 right-0 p-4 bg-white border shadow-lg z-10' style={{ width: '400px' }}>
                <input
                  type='text'
                  placeholder='Name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className='border p-2 mb-2 w-full'
                />
                <input
                  type='text'
                  placeholder='Graduation Year'
                  value={graduationYear}
                  onChange={e => setGraduationYear(e.target.value)}
                  className='border p-2 mb-2 w-full'
                />
                <input
                  type='text'
                  placeholder='Address'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className='border p-2 mb-2 w-full'
                />
                <input
                  type='text'
                  placeholder='Program'
                  value={program}
                  onChange={e => setProgram(e.target.value)}
                  className='border p-2 w-full'
                />
              </div>
            </div>
          )}

          <div className='flex justify-end mb-4'>
            {/* <AddBtn add={handleNewUserCon}/> */}
          </div>
          {showUserCon && <NewUserCon close={handleNewUserCon} />}

          <PrintReport title={"Alumni Table"}>
            {/* Advanced Search Toggle Button */}
            <button onClick={toggleFilters} className='mb-4 mt-4 p-2 bg-red-950 text-white rounded-md w-52'>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='mr-2'/>
              {filtersVisible ? 'Hide Advanced Search' : 'Advance Search'}
            </button>
            
            <AlumniTable alumniData={filteredAlumni} />
          </PrintReport>
          
        </div>
      </div>
    </div>
  );
}
