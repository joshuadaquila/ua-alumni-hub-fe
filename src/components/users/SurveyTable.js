import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from 'axios';
import { format } from 'date-fns';
import api from '../../pages/api';

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
            setLoading(true);  // Start loading indicator
            console.log(`Fetching responses for userId: ${userId}`);
            const genInfo = await api.get(`/getSurveyGenInfo`, { params: { userId } });
            console.log('genInfo:', genInfo.data);
            const educBack = await api.get(`/getSurveyEducBack`, { params: { userId } });
            console.log('educBack:', educBack.data);
            const training = await api.get(`/getSurveyTraining`, { params: { userId } });
            console.log('training:', training.data);
            const employData = await api.get(`/getEmployData`, { params: { userId } });
            console.log('employData:', employData.data);
            const contriProfile = await api.get(`/getContriProfile`, { params: { userId } });
            console.log('contriProfile:', contriProfile.data);

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
            setLoading(false);  // Stop loading indicator
        }
    };

    const actionTemplate = (rowData) => {
        return (
            <div>
                <button className='bg-blue-600 p-2 rounded-sm text-white mr-2' onClick={() => fetchResponses(rowData.alumniid)}>See Response</button>
            </div>
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

    const responseTable = (title, data) => (
        <div className="my-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <DataTable value={data} responsiveLayout="scroll">
                {data && data.length > 0 && Object.keys(data[0]).map(key => (
                    <Column key={key} field={key} header={key.charAt(0).toUpperCase() + key.slice(1)}></Column>
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
    

    console.log(dialogVisible);

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
                <Column field="alumniid" header="Alumni ID" filter filterPlaceholder="Search by ID" style={{ width: '20%' }}></Column>
                <Column field="name" header="Name" filter filterPlaceholder="Search by Name" style={{ width: '50%' }}></Column>
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
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }
`;

document.head.insertAdjacentHTML('beforeend', `<style>${overlayStyle}</style>`);
