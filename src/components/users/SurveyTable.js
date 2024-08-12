import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import api from '../../pages/api';

// Custom header names configuration
const columnHeaders = {
    alumniid: 'Alumni ID',
    name: 'Name',
    telnumber: 'Telephone Number',
    mobilenum: 'Mobile Number',
    civilstatus: 'Civil Status',
    educattain: 'Educational Attainment',
    exampassed: 'Exam Passed',
    reasonundergrad: 'Reason/s for Pursuing Undergraduate Course/s',
    reasongrad: 'Reason/s for Pursuing Graduate Course/s', trainingtitle: 'Training Title',
    // Add more column field to header name mappings here
};

// Key mapping for JSON transformation
const keyMapping = {
    yearGrad: 'Year Graduated',
    degree: 'Degree',
    college: 'College', duration: 'Duration', institution: 'Institution',
    honor: 'Honor', title: 'Title', name: 'Name', date: 'Date', rating: 'Rating',
    parentInfluence: 'Parent Influence', passionProfession: 'Passion for the Profession'
    // Add more key mappings here
};

export default function SurveyTable({ surveyData }) {
    const [responses, setResponses] = useState({});
    const [dialogVisible, setDialogVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        alumniid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const printRef = useRef();

    const fetchResponses = async (userId) => {
        try {
            setLoading(true);
            const genInfo = await api.get(`/getSurveyGenInfo`, { params: { userId } });
            const educBack = await api.get(`/getSurveyEducBack`, { params: { userId } });
            const training = await api.get(`/getSurveyTraining`, { params: { userId } });
            const employData = await api.get(`/getEmployData`, { params: { userId } });
            const contriProfile = await api.get(`/getContriProfile`, { params: { userId } });

            setResponses({
                genInfo: genInfo.data,
                educBack: educBack.data,
                training: training.data,
                employData: employData.data,
                contriProfile: contriProfile.data,
            });

            setDialogVisible(true);
        } catch (error) {
            console.error('Error fetching responses:', error);
        } finally {
            setLoading(false);
        }
    };

    const actionTemplate = (rowData) => (
        <button className='bg-blue-600 p-2 rounded-sm text-white mr-2' onClick={() => fetchResponses(rowData.alumniid)}>
            See Response
        </button>
    );

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => (
        <div className="flex justify-content-end">
            <IconField iconPosition="right">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </IconField>
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
                    const mappedKey = keyMapping[key] || key; // Use the mapped key if available
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
                            <strong>{key}</strong> {value}
                        </div>
                    )
                ));
            }
        } catch (error) {
            return 'Invalid JSON';
        }
    };

    const responseTable = (title, data) => (
        <div className="my-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <DataTable value={data} responsiveLayout="scroll">
                {data && data.length > 0 && Object.keys(data[0]).map(key => (
                    key !== 'alumniid' && (
                        <Column key={key} field={key} header={columnHeaders[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                            body={rowData => {
                                // Apply JSON formatting for the specific column 'howfoundfirstjob'
                                if (key === 'howfoundfirstjob' && isValidJSON(rowData[key])) {
                                    return formatJSON(rowData[key]);
                                }
                                // Apply JSON formatting for other columns if expected to have JSON data
                                if (key !== 'reason' && key!== 'skillsaquiredincollege' && isValidJSON(rowData[key])) {
                                    return formatJSON(rowData[key]);
                                }
                                return rowData[key]; // Default rendering for non-JSON columns
                            }} />
                    )
                ))}
            </DataTable>
        </div>
    );

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .my-4 { margin: 1.5rem 0; }
                        .text-lg { font-size: 1.125rem; }
                        .font-bold { font-weight: bold; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f4f4f4; }
                    </style>
                </head>
                <body>
                    ${printRef.current.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    return (
        <div className="card">
            <DataTable
                value={surveyData}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                showGridlines
                filters={filters}
                filterDisplay="menu"
                globalFilterFields={['alumniid', 'name']}
                header={header}
            >
                <Column field="alumniid" header={columnHeaders.alumniid || 'Alumni ID'} filter filterPlaceholder="Search by ID" style={{ width: '20%' }}></Column>
                <Column field="name" header={columnHeaders.name || 'Name'} filter filterPlaceholder="Search by Name" style={{ width: '50%' }}></Column>
                <Column header="Response" body={actionTemplate} style={{ width: '30%' }}></Column>
            </DataTable>

            <Dialog header="Survey Responses" visible={dialogVisible} onHide={() => setDialogVisible(false)} style={{ width: '70vw' }}>
                <Button className='bg-blue-500 text-white p-4' label="Print" icon="pi pi-print" onClick={handlePrint} />
                <div ref={printRef}>
                    {loading ? (
                        <div className="flex justify-content-center align-items-center" style={{ height: '200px' }}>
                            <ProgressSpinner />
                        </div>
                    ) : (
                        <>
                            {responseTable("General Information", responses.genInfo)}
                            {responseTable("Educational Background", responses.educBack)}
                            {responseTable("Training", responses.training)}
                            {responseTable("Employment Data", responses.employData)}
                            {responseTable("Contribution Profile", responses.contriProfile)}
                        </>
                    )}
                </div>
            </Dialog>

            {loading && (
                <div className="loading-overlay">
                    <ProgressSpinner />
                </div>
            )}
        </div>
    );
}

// CSS for the overlay
const overlayStyle = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
`;

document.head.insertAdjacentHTML('beforeend', `<style>${overlayStyle}</style>`);
