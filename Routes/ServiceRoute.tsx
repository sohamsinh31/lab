import { fetchData, postData, putData, deleteData } from "@/components/services/CallAPI";
import Sidebar from "@/components/Sidebar";
import Table from "@/components/ui/Tables/Table";
import { sidebarData } from "@/components/utils/SidebarTestData";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceRoute = () => {
    const [userData, setUserData] = useState<any[]>([]);
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const data = await fetchData(`${process.env.NEXT_PUBLIC_JWS_URL}/api/services`);
            setUserData(data);
        } catch (error: any) {
            toast.error("Error fetching data");
            console.error(error.message);
        }
    };

    const handleSearch = async (searchQuery: string) => {
        setQuery(searchQuery);
        try {
            const data = searchQuery.trim()
                ? await postData(`${process.env.NEXT_PUBLIC_JWS_URL}/api/services/query/`, {
                    query: searchQuery,
                    version: 1,
                    language: 'English',
                })
                : await fetchData(`${process.env.NEXT_PUBLIC_JWS_URL}/api/services`);
            setUserData(data);
        } catch (error: any) {
            toast.error("Error performing search");
            console.error(error.message);
        }
    };

    const handleSave = async (updatedRecord: any) => {
        try {
            await putData(`${process.env.NEXT_PUBLIC_JWS_URL}/api/services/${updatedRecord.id}`, updatedRecord);
            toast.success("Record updated successfully!");
            fetchServices();
        } catch (error: any) {
            toast.error("Error updating record");
            console.error(error.message);
        }
    };

    const handleDelete = async (record: any) => {
        try {
            await deleteData(`${process.env.NEXT_PUBLIC_JWS_URL}/api/services`, { ID: record.id });
            toast.success("Record deleted successfully!");
            fetchServices();
        } catch (error: any) {
            toast.error("Error deleting record");
            console.error(error.message);
        }
    };

    const handleAdd = async (newRecord: any) => {
        try {
            await postData(`${process.env.NEXT_PUBLIC_JWS_URL}/api/services`, newRecord);
            toast.success("Record added successfully!");
            fetchServices();
        } catch (error: any) {
            toast.error("Error adding record");
            console.error(error.message);
        }
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(userData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'exported_data.json';
        link.click();
    };

    return (
        <div className="flex">
            <div className="m-2 p-1 w-full">
                <div className="row m-2 p-1">
                    <h2>Client Services</h2>
                </div>
                <div className="row m-1 p-1">
                    <Table
                        data={userData}
                        fieldsConfig={{
                            id: { type: 'hidden' },
                            name: { type: 'text' },
                            description: { type: 'text' },
                            imageurl: { type: 'text' },
                        }}
                        onSave={handleSave}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        exportData={handleExport}
                        search={handleSearch}
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ServiceRoute;
