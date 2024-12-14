import React, { useEffect, useState } from 'react';
import EditBox from '@/components/ui/Components/Box/EditBox';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./Table.css"

interface TableProps {
    data: any[];
    fieldsConfig: Record<string, { type: string }>;
    onSave: (updatedRecord: any) => void;
    onAdd: (newRecord: any) => void;
    onDelete: (record: any) => void;
    exportData: () => void;
    search: (query: string) => void;
}

const Table: React.FC<TableProps> = ({ data, fieldsConfig, onSave, onAdd, onDelete, exportData, search }) => {
    const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
    const [editBoxOpen, setEditBoxOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10; // Number of records per page

    // Calculate the index of the last record on the current page
    const indexOfLastRecord = currentPage * recordsPerPage;
    // Calculate the index of the first record on the current page
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Get the current records to display on the page
    const currentRecords = Array.isArray(data) ? data.slice(indexOfFirstRecord, indexOfLastRecord) : [];

    // Logic to change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleEdit = (record: any) => {
        setSelectedRecord(record);
        setEditBoxOpen(true);
    };

    const handleRowClick = (record: any) => {
        setSelectedRecord(record);
        setEditBoxOpen(true);
    };

    const handleEditBoxClose = () => {
        setEditBoxOpen(false);
    };

    const handleAddClick = () => {
        setSelectedRecord(null);
        setEditBoxOpen(true);
    };

    const capitalizeFirstLetter = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <div className="ctable min-w-[75vw]">
            <div className="ctable-options">
                <div>
                    <input placeholder='Search' className='ctable-options-input' onChange={(e) => search(e.target.value)} type="text" name="data" />
                </div>
                <div className='ctable-options-m'></div>
                <div className='ctable-options-r'>
                    <button className='bg-green-300 m-1 p-1 text-black' onClick={exportData} type='button'>Export</button>
                    <button className='bg-yellow-300 m-1 p-1 text-black' onClick={handleAddClick} type='button'>+ Add</button>
                </div>
            </div>
            <div className="ctable-header">
                <div>Serial No</div>
                {Object.keys(fieldsConfig).map((field) => (
                    fieldsConfig[field].type !== 'hidden' && fieldsConfig[field].type !== 'checkbox' && (
                        <div key={field}>{capitalizeFirstLetter(field)}</div>
                    )
                ))}
                <div>Actions</div> {/* Add a column for actions */}
            </div>
            <div className="ctable-body">
                {currentRecords.map((record, index) => (
                    <div
                        key={record.id} // Replace 'id' with your actual unique identifier property
                        className="ctable-row"
                        style={{ ':hover': { background: 'black' } } as React.CSSProperties}
                        onClick={() => handleRowClick(record)}
                    >
                        <div>{indexOfFirstRecord + index + 1}</div>
                        {Object.keys(fieldsConfig).map((field) => (
                            fieldsConfig[field].type !== 'hidden' && fieldsConfig[field].type !== 'checkbox' && (
                                <div key={field}>
                                    {record[field].length > 8 ? `${record[field].substr(0, 8)}...` : record[field]}
                                </div>
                            )
                        ))}
                        <div className="actions">
                            <button
                                className='bg-green-300 m-1 p-0.5 text-black rounded-md'
                                type='button'
                                onClick={() => handleEdit(record)}
                                style={{ padding: '4px', marginRight: '8px' }} // Add margin and padding
                            >
                                <EditIcon style={{ fontSize: '16px' }} /> {/* Make the icon smaller */}
                            </button>
                            <button
                                className='bg-red-500 m-1 p-0.5 rounded-md'
                                type='button'
                                onClick={() => onDelete(record)}
                                style={{ padding: '4px' }} // Add padding
                            >
                                <DeleteIcon style={{ fontSize: '16px' }} /> {/* Make the icon smaller */}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="ctable-footer">
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(data.length / recordsPerPage) }).map((_, index) => (
                        <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                            {index + 1}
                        </li>
                    ))}
                </ul>
            </div>
            <EditBox open={editBoxOpen} onClose={handleEditBoxClose} record={selectedRecord} onSave={onSave} onAdd={onAdd} fieldsConfig={fieldsConfig} />
        </div>
    );
};

export default Table;
