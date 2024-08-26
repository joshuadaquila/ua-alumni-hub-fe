import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBuilding, faCity, faMap, faPrint, faX, faClose, faFile, faMapMarked} from '@fortawesome/free-solid-svg-icons';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Sidebar from '../../components/users/Sidebar';
import UserHeader from '../../components/users/UserHeader';
import api from '../api';
import ReactToPrint from 'react-to-print';

function Employment() {
  const [toggled, setToggle] = useState(true);
  const [modeEmploymentMetrics, setModeEmploymentMetrics] = useState({});
  const [employmentCategoryCounts, setEmploymentCategoryCounts] = useState({});
  const [showReport, setShowReport] = useState(false);
  const componentRef = useRef();

  const pushCon = () => {
    setToggle(!toggled);
  };

  useEffect(() => {
    // Fetch mode employment metrics
    api.get(`/getModeEmployment`)
      .then(response => {
        const employmentMetrics = response.data.reduce((acc, item) => {
          acc[item.metric] = item.value;
          return acc;
        }, {});
        setModeEmploymentMetrics(employmentMetrics);
      })
      .catch(error => {
        console.error("Error fetching employment mode metrics:", error);
      });
  
    // Fetch employment category counts
    api.get(`/getEmploymentCounts`)
      .then(response => {
        const employmentCounts = response.data.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push({ label: item.value, value: item.count });
          return acc;
        }, {});
        setEmploymentCategoryCounts(employmentCounts);
      })
      .catch(error => {
        console.error("Error fetching employment category counts:", error);
      });
  }, []);
  

  const renderPieChart = (data) => {
    const TOTAL = data.reduce((acc, item) => acc + item.value, 0);
    const getArcLabel = (params) => {
      const percent = params.value / TOTAL;
      return `${(percent * 100).toFixed(0)}%`;
    };

    return (
      <div className="flex">
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
    const { modeMetrics, categoryCounts } = props;

    return (
      <div ref={ref} className="p-4 print:p-0 bg-white  rounded-lg max-h-full overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Employment Profiling</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Mode Employment Metrics:</h3>
          <ul className="list-disc pl-5">
            {Object.entries(modeMetrics).map(([metric, value]) => (
              <ul key={metric} className="mb-2">
                <strong>{metric}:</strong> {value}
              </ul>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Employment Category Counts:</h3>
          {Object.keys(categoryCounts).map(category => (
            <div key={category} className="mb-4">
              <h4 className="text-lg font-semibold">{category}</h4>
              <ul className="list-disc pl-5">
                {categoryCounts[category].map((item, index) => (
                  <ul key={index} className="mb-1">
                    <strong>{item.label}:</strong> {item.value}
                  </ul>
                ))}
              </ul>
            </div>
          ))}
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
                <PrintableReport
                  ref={componentRef}
                  modeMetrics={modeEmploymentMetrics}
                  categoryCounts={employmentCategoryCounts}
                />
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
                <p className='text-2xl font-bold'>Employment Profiling</p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-10 w-full'>
                <div>
                  <div className='flex items-end mb-4'>
                    <div className='flex items-center'>
                      <FontAwesomeIcon icon={faBriefcase} />
                      <p className='text-lg ml-2 mr-2'>Nature of Employment: {modeEmploymentMetrics['Presently Employed']}</p>
                    </div>
                  </div>
                  {employmentCategoryCounts['Presently Employed'] && renderPieChart(employmentCategoryCounts['Presently Employed'])}

                  <div className='flex items-end mb-4'>
                    <div className='flex items-center'>
                      <FontAwesomeIcon icon={faBuilding} />
                      <p className='text-lg ml-2 mr-2'>Employment Status: {modeEmploymentMetrics['Employment Status']}</p>
                    </div>
                  </div>
                  {employmentCategoryCounts['Employment Status'] && renderPieChart(employmentCategoryCounts['Employment Status'])}
                </div>

                <div>
                  <div className='flex items-end mb-4'>
                    <div className='flex items-center'>
                      <FontAwesomeIcon icon={faMapMarked} />
                      <p className='text-lg ml-2 mr-2'>Place of Work: {modeEmploymentMetrics['Place of Work']}</p>
                    </div>
                  </div>
                  {employmentCategoryCounts['Place of Work'] && renderPieChart(employmentCategoryCounts['Place of Work'])}

                  <div className='flex items-end mb-4'>
                    <div className='flex items-center'>
                      <FontAwesomeIcon icon={faMapMarked} />
                      <p className='text-lg ml-2 mr-2'>Job Earning: {modeEmploymentMetrics['Job Earning']}</p>
                    </div>
                  </div>
                  {employmentCategoryCounts['Job Earning'] && renderPieChart(employmentCategoryCounts['Job Earning'])}

                  <div className='flex items-end mb-4'>
                    <div className='flex items-center'>
                      <FontAwesomeIcon icon={faMapMarked} />
                      <p className='text-lg ml-2 mr-2'>First Job Level Position: {modeEmploymentMetrics['First Job Level Position']}</p>
                    </div>
                  </div>
                  {employmentCategoryCounts['First Job Level Position'] && renderPieChart(employmentCategoryCounts['First Job Level Position'])}


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employment;
