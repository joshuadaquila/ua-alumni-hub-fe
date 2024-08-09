import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/users/Sidebar';
import EventCardAdmin from '../../components/users/EventCardAdmin';
import UserHeader from '../../components/users/UserHeader';
import AddBtn from '../../components/users/AddBtn';
import NewEventCon from '../../components/users/NewEventCon';
import NotificationCard from '../../components/NotificationCard';
import axios from 'axios';
import io from 'socket.io-client';
import api from '../api';

const socket = io('https://ua-alumhi-hub-be.onrender.com', {
  withCredentials: true
});

function Events({ logout }) {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
  const [toggled, setToggle] = useState(true);
  const [addEventCon, setAddEventCon] = useState(false);
  const [events, setEvents] = useState([]);
  const [notification, setNotification] = useState(null);
  const [get, setGet] = useState("all");
  const [happeningEvents, setHappeningEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReportOverlay, setShowReportOverlay] = useState(false);

  useEffect(() => {
    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    }
  }, [adminToken]);

  const fetchEvents = () => {
    api.get('/getEvents')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => console.error("error in home get events", error));
  };

  const fetchPastEvents = () => {
    api.get('/getPastEvents')
      .then(response => {
        setPastEvents(response.data);
      })
      .catch(error => console.error("error in home get past events", error));
  };

  const fetchFutureEvents = () => {
    api.get('/getFutureEvents')
      .then(response => {
        setFutureEvents(response.data);
      })
      .catch(error => console.error("error in home get future events", error));
  };

  const fetchHappeningEvents = () => {
    api.get('/getHappeningEvents')
      .then(response => {
        setHappeningEvents(response.data);
      })
      .catch(error => console.error("error in home get happening events", error));
  };

  useEffect(() => {
    fetchEvents();
    fetchPastEvents();
    fetchFutureEvents();
    fetchHappeningEvents();
  }, []);

  const handleDeleteEvent = (eventid) => {
    setEvents(events.filter(event => event.eventid !== eventid));
    setPastEvents(pastEvents.filter(event => event.eventid !== eventid));
    setFutureEvents(futureEvents.filter(event => event.eventid !== eventid));
    setHappeningEvents(happeningEvents.filter(event => event.eventid !== eventid));
  };

  const handleUpdate = () => {
    fetchEvents();
    fetchPastEvents();
    fetchFutureEvents();
    fetchHappeningEvents();
  };

  const fetchReport = async (eventid) => {
    setLoading(true);
    try {
      const response = await axios.get(`/eventReport/${eventid}`);
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching event report:', error);
    } finally {
      setLoading(false);
    }
  };

  const printReport = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Event Report</title></head><body>');
    printWindow.document.write('<h1>Event Report</h1>');
    if (reportData) {
      printWindow.document.write('<table border="1"><thead><tr><th>Registration ID</th><th>Name</th><th>Email</th></tr></thead><tbody>');
      reportData.forEach(row => {
        printWindow.document.write(`<tr><td>${row.registrationid}</td><td>${row.name}</td><td>${row.email}</td></tr>`);
      });
      printWindow.document.write('</tbody></table>');
    }
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const renderEvents = (events) => (
    events.map((event) => (
      <EventCardAdmin
        id={event.eventid}
        key={event.eventid}
        title={event.title}
        description={event.description}
        date={event.date}
        time={event.time}
        endtime={event.endtime}
        location={event.location}
        capacity={event.capacity}
        registrationdeadline={event.registrationdeadline}
        accessing={"user"}
        onDelete={handleDeleteEvent}
        onUpdate={handleUpdate}
        onReport={() => {
          fetchReport(event.eventid);
          setShowReportOverlay(true);
        }} // Add onReport callback
      />
    ))
  );

  useEffect(() => {
    socket.on('eventNotification', (msg) => {
      setNotification(msg);
    });

    return () => {
      socket.off('eventNotification');
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setNotification(null), 8000);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className='minbackground flex w-screen min-h-screen'>
      <div className={`${toggled ? "w-64" : ""}`}>
        <Sidebar handleClick={() => setToggle(!toggled)} />
      </div>
      <div className='p-4 flex-1 w-full flex flex-col items-center'>
        <div className='flex justify-center items-start'>
          <UserHeader page={"event"} getEvents={(toget) => setGet(toget)} />
        </div>
        <div className='w-[70%] flex flex-col justify-center items-end mt-[6rem] relative'>
          <AddBtn add={() => setAddEventCon(!addEventCon)} />
          {notification && <NotificationCard content={notification} show={true} />}
          {addEventCon && <NewEventCon close={() => setAddEventCon(false)} />}
          {get === 'all' ? (events.length > 0 ? renderEvents(events) : <p className='text-center w-full font-bold text-xl opacity-50'>No events found</p>) 
                : get === 'past' ? (pastEvents.length > 0 ? renderEvents(pastEvents) : <p className='text-center w-full font-bold text-xl opacity-50'>No past events</p>) 
                : get === 'future' ? (futureEvents.length > 0 ? renderEvents(futureEvents) : <p className='text-center w-full font-bold text-xl opacity-50'>No upcoming events</p>) 
                : get === 'happening' ? (happeningEvents.length > 0 ? renderEvents(happeningEvents) : <p className='text-center w-full font-bold text-xl opacity-50'>No happening events</p>) 
                : <p className='text-center w-full font-bold text-xl opacity-50'>No events found</p>}
        </div>
      </div>

      {/* Report Overlay */}
      {showReportOverlay && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-lg shadow-lg relative'>
            <button
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
              onClick={() => setShowReportOverlay(false)}
            >
              X
            </button>
            {loading ? (
              <div className='text-center'>Loading...</div>
            ) : (
              <div>
                <h2 className='text-xl font-bold mb-4'>Event Report</h2>
                {reportData && reportData.length > 0 ? (
                  <div>
                    <table className='min-w-full border-collapse border border-gray-200'>
                      <thead>
                        <tr>
                          <th className='border border-gray-300 p-2'>Registration ID</th>
                          <th className='border border-gray-300 p-2'>Name</th>
                          <th className='border border-gray-300 p-2'>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.map(row => (
                          <tr key={row.registrationid}>
                            <td className='border border-gray-300 p-2'>{row.registrationid}</td>
                            <td className='border border-gray-300 p-2'>{row.name}</td>
                            <td className='border border-gray-300 p-2'>{row.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
                      onClick={printReport}
                    >
                      Print Report
                    </button>
                  </div>
                ) : (
                  <p>No data available</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
