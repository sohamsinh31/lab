import { fetchData, postData, putData, deleteData } from "@/components/services/CallAPI";
import Sidebar from "@/components/Sidebar";
import Table from "@/components/ui/Tables/Table";
import { sidebarData } from "@/components/utils/SidebarTestData";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ServiceRoute = () => {
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
                data = await fetchData(`${process.env.NEXT_PUBLIC_JWS_URL}/api/services`);
            } else {
                data = await postData(`${process.env.NEXT_PUBLIC_JWS_URL}/api/services/query/`, { query: query, version: 1, language: 'English' });
            }
            setUserData(data);
        } catch (error: any) {
            toast.error(data.error)
            // console.error(error.message);
        }
    };


    const fetchS = async () => {
        // let data;
        try {
            const data = await fetchData(`${process.env.NEXT_PUBLIC_JWS_URL}/api/services`);
            console.log(data)
            setUserData(data);
        } catch (error: any) {
            toast.error(error.message);
            console.error(error.message);
        }
    };

    const handleSave = async (updatedRecord: any) => {
        try {
            await putData(`${process.env.NEXT_PUBLIC_JWS_URL}/api/services/${updatedRecord.id}`, updatedRecord);
            console.log('User record updated successfully:', updatedRecord);
        } catch (error: any) {
            toast.error(error.message);
            console.error(error.message);
        }
    };

    const handleDelete = async (record: any) => {
        try {
            await deleteData(`${process.env.NEXT_PUBLIC_JWS_URL}/api/services`, { "ID": record.id });
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
            await postData(`${process.env.NEXT_PUBLIC_JWS_URL}/api/services`, record);
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

    return <div className='flex min-w-[95vw]'>
        <div className="m-2 p-2">
            <div className="row m-2 p-2">
                <h2>Client Services,</h2>
            </div>
            <div className="row m-1 p-1">
                <Table data={userData} fieldsConfig={{
                    "id": { type: 'hidden' },
                    "name": { type: 'text' },
                    "description": { type: 'text' },
                }}
                    onSave={handleSave}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    exportData={handleExport}
                    search={() => undefined}
                />
            </div>
        </div>
    </div>
}

export default ServiceRoute;