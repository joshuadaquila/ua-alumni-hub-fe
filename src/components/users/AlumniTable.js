import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import EditUserCon from './EditUserCon';
import { format } from 'date-fns';

export default function AlumniTable({ alumniData }) {
    const [editUser, setEditUser] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        alumniid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        address: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        birthday: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        graduationyear: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const handleEditUser = (userId) => {
        setSelectedUserId(userId);
        setEditUser(true);
    };

    const actionTemplate = (rowData) => {
        return (
            <div>
                <button className='bg-slate-600 p-2 rounded-sm text-white mr-2' onClick={() => handleEditUser(rowData.alumniid)}>Edit</button>
                <button className='bg-red-600 p-2 rounded-sm text-white'>Delete</button>
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

    const formatBirthday = (rowData) => {
        const date = new Date(rowData.birthday);
        return isNaN(date.getTime()) ? 'Invalid Date' : format(date, 'MMMM d, yyyy');
    };

    return (
        <div className="card">
            <DataTable 
                value={alumniData} 
                paginator 
                rows={5} 
                rowsPerPageOptions={[5, 10, 25, 50]} 
                tableStyle={{ minWidth: '50rem' }} 
                showGridlines 
                filters={filters} 
                filterDisplay="menu"
                globalFilterFields={['alumniid', 'name', 'address', 'birthday', 'graduationyear', 'email']} 
                header={header}
            >
                <Column field="alumniid" header="Alumni ID" filter filterPlaceholder="Search by ID" style={{ width: '10%' }}></Column>
                <Column field="name" header="Name" filter filterPlaceholder="Search by Name" style={{ width: '20%' }}></Column>
                <Column field="address" header="Address" filter filterPlaceholder="Search by Address" style={{ width: '20%' }}></Column>
                <Column field="birthday" header="Birthday" body={formatBirthday} filter filterPlaceholder="Search by Birthday" style={{ width: '15%' }}></Column>
                <Column field="graduationyear" header="Graduation Year" filter filterPlaceholder="Search by Graduation Year" style={{ width: '15%' }}></Column>
                <Column field="email" header="Email" filter filterPlaceholder="Search by Email" style={{ width: '20%' }}></Column>
                {/* <Column header="Action" body={actionTemplate}></Column> */}
            </DataTable>

            {editUser && <EditUserCon close={() => setEditUser(false)} userId={selectedUserId} />}
        </div>
    );
}
