import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/users/Sidebar';
import UserHeader from '../../components/users/UserHeader';
import UsersTable from '../../components/users/UsersTable';
import AddBtn from '../../components/users/AddBtn';
import axios from 'axios';
import NewUserCon from '../../components/users/NewUserCon';
import EditUserCon from '../../components/users/EditUserCon';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

export default function TracerSurvey() {
  const [adminUName, setAdminUName] = useState(localStorage.getItem('adminUName'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
  const [users, setUsers] = useState([]);
  const [toggled, setToggle] = useState(true);
  const [showUserCon, setShowUserCon] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    usertype: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, question: 'Name' },
    { id: 2, question: 'Permanent Address' },
    { id: 3, question: 'E-mail Address' },
    { id: 4, question: 'Telephone or Contact Number(s)' },
    { id: 5, question: 'Mobile Number' },
    { id: 6, question: 'Civil Status' },
    { id: 7, question: 'Sex' },
    { id: 8, question: 'Birthday' },
    { id: 9, question: 'Region of Origin' },
    { id: 10, question: 'Province' },
    { id: 11, question: 'Location of Residence' },
    { id: 12, question: 'Educational Attainment (Baccalaureate Degree only)' },
    { id: 13, question: 'Professional Examination(s) Passed' },
    { id: 14, question: 'Reason(s) for taking the course(s) or pursuing degree(s)' },
    { id: 15, question: 'TRAINING(S)/ADVANCE STUDIES ATTENDED AFTER COLLEGE' },
    { id: 16, question: 'Are you presently employed?' },
    { id: 17, question: 'Please state reason(s) why you are not yet employed' },
    { id: 18, question: 'Present Employment Status' },
    { id: 19, question: 'Present occupation' },
    { id: 20, question: 'Major line of business of the company you are presently employed in' },
    { id: 21, question: 'Place of work' },
    { id: 22, question: 'Is this your first job after college?' },
    { id: 23, question: 'What are your reason(s) for staying on the job?' },
    { id: 24, question: 'Is your first job related to the course you took up in college?' },
    { id: 25, question: 'What were your reasons for accepting the job?' },
    { id: 26, question: 'What were your reason(s) for changing job?' },
    { id: 27, question: 'How long did you stay in your first job?' },
    { id: 28, question: 'How did you find your first job?' },
    { id: 29, question: 'How long did it take you to land your first job?' },
    { id: 30, question: 'Job Level Position' },
    { id: 31, question: 'What is your initial gross monthly earning in your first job after college?' },
    { id: 32, question: 'Was the curriculum you had in college relevant to your first job?' },
    { id: 33, question: 'If YES, what competencies learned in college did you find very useful in your first job?' },
    { id: 34, question: 'List down suggestions to further improve your course curriculum' },
  ]);

  useEffect(() => {
    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    }
  }, [adminToken]);

  const pushCon = () => {
    setToggle(!toggled);
  }
  
  const handleNewUserCon = () => {
    setShowUserCon(!showUserCon);
  }

  const actionTemplate = (rowData) => {
    return (
      <button className='bg-blue-600 p-2 rounded-sm text-white' onClick={() => alert(`Responses for question: ${rowData.question}`)}>See Responses</button>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="right">
          <InputIcon className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className='minbackground flex w-screen min-h-screen'>
      <div className={`${toggled ? "w-64" : ""}`}>
        <Sidebar handleClick={pushCon} />
      </div>
      <div className='p-4 flex-1 w-full flex flex-col items-center'>
        <div className='flex justify-center items-start'>
          <UserHeader />
        </div>

        <div className=' mt-[6rem] shadow-md text-black'>
          <p className='text-2xl font-bold'>Graduate Tracer Survey</p>
          <div className='flex justify-end'>
            <AddBtn add={handleNewUserCon} />
          </div>
          {showUserCon && <NewUserCon close={handleNewUserCon} /> }

          <div className="card">
            <DataTable 
                value={questions} 
                paginator 
                rows={10} 
                rowsPerPageOptions={[10, 20, 50]} 
                tableStyle={{ minWidth: '50rem' }} 
                showGridlines 
                filters={filters} 
                filterDisplay="menu"
                globalFilterFields={['question']} 
                header={header}
            >
                <Column field="question" header="Question" filter filterPlaceholder="Search by Question" style={{ width: '75%' }}></Column>
                <Column header="See Responses" body={actionTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  )
}
