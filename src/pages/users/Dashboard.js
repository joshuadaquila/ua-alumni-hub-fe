import React, { useState, useEffect } from 'react';
import UserHeader from '../../components/users/UserHeader';
import Sidebar from '../../components/users/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import api from '../api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

function Dashboard({ logout }) {
  const [adminUName, setAdminUName] = useState(localStorage.getItem('adminUName'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const [alumniData, setAlumniData] = useState([]);
  const [totalAlumni, setTotalAlumni] = useState(0);
  const [futureEvents, setFutureEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [toggled, setToggle] = useState(true);
  const [attendees, setAttendees] = useState({});
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newAttendeeCount, setNewAttendeeCount] = useState(0);
  const [graduationYearData, setGraduationYearData] = useState({});
  const [graduateTotals, setGraduateTotals] = useState({});

  const pushCon = () => {
    setToggle(!toggled);
  };

  useEffect(() => {
    // Fetch dashboard stats from the server
    api.get(`/getDashboardStats`)
      .then(response => {
        setAlumniData(response.data);
        setTotalAlumni(response.data[0].totalAlumni);
      })
      .catch(error => {
        console.error(error);
        if (error.response.status === 401) {
          logout();
        }
      });

    // Fetch graduation year and program data for chart
    api.get(`/getYearProgram`)
      .then(response => {
        const data = response.data;
        const formattedData = data.reduce((acc, item) => {
          if (!acc[item.graduationyear]) {
            acc[item.graduationyear] = { programs: {}, totalTraced: 0 };
          }
          acc[item.graduationyear].programs[item.program] = item.count;
          acc[item.graduationyear].totalTraced += item.count;
          return acc;
        }, {});

        setGraduationYearData(formattedData);
      })
      .catch(error => {
        console.error(error);
        if (error.response.status === 401) {
          logout();
        }
      });

    // Fetch future events from the server
    api.get(`/getFutureEvents`)
      .then(response => {
        setFutureEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Fetch past events from the server
    api.get(`/getPastEvents`)
      .then(response => {
        const events = response.data;
        setPastEvents(events);

        // Initialize attendees state with current data from past events
        const initialAttendees = events.reduce((acc, event) => {
          acc[event.eventid] = event.totalattendees || 0; // Initialize with existing data or zero
          return acc;
        }, {});
        setAttendees(initialAttendees);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const updateAttendeesOnServer = (eventId, attendeeCount) => {
    api.post(`/setTotalAttended`, {
      eventId,
      attendeeCount
    })
    .then(response => {})
    .catch(error => {
      console.error(`Failed to update attendees for event ${eventId}:`, error);
    });
  };

  const handleSetAttendance = (eventId) => {
    setSelectedEventId(eventId);
    setNewAttendeeCount(attendees[eventId] || 0);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    // Update local state
    setAttendees(prevAttendees => ({
      ...prevAttendees,
      [selectedEventId]: newAttendeeCount,
    }));

    // Send the updated number of attendees to the server
    updateAttendeesOnServer(selectedEventId, newAttendeeCount);

    // Update past events to reflect the change
    setPastEvents(prevEvents =>
      prevEvents.map(event =>
        event.eventid === selectedEventId
          ? { ...event, totalattendees: newAttendeeCount }
          : event
      )
    );

    setModalVisible(false);
    setSelectedEventId(null);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedEventId(null);
  };

  const handleGraduateTotalChange = (year, value) => {
    setGraduateTotals(prevTotals => ({
      ...prevTotals,
      [year]: value,
    }));
  };

  const handleGraduateTotalSubmit = (year) => {
    const totalGraduates = graduateTotals[year] || 0;
    const totalTraced = graduationYearData[year]?.totalTraced || 0;
    const percentage = totalGraduates ? ((totalTraced / totalGraduates) * 100).toFixed(2) : "0.00";

    // Send the total graduates to the server
    api.post(`/setGraduateTotal`, {
      year,
      totalGraduates,
    })
    .then(response => {
      console.log(`Successfully set graduate total for ${year}`);
    })
    .catch(error => {
      console.error(`Failed to set graduate total for ${year}:`, error);
    });

    console.log(year, totalGraduates)
  };

  const percentageFormatter = (rowData) => {
    const registered = rowData.totalRegistration || 1; // Avoid division by zero
    const attendeeCount = attendees[rowData.eventid] || rowData.totalattendees; // Use updated attendees count
    const percentage = ((attendeeCount / registered) * 100).toFixed(2);
    return `${percentage}%`;
  };

  // Prepare data for the bar chart
  const allCourses = new Set();
  Object.values(graduationYearData).forEach(yearData => {
    Object.keys(yearData.programs).forEach(course => allCourses.add(course));
  });

  const labels = Object.keys(graduationYearData);
  const datasets = Array.from(allCourses).map((course, index) => {
    return {
      label: course,
      backgroundColor: `rgba(${index * 100}, ${index * 50 + 100}, ${index * 100 + 150}, 1)`,
      borderColor: `rgba(${index * 50}, ${index * 50 + 100}, ${index * 50 + 150}, 1)`,
      data: labels.map(year => graduationYearData[year].programs[course] || 0),
    };
  });

  const barChartData = {
    labels: labels,
    datasets: datasets
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'top',
        formatter: (value) => value,
        font: {
          weight: 'bold'
        }
      },
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Count: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Years'
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20
        }
      },
      y: {
        stacked: false,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count'
        }
      }
    }
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

        <div className='mt-[6rem] w-full'>
          <div className='flex items-center'>
            <p className='font-bold text-3xl text-start'>Welcome, {adminUName}! ✋</p>
          </div>

          <div>
            <h1 className='text-4xl font-bold text-start mt-6'>Dashboard</h1>
            <hr className='border-t-2 border-black mt-2'></hr>
          </div>

          <div className='grid grid-cols-1 p-10 place-content-center w-full gap-4'>
            {/* Total Alumni */}
            <div className='bg-white p-4 rounded-md shadow-md'>
              <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <p className='text-lg ml-2 mr-2'>Total Alumni: {totalAlumni}</p>
                </div>
              </div>
            </div>

            {/* Bar Chart */}
          <div className='bg-white p-4 rounded-md shadow-md flex justify-center'>
            <div className='flex flex-col items-center mr-10' style={{ width: '100%', maxWidth: '800px' }}>
              <h2 className='text-lg font-bold mb-4 text-center'>Graduation Year and Program Distribution</h2>
              <div style={{ width: '100%', height: '400px' }}>
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </div>

            {/* Feature for Total Graduates, Traced, and Percentage */}
            <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: '400px' }}>
              <h3 className='text-xl font-bold mb-4'>Graduate Information</h3>
              {Object.keys(graduationYearData).map(year => (
                <div key={year} className='mb-4 flex flex-col justify-center pl-10 pr-10'>
                  <p className='font-bold'>Year: {year}</p>
                  <label className='flex-1'>
                    Total Graduates:
                  </label>
                  <div className='flex items-center w-64'>
                   
                      <input
                        type='number'
                        value={graduateTotals[year] || ''}
                        onChange={(e) => handleGraduateTotalChange(year, e.target.value)}
                        className='border p-1 w-full'
                      />
                    
                    <button
                      onClick={() => handleGraduateTotalSubmit(year)}
                      className='ml-2 p-1 w-8 h-8 bg-blue-500 text-white rounded hover:bg-blue-600'
                    >
                      <FontAwesomeIcon icon={faCheck}/>
                    </button>
                  </div>
                  <p>Total Traced: {graduationYearData[year].totalTraced}</p>
                  <p>
                    Percentage: {graduateTotals[year] ? ((graduationYearData[year].totalTraced / graduateTotals[year]) * 100).toFixed(2) : '0.00'}%
                  </p>
                </div>
              ))}
            </div>

          </div>


            {/* Incoming Events */}
            <div className='bg-white p-4 rounded-md shadow-md'>
              <h2 className='text-lg font-bold mb-4'>Incoming Events</h2>
              <DataTable value={futureEvents} responsiveLayout="scroll">
                <Column field="title" header="Event Title"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="date" header="Date" body={(rowData) => rowData.date.split('T')[0]}></Column>
                <Column field="time" header="Start Time"></Column>
                <Column field="endtime" header="End Time"></Column>
                <Column field="location" header="Location"></Column>
                <Column field="capacity" header="Capacity"></Column>
                <Column field="totalRegistration" header="Total Registration"></Column>
              </DataTable>
            </div>

            {/* Past Events */}
            <div className='bg-white p-4 rounded-md shadow-md'>
              <h2 className='text-lg font-bold mt-6 mb-4'>Past Events</h2>
              <DataTable value={pastEvents} responsiveLayout="scroll">
                <Column field="title" header="Event Title"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="date" header="Date" body={(rowData) => rowData.date.split('T')[0]}></Column>
                <Column field="time" header="Start Time"></Column>
                <Column field="endtime" header="End Time"></Column>
                <Column field="location" header="Location"></Column>
                <Column field="capacity" header="Capacity"></Column>
                <Column field="totalRegistration" header="Total Registration"></Column>
                <Column field="totalattendees" header="Total Attendees"></Column>
                <Column header="Percentage" body={percentageFormatter}></Column>
                <Column
                  header="Action"
                  body={(rowData) => (
                    <button
                      onClick={() => handleSetAttendance(rowData.eventid)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Set Attendance
                    </button>
                  )}
                ></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Modal Component */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Set Number of Attendees</h2>
            <input
              type="number"
              value={newAttendeeCount}
              onChange={(e) => setNewAttendeeCount(parseInt(e.target.value, 10) || 0)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
