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

        // Process and clean the data
        const cleanedData = data.map(item => {
          const cleanedItem = {};

          for (let key in item) {
            const cleanedValue = cleanValue(item[key]);
            if (isValidValue(cleanedValue)) {
              cleanedItem[key] = cleanedValue;
            }
          }

          return cleanedItem;
        });

        console.log('Original Data:', data);
        console.log('Cleaned Data:', cleanedData);

        // Convert cleaned data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(cleanedData);
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

const cleanValue = (value) => {
  if (Array.isArray(value)) {
    // Clean each element in the array
    const cleanedArray = value
      .map(cleanValue)
      .filter(isValidValue);

    // Join array elements into a comma-separated string or return null if empty
    return cleanedArray.length ? cleanedArray.join(', ') : null;
  } else if (typeof value === 'object' && value !== null) {
    // Handle specific cases where an object needs to be converted to a formatted string
    if (isSpecialObject(value)) {
      return formatSpecialObject(value);
    } else {
      const cleanedObject = {};

      for (let key in value) {
        const cleanedSubValue = cleanValue(value[key]);
        if (isValidValue(cleanedSubValue)) {
          cleanedObject[key] = cleanedSubValue;
        }
      }

      // Return the cleaned object or null if it's empty
      return Object.keys(cleanedObject).length ? cleanedObject : null;
    }
  } else if (typeof value === 'boolean') {
    // Only return true boolean values
    return value === true ? 'Yes' : null;
  } else if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'string') {
    // Trim strings and return null if empty
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  } else {
    return null;
  }
};

// Function to check if an object needs special formatting
const isSpecialObject = (obj) => {
  // Example: eb_educattain, check for keys that are part of this object structure
  return obj.hasOwnProperty('degree') || obj.hasOwnProperty('college') || obj.hasOwnProperty('yearGrad') || obj.hasOwnProperty('honor');
};

// Function to format a special object into a human-readable string
const formatSpecialObject = (obj) => {
  let formattedString = '';

  if (obj.degree) {
    formattedString += `Degree: ${obj.degree}\n`;
  }
  if (obj.college) {
    formattedString += `College: ${obj.college}\n`;
  }
  if (obj.yearGrad) {
    formattedString += `Year Graduated: ${obj.yearGrad}\n`;
  }
  if (obj.honor) {
    formattedString += `Honor: ${obj.honor}\n`;
  }

  // Remove the trailing newline and return the formatted string
  return formattedString.trim();
};

// Function to check if a value is valid (non-null, non-empty)
const isValidValue = (value) => {
  return value !== null && value !== undefined && value !== '';
};

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
