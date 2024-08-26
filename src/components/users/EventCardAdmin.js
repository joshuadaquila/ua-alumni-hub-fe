import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarDay, faCalendarXmark, faClock, faEllipsisH, faLocationPin, faUserCheck, faFileAlt, faClose, faPrint } from '@fortawesome/free-solid-svg-icons';
import eventcover from "../../resources/eventcover.jpg";
import axios from 'axios';
import Options from './Options';
import api from '../../pages/api';
import EditEventForm from './EditEventForm';
import ReactToPrint from 'react-to-print';

function EventCardAdmin(props) {
  const { id, title, description, date, time, endtime, location, capacity, registrationdeadline, registration, attendees, percentage, accessing } = props;

  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showOptions, setShowOptions] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [loadingReport, setLoadingReport] = useState(false);
  const [showReportOverlay, setShowReportOverlay] = useState(false);

  const componentRef = useRef();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const optionsClicked = () => {
    setShowOptions(!showOptions);
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const day = dateObj.getDate();
    return `${month} ${day}, ${year}`;
  };

  const currentDate = new Date();
  const isRegistrationOpen = new Date(registrationdeadline) > currentDate;

  const editEvent = () => {
    setShowEditForm(true);
    setShowOptions(false);
  };

  const deleteEvent = (eventid) => {
    api.post(`/deleteEvent/${eventid}`)
      .then((response) => {
        console.log('Event deleted:', response.data);
        props.onDelete(eventid);
      })
      .catch((error) => {
        console.error('Error deleting event:', error);
      });
  };

  const fetchReport = async () => {
    setLoadingReport(true);
    try {
      const response = await api.get(`/eventReport/${id}`);
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching event report:', error);
    } finally {
      setLoadingReport(false);
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleUpdateEvent = () => {
    setShowEditForm(false);
    props.onUpdate(); // Notify parent component to refresh events
  };

  console.log("report data", reportData)
  const PrintableReport = React.forwardRef((props, ref) => (
    <div ref={ref} className='p-4 text-left'>
      <h3 className='text-lg font-bold mb-2'>Event Details</h3>
      <p><strong>Event Name:</strong> {title}</p>
      <p><strong>Event ID:</strong> {id}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Date:</strong> {formatDate(date)}</p>
      <p><strong>Start Time:</strong> {time}</p>
      <p><strong>End Time:</strong> {endtime}</p>
      <p><strong>Total Registrations:</strong> {reportData.length}</p>
      <p><strong>Total Attendees:</strong> {attendees}</p>
      <p><strong>Percentage:</strong> {reportData.length > 0 ? ((attendees / reportData.length) * 100).toFixed(2) + '%' : 'N/A'}</p>

      <h3 className='text-lg font-bold mt-4'>Registrations</h3>
      {reportData ? (
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr>
              <th className='border border-gray-400 px-4 py-2'>Registration ID</th>
              <th className='border border-gray-400 px-4 py-2'>Name</th>
              <th className='border border-gray-400 px-4 py-2'>Registration Date</th>
              <th className='border border-gray-400 px-4 py-2'>Email</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map(row => (
              <tr key={row.registrationid}>
                <td className='border border-gray-400 px-4 py-2'>{row.registrationid}</td>
                <td className='border border-gray-400 px-4 py-2'>{row.name}</td>
                <td className='border border-gray-400 px-4 py-2'>{row.registrationdate}</td>
                <td className='border border-gray-400 px-4 py-2'>{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No registrations found.</p>
      )}
    </div>
  ));

  return (
    <div className='bg-orange-300 relative bg-opacity-20 mb-2 shadow-md rounded-md grid grid-cols-2 p-4 gap-4 eventcard'>
      <div>
        <img src={eventcover} className='mr-2 h-full object-cover' />
      </div>
      {accessing === "user" && 
        <FontAwesomeIcon 
          icon={faEllipsisH} 
          className='absolute right-4 top-4 bg-red-100 opacity-50 cursor-pointer' 
          onClick={optionsClicked} 
        />
      }
      
      {showOptions && 
        <Options
          msgid={id} 
          edit={editEvent} 
          deleteEvent={deleteEvent}
        />
      }

      {showEditForm && 
        <EditEventForm
          event={{ id, title, description, date, time, endtime, location, capacity, registrationdeadline }}
          onClose={handleCloseEditForm}
          onUpdate={handleUpdateEvent} // Pass the onUpdate callback
        />
      }

      <div className='flex flex-col justify-center items-start'>
        <div className='flex justify-center items-center'>
          <FontAwesomeIcon icon={faCalendarDay} /> 
          <p className='font-bold text-xl ml-2'>{title}</p>
        </div>

        <div className='flex flex-col justify-center items-start w-full ml-5 mt-3'>
          <div className='flex justify-center'>
            <div className='flex justify-center items-center border border-black shadow-md pl-2 pr-2 rounded-md'>
              <FontAwesomeIcon icon={faUserCheck} className='mr-2' />
              <p className='text-lg mr-2'>{capacity}</p>
            </div>
            <div className='flex justify-center items-center ml-2 border border-black shadow-md pl-2 pr-2 rounded-md'>
              <FontAwesomeIcon icon={faCalendarCheck} className='mr-2' />
              <p className='text-lg'>{formatDate(date)}</p>
            </div>
          </div>

          <div className='flex mt-2'>
            <div className='flex justify-center items-center border border-black shadow-md pl-2 pr-2 rounded-md'>
              <FontAwesomeIcon icon={faClock} className='mr-2' />
              <p className='text-lg mr-2'>{time}</p>
            </div>
            <p className='ml-2 mr-2'>-</p>
            <div className='flex justify-center items-center border border-black shadow-md pl-2 pr-2 rounded-md'>
              <FontAwesomeIcon icon={faClock} className='mr-2' />
              <p className='text-lg mr-2'>{endtime}</p>
            </div>
          </div>

          <div className='flex justify-center items-center border border-black shadow-md pl-2 pr-2 rounded-md mt-2'>
            <FontAwesomeIcon icon={faLocationPin} className='mr-2 ' />
            <p className='text-lg mr-2'>{location}</p>
          </div>
          <div className='flex justify-center items-center border border-black shadow-md pl-2 pr-2 rounded-md mt-2'>
            <FontAwesomeIcon icon={faCalendarXmark} className='mr-2' />
            <p className='text-lg mr-2'>{formatDate(registrationdeadline)}</p>
          </div>
        </div>

        <div className='text-left'>
          <p className='text-md mt-2'>{description}</p>
        </div>

        {accessing === "user" && 
          <button 
            className='mt-4 bg-slate-900 text-white px-4 py-2 rounded flex items-center'
            onClick={() => {
              fetchReport();
              setShowReportOverlay(true);
            }}
          >
            <FontAwesomeIcon icon={faFileAlt} className='mr-2' />
            Event Report
          </button>
        }
      </div>

      {/* Report Overlay */}
      {showReportOverlay && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-75 z-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-lg shadow-lg relative max-h-[80vh] overflow-auto'>
            <button
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
              onClick={() => setShowReportOverlay(false)}
            >
              <FontAwesomeIcon icon={faClose}/>
            </button>
            {loadingReport ? (
              <div className='text-center'>
                <p>Loading report...</p>
              </div>
            ) : (
              <div>
                <h2 className='text-xl font-bold mb-4'>Event Report</h2>
                <ReactToPrint
                  trigger={() => (
                    <div className='flex w-full justify-end'>
                    <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>
                      <FontAwesomeIcon icon={faPrint} className='mr-2' />
                      Print Report
                    </button>
                    </div>
                  )}
                  content={() => componentRef.current}
                />
                <PrintableReport ref={componentRef} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCardAdmin;
