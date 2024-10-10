import React, { useEffect, useState } from 'react';
import Table from './Table';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postData, putData, deleteData, fetchData } from '@/components/services/CallAPI';

const UsersTable: React.FC = () => {
    const [userData, setUserData] = useState<any[]>([]);

    useEffect(() => {
        fetchUserData(true);
    }, []);

    const fetchUserData = async (showToast: boolean) => {
        try {
            const myPromise = new Promise((resolve) => {
                fetchData(`${process.env.NEXT_PUBLIC_BACKEND}/users/`)
                    .then((data) => {
                        setUserData(data);
                        resolve(data);
                    })
                    .catch((error) => {
                        console.log(error.message);
                        throw error;
                    });
            });
            if (showToast) {
                toast.promise(myPromise, {
                    pending: "Fetching user data...",
                    success: "User data loaded successfully",
                    error: "Failed to fetch user data",
                });
            } else {
                // Refresh the data without showing the toast
                await myPromise;
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error('Failed to fetch user data');
        }
    };

    const handleSave = async (updatedRecord: any) => {
        try {
            const myPromise = new Promise<void>((resolve) => {
                putData(`${process.env.NEXT_PUBLIC_BACKEND}/users/${updatedRecord.id}`, updatedRecord)
                    .then(() => {
                        console.log('User record updated successfully:');
                        resolve();
                    })
                    .catch((error) => {
                        console.log(error.message);
                        throw error;
                    });
            });

            toast.promise(myPromise, {
                pending: "Updating user record...",
                success: "User record updated successfully",
                error: "Failed to update user record",
            });
            fetchUserData(false)
        } catch (error: any) {
            console.log(error.message);
            toast.error('Failed to update user record');
        }
    };

    const handleAdd = async (newRecord: any) => {
        try {
            const myPromise = new Promise<void>((resolve) => {
                postData(`${process.env.NEXT_PUBLIC_BACKEND}/users/`, newRecord)
                    .then(() => {
                        console.log('New user added successfully:');
                        resolve();
                    })
                    .catch((error) => {
                        console.log(error.message);
                        throw error;
                    });
            });

            toast.promise(myPromise, {
                pending: "Adding new user...",
                success: "New user added successfully",
                error: "Failed to add new user",
            });

            // Refresh the data after adding
            fetchUserData(false);
        } catch (error: any) {
            console.log(error.message);
            toast.error('Failed to add new user');
        }
    };

    const handleDelete = async (record: any) => {
        try {
            const myPromise = new Promise<void>((resolve) => {
                deleteData(`${process.env.NEXT_PUBLIC_BACKEND}/users/`, { id: record.id })
                    .then(() => {
                        console.log('User record deleted successfully:');
                        resolve();
                    })
                    .catch((error) => {
                        console.log(error.message);
                        throw error;
                    });
            });

            toast.promise(myPromise, {
                pending: "Deleting user record...",
                success: "User record deleted successfully",
                error: "Failed to delete user record",
            });

            // Refresh the data after deletion
            fetchUserData(false);
        } catch (error: any) {
            console.log(error.message);
            toast.error('Failed to delete user record');
        }
    };

    const handleExport = async () => {
        try {
            const myPromise = new Promise<void>((resolve) => {
                window.location.href = `${process.env.NEXT_PUBLIC_BACKEND}/api/users/export/`;
                resolve();
            });

            toast.promise(myPromise, {
                pending: "Exporting user data...",
                success: "User data exported successfully",
                error: "Failed to export user data",
            });
        } catch (error: any) {
            console.log(error.message);
            toast.error('Failed to export user data');
        }
    }

    const handleSearch = () => {
        // Handle search functionality here
    }

    return (
        <div>
            <ToastContainer />
            <Table
                search={handleSearch}
                exportData={handleExport}
                data={userData} onSave={handleSave} onAdd={handleAdd} onDelete={handleDelete}
                fieldsConfig={{
                    id: { type: 'hidden' },
                    username: { type: 'text' },
                    email: { type: 'text' },
                    role: { type: 'text' },
                    permissions: { type: 'text' },
                }} />
        </div>
    );
};

export default UsersTable;
