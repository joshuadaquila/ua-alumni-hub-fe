import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/users/Sidebar';
import UserHeader from '../../components/users/UserHeader';
import axios from 'axios';
import api from '../../pages/api';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';

// Custom header names configuration
const columnHeaders = {
    alumniid: 'Alumni ID',
    name: 'Name',
    awardname: 'Award Name',
    awardbody: 'Awarding Body',
    // Add more mappings here
};

const keyMapping = {
    yearGrad: 'Year Graduated',
    degree: 'Degree',
    // Add more key mappings here
};

export default function SurveySummary() {
    const [adminUName, setAdminUName] = useState(localStorage.getItem('adminUName'));
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
    const [surveyData, setSurveyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [toggled, setToggle] = useState(true);

    const pushCon = () => {
        setToggle(!toggled);
    };

    useEffect(() => {
        if (adminToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        }
    }, [adminToken]);

    useEffect(() => {
        const fetchSurveySummary = async () => {
            try {
                const response = await api.get('/getSurveySummary');
                setSurveyData(response.data);
            } catch (error) {
                console.error('Error fetching survey summary:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSurveySummary();
    }, []);

    console.log(surveyData);
    const handleDownload = () => {
        api.get('/surveySummary')
            .then(response => {
                const data = response.data;

                // Convert JSON data to worksheet
                const worksheet = XLSX.utils.json_to_sheet(data);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Survey Summary');

                // Write workbook to file
                XLSX.writeFile(workbook, 'survey_summary.xlsx');
            })
            .catch(error => {
                console.error("Error in downloading survey summary", error);
            });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => (
        <div className="flex justify-content-end">
            <span className="p-input-icon-right">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span>
        </div>
    );

    const header = renderHeader();

    const isValidJSON = (string) => {
        try {
            JSON.parse(string);
            return true;
        } catch (e) {
            return false;
        }
    };

    const formatJSON = (jsonString) => {
        try {
            const data = JSON.parse(jsonString);
            const mapKeys = (obj) => {
                return Object.entries(obj).reduce((acc, [key, value]) => {
                    const mappedKey = keyMapping[key] || key;
                    acc[mappedKey] = value;
                    return acc;
                }, {});
            };

            if (Array.isArray(data)) {
                return data.map((item, index) => (
                    <div key={index}>
                        {Object.entries(mapKeys(item)).map(([key, value]) => (
                            (value !== false && value !== null && value !== 'N/A') && (
                                <div key={key}>
                                    <strong>{key}:</strong> {value}
                                </div>
                            )
                        ))}
                    </div>
                ));
            } else {
                return Object.entries(mapKeys(data)).map(([key, value]) => (
                    (value !== false && value !== null && value !== 'N/A') && (
                        <div key={key}>
                            <strong>{key}:</strong> {value}
                        </div>
                    )
                ));
            }
        } catch (error) {
            return 'Invalid JSON';
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

                <div className='mt-[6rem] shadow-md text-black'>
                    <p className='text-2xl font-bold mb-12'>Survey Summary</p>

                    {loading ? (
                        <div className="flex justify-content-center align-items-center" style={{ height: '200px' }}>
                            <ProgressSpinner />
                        </div>
                    ) : (
                        <DataTable
                            value={surveyData}
                            paginator
                            rows={10}
                            rowsPerPageOptions={[10, 25, 50]}
                            tableStyle={{ minWidth: '50rem' }}
                            showGridlines
                            filters={filters}
                            filterDisplay="menu"
                            globalFilterFields={['alumniid', 'name']}
                            header={header}
                        >
                            {surveyData && surveyData.length > 0 && Object.keys(surveyData[0]).map(key => (
                                <Column key={key} field={key} header={columnHeaders[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                                    body={rowData => {
                                        if (isValidJSON(rowData[key])) {
                                            return formatJSON(rowData[key]);
                                        }
                                        return rowData[key];
                                    }} />
                            ))}
                        </DataTable>
                    )}

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
