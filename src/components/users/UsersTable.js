import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import EditUserCon from './EditUserCon';
import api from '../../pages/api';

export default function UsersTable({ usersData }) {
    const [editUser, setEditUser] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        userid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        usertype: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        setUsers(usersData);
    }, [usersData]);

    const handleEditUser = (userId) => {
        setSelectedUserId(userId);
        setEditUser(true);
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await api.post('/admin/deleteUser', { userId });
            if (response.status === 200) {
                setUsers(users.filter(user => user.userid !== userId));
                alert('User deleted successfully');
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    };

    const actionTemplate = (rowData) => {
        return (
            <div>
                <button className='bg-slate-600 p-2 rounded-sm text-white mr-2' onClick={() => handleEditUser(rowData.userid)}>Edit</button>
                <button className='bg-red-600 p-2 rounded-sm text-white' onClick={() => handleDeleteUser(rowData.userid)}>Delete</button>
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

    return (
        <div className="card">
            <DataTable 
                value={users} 
                paginator 
                rows={5} 
                rowsPerPageOptions={[5, 10, 25, 50]} 
                tableStyle={{ minWidth: '50rem' }} 
                showGridlines 
                filters={filters} 
                filterDisplay="menu"
                globalFilterFields={['userid', 'username', 'usertype']} 
                header={header}
            >
                <Column field="userid" header="User ID" filter filterPlaceholder="Search by ID" style={{ width: '25%' }}></Column>
                <Column field="username" header="Username" filter filterPlaceholder="Search by Username" style={{ width: '25%' }}></Column>
                <Column field="usertype" header="Usertype" filter filterPlaceholder="Search by Usertype" style={{ width: '25%' }}></Column>
                <Column header="Action" body={actionTemplate}></Column>
            </DataTable>
            {console.log(selectedUserId)}
            {editUser && <EditUserCon close={() => setEditUser(false)} userId={selectedUserId} />}
        </div>
    );
}
