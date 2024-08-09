import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/users/Sidebar';
import UserHeader from '../../components/users/UserHeader';
import AddBtn from '../../components/users/AddBtn';
import axios from 'axios';
import NewUserCon from '../../components/users/NewUserCon';
import AlumniTable from '../../components/users/AlumniTable';
import PrintReport from '../../components/users/PrintReport';
import api from '../api';
import SurveyTable from '../../components/users/SurveyTable';
import * as XLSX from 'xlsx'; // Add this import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export default function TracerSurvey() {
  const [adminUName, setAdminUName] = useState(localStorage.getItem('adminUName'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const [survey, setSurvey] = useState([]);
  const [toggled, setToggle] = useState(true);
  const [showUserCon, setShowUserCon] = useState(false);

  const pushCon = () => {
    setToggle(!toggled);
  }
  
  const handleNewUserCon = () => {
    setShowUserCon(!showUserCon);
  }

  useEffect(() => {
    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    }
  }, [adminToken]);

  useEffect(() => {
    api.get('/getAlumni')
      .then(response => {
        setSurvey(response.data);
      })
      .catch(error => {
        console.log("Error in fetching alumni data");
        console.error(error);
      });
  }, []);

  const handleDownload = () => {
    api.get('/getSurveySummary')
      .then(response => {
        const data = response.data;

        console.log(data);
        
        // Convert JSON data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Survey Summary');
        
        // Write workbook to file
        XLSX.writeFile(workbook, 'survey_summary.xlsx');
      })
      .catch(error => {
        console.log("Error in downloading survey summary");
        console.error(error);
      });
  }

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
          <p className='text-2xl font-bold mb-12'>Table of Survey Responses</p>
          
          {showUserCon && <NewUserCon close={handleNewUserCon} />}

          <PrintReport title={"Responders Table"}>
            <SurveyTable surveyData={survey} />
          </PrintReport>

          <div className='flex justify-end mb-4'>
            <button 
              onClick={handleDownload} 
              className='bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-4'>
              <FontAwesomeIcon icon={faDownload}/>
              Download Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
