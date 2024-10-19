"use client"
import React, { useEffect, useState } from 'react';
import Table from './Table';
import { toast, ToastContainer } from 'react-toastify';
import { postData, putData, deleteData, fetchData } from '@/components/services/CallAPI';

const DataTable: React.FC = () => {
    const [userData, setUserData] = useState<any[]>([]);
    // const [query, setQuery] = useState<any>('');

    // console.log(query)

    useEffect(() => {
        fetchS();
    }, []);

    const search = async (query: string) => {
        let data;
        try {
            if (query.trim() === '') {
                data = await fetchData(`${process.env.NEXT_PUBLIC_BACKEND}/records/`);
            } else {
                data = await postData(`${process.env.NEXT_PUBLIC_BACKEND}/records/query/`, { query: query, version: 1, language: 'English' });
            }
            setUserData(data);
        } catch (error: any) {
            // toast.error(data.error)
            console.error(error.message);
        }
    };


    const fetchS = async () => {
        // let data;
        try {
            const data = await fetchData(`${process.env.NEXT_PUBLIC_BACKEND}/records/`);
            // console.log(data)
            setUserData(data);
        } catch (error: any) {
            toast.error(error.message);
            console.error(error.message);
        }
    };

    const handleSave = async (updatedRecord: any) => {
        try {
            await putData(`${process.env.NEXT_PUBLIC_BACKEND}/records/`, updatedRecord);
            console.log('User record updated successfully:', updatedRecord);
        } catch (error: any) {
            toast.error(error.message);
            console.error(error.message);
        }
    };

    const handleDelete = async (record: any) => {
        try {
            // console.log(`${process.env.NEXT_PUBLIC_BACKEND}/records/${record.ID}`)
            await deleteData(`${process.env.NEXT_PUBLIC_BACKEND}/records/`, { "ID": record.ID });
            console.log('User record deleted successfully:');
            // Refresh the data after deletion
            fetchS();
        } catch (error: any) {
            toast.error(error.message);
            console.error(error.message);
        }
    };

    const handleAdd = async (record: any) => {
        try {
            // console.log(record)
            await postData(`${process.env.NEXT_PUBLIC_BACKEND}/records/`, JSON.stringify(record));
            console.log('User record added successfully:');
            // Refresh the data after addition
            fetchS();
        } catch (error: any) {
            toast.error(error.message);
            console.error(error.message);
        }
    };

    const handleExport = () => {
        // Add export functionality if needed
    };

    return (
        <div>
            <ToastContainer />
            {userData && <Table
                search={search}
                exportData={handleExport}
                data={userData}
                onSave={handleSave}
                onDelete={handleDelete}
                onAdd={handleAdd}
                fieldsConfig={{
                    ID: { type: 'hidden' },
                    Link: { type: 'text' },
                    Topic: { type: 'text' },
                    Text: { type: 'text' },
                    Category: { type: 'text' },
                    Tags: { type: 'text' },
                    Context: { type: 'text' },
                    Language: { type: 'text' },
                    Access: { type: 'text' },
                    Version: { type: 'text' },
                    Active: { type: 'checkbox' },
                }}
            />
            }
        </div>
    );
};

export default DataTable;
