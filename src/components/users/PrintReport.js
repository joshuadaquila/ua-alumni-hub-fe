// PrintReport.js
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PrintReport = ({ children }) => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div>
      <div className='flex justify-end'>
        
        <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
          <FontAwesomeIcon icon={faPrint} className='mr-2'/>
          Print Report
        </button>
      </div>
      <div ref={printRef}>
        {children}
      </div>
    </div>
  );
};

export default PrintReport;
