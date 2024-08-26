import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faRing, faUser, faClose, faFile, faPrint } from '@fortawesome/free-solid-svg-icons';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Sidebar from '../../components/users/Sidebar';
import UserHeader from '../../components/users/UserHeader';
import api from '../api';
import ReactToPrint from 'react-to-print';

function Demographic() {
  const [toggled, setToggle] = useState(true);
  const [modeMetrics, setModeMetrics] = useState({});
  const [categoryCounts, setCategoryCounts] = useState({});
  const [educAttainmentCounts, setEducAttainmentData] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const componentRef = useRef();

  const pushCon = () => {
    setToggle(!toggled);
  };

  useEffect(() => {
    // Fetch mode metrics
    api.get('/getMode')
      .then(response => {
        const metrics = response.data.reduce((acc, item) => {
          acc[item.metric] = item.value;
          return acc;
        }, {});
        setModeMetrics(metrics);
      })
      .catch(error => {
        console.error('Error fetching mode metrics:', error);
      });

    // Fetch education attainment data
    api.get('/getEducAttainment')
      .then(response => {
        const data = response.data;
        const attainmentData = [
          { label: 'Graduate', value: data.gradCount },
          { label: 'Undergraduate', value: data.undergradCount },
        ];
        setEducAttainmentData(attainmentData);
      })
      .catch(error => {
        console.error('Error fetching education attainment:', error);
      });

    // Fetch category counts
    api.get('/getCounts')
      .then(response => {
        const counts = response.data.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push({ label: item.value, value: item.count });
          return acc;
        }, {});
        setCategoryCounts(counts);
      })
      .catch(error => {
        console.error('Error fetching category counts:', error);
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
    const { modeMetrics, categoryCounts, educAttainmentCounts } = props;

    return (
      <div ref={ref} className="p-4 print:p-0 bg-white rounded-lg max-h-full overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Demographic Insights</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Mode Metrics:</h3>
          <ul className="list-disc pl-5">
            {Object.entries(modeMetrics).map(([metric, value]) => (
              <li key={metric} className="mb-2">
                <strong>{metric}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Category Counts:</h3>
          {Object.keys(categoryCounts).map(category => (
            <div key={category} className="mb-4">
              <h4 className="text-lg font-semibold">{category}</h4>
              <ul className="list-disc pl-5">
                {categoryCounts[category].map((item, index) => (
                  <li key={index} className="mb-1">
                    <strong>{item.label}:</strong> {item.value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold">Educational Attainment:</h3>
          {educAttainmentCounts.length > 0 && renderPieChart(educAttainmentCounts)}
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
                  modeMetrics={modeMetrics}
                  categoryCounts={categoryCounts}
                  educAttainmentCounts={educAttainmentCounts}
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
                <p className='text-2xl font-bold'>Demographic Profiling</p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-10 w-full'>
                
                {/* Sex Pie Chart */}
                <div>
                  <div className='flex items-end mb-4'>
                    <div className='flex items-center'>
                      <FontAwesomeIcon icon={faPerson} />
                      <p className='text-lg ml-2 mr-2'>Mode Sex: {modeMetrics['Mode Sex']}</p>
                    </div>
                  </div>
                  {categoryCounts['Sex'] && renderPieChart(categoryCounts['Sex'])}
                </div>
                
                {/* Civil Status Pie Chart */}
                <div>
                  <div className='flex items-end mb-4'>
                    <div className='flex items-center'>
                      <FontAwesomeIcon icon={faRing} />
                      <p className='text-lg ml-2 mr-2'>Mode Civil Status: {modeMetrics['Mode Civil Status']}</p>
                    </div>
                  </div>
                  {categoryCounts['Civil Status'] && renderPieChart(categoryCounts['Civil Status'])}
                </div>
                
                {/* Age Range Pie Chart */}
                <div>
                  <div className='flex items-end mb-4'>
                    <div className='flex items-center'>
                      <FontAwesomeIcon icon={faUser} />
                      <p className='text-lg ml-2 mr-2'>Mean Age: {modeMetrics['Mean Age']}</p>
                    </div>
                  </div>
                  {categoryCounts['Age Range'] && renderPieChart(categoryCounts['Age Range'])}
                </div>

                {/* Educational Attainment Pie Chart */}
                <div>
                  <div className='flex items-end mb-4'>
                    <div className='flex items-center'>
                      <FontAwesomeIcon icon={faFile} />
                      <p className='text-lg ml-2 mr-2'>Educational Attainment</p>
                    </div>
                  </div>
                  {educAttainmentCounts.length > 0 && renderPieChart(educAttainmentCounts)}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demographic;
