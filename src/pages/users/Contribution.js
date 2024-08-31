import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPrint, faClose, faFile } from '@fortawesome/free-solid-svg-icons';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Sidebar from '../../components/users/Sidebar';
import UserHeader from '../../components/users/UserHeader';
import api from '../api';
import ReactToPrint from 'react-to-print';

function Contribution() {
  const [toggled, setToggle] = useState(true);
  const [awardeePercentage, setAwardeePercentage] = useState(0);
  const [totalAwardees, setTotalAwardees] = useState(0);
  const [totalAlumni, setTotalAlumni] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const componentRef = useRef();

  const pushCon = () => {
    setToggle(!toggled);
  };

  useEffect(() => {
    // Fetch total awardees count
    api.get('/getTotalAwardee')
      .then(response => {
        const totalAwardees = response.data[0].totalawardee;
        setTotalAwardees(totalAwardees);
      })
      .catch(error => {
        console.error("Error fetching total awardees data:", error);
      });

    // Fetch total alumni count
    api.get('/getTotalAlumni')
      .then(response => {
        const totalAlumni = response.data[0].totalalumni;
        setTotalAlumni(totalAlumni);
      })
      .catch(error => {
        console.error("Error fetching total alumni data:", error);
      });
  }, []);

  useEffect(() => {
    if (totalAlumni > 0) {
      const percentage = (totalAwardees / totalAlumni) * 100;
      setAwardeePercentage(percentage.toFixed(2));
    } else {
      setAwardeePercentage(0);
    }
  }, [totalAwardees, totalAlumni]);

  const renderPieChart = () => {
    const data = [
      { label: 'Awardees', value: awardeePercentage },
      { label: 'Non-Awardees', value: 100 - awardeePercentage }
    ];
    const TOTAL = 100;
    const getArcLabel = (params) => {
      const percent = params.value / TOTAL;
      return `${(percent * 100).toFixed(0)}%`;
    };

    return (
      <div className="flex justify-center">
        <PieChart
          series={[
            {
              outerRadius: 200,
              data,
              arcLabel: getArcLabel,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontSize: 14,
            },
          }}
          width={500}
          height={500}
        />
      </div>
    );
  };

  const PrintableReport = React.forwardRef((props, ref) => {
    return (
      <div ref={ref} className="p-4 print:p-0 bg-white rounded-lg max-h-full overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Contribution Profiling</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Awardees Percentage:</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Category</th>
                <th className="border p-2">Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Awardees</td>
                <td className="border p-2">{awardeePercentage}%</td>
              </tr>
              <tr>
                <td className="border p-2">Non-Awardees</td>
                <td className="border p-2">{100 - awardeePercentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  });

  return (
    <div className='minbackground flex w-screen min-h-screen'>
      <div className={`${toggled ? "w-64" : ""}`}>
        <Sidebar handleClick={pushCon} />
      </div>
      <div className='p-4 flex-1 w-full flex'>
        <div className='flex-1'>
          <button
            className="absolute top-32 right-4 p-2 bg-blue-500 text-white rounded"
            onClick={() => setShowReport(!showReport)}
          >
            <FontAwesomeIcon icon={faFile} className='mr-2'/>
            {showReport ? 'Hide Report' : 'Show Report'}
          </button>

          {showReport && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="relative bg-white p-6 rounded-lg max-h-[90vh] overflow-auto w-full max-w-4xl">
                <PrintableReport ref={componentRef} />
                <button
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded"
                  onClick={() => setShowReport(false)}
                >
                  <FontAwesomeIcon icon={faClose} className='mr-2' />
                  Close
                </button>
                <div className="mt-4">
                  <ReactToPrint
                    trigger={() => <button className="p-2 bg-blue-500 text-white rounded">
                      <FontAwesomeIcon icon={faPrint} className='mr-2'/>Print Report</button>}
                    content={() => componentRef.current}
                  />
                </div>
              </div>
            </div>
          )}

          <div className='flex flex-col items-center'>
            <UserHeader />
            <div className='mt-[6rem] w-full'>
              <div className='flex items-center mb-6'>
                <p className='text-2xl font-bold'>Contribution Profiling</p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-10 w-full'>
                <div>
                  <div className='flex items-end mb-4'>
                    <div className='flex items-center'>
                      <FontAwesomeIcon icon={faBriefcase} />
                      <p className='text-lg ml-2 mr-2'>Awardees Percentage: {awardeePercentage}%</p>
                    </div>
                  </div>
                  {renderPieChart()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contribution;
