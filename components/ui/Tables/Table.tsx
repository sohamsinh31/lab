import React, { useState } from "react";
import EditBox from "@/components/ui/Components/Box/EditBox";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import "./Table.css";

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
    const recordsPerPage = 10;

    // Pagination calculations
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = Array.isArray(data) ? data.slice(indexOfFirstRecord, indexOfLastRecord) : [];

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
        <div className="ctable min-w-[85vw]">
            <div className="ctable-options">
                <div>
                    <input
                        placeholder="Search"
                        className="ctable-options-input"
                        onChange={(e) => search(e.target.value)}
                        type="text"
                        name="data"
                    />
                </div>
                <div className="ctable-options-m"></div>
                <div className="ctable-options-r">
                    <button
                        className="bg-green-300 m-1 p-1 text-black"
                        onClick={exportData}
                        type="button"
                    >
                        Export
                    </button>
                    <button
                        className="bg-yellow-300 m-1 p-1 text-black"
                        onClick={handleAddClick}
                        type="button"
                    >
                        + Add
                    </button>
                </div>
            </div>

            <table className="table ctable min-w-[85vw] mt-0" border={1}>
                <thead className="ctable-header">
                    <tr>
                        <th>Serial No</th>
                        {Object.keys(fieldsConfig).map(
                            (field) =>
                                fieldsConfig[field].type !== "hidden" &&
                                fieldsConfig[field].type !== "checkbox" && (
                                    <th key={field}>{capitalizeFirstLetter(field)}</th>
                                )
                        )}
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody className="ctable-body">
                    {currentRecords.map((record, index) => (
                        <tr
                            key={record.id} // Replace 'id' with your actual unique identifier property
                            onClick={() => handleRowClick(record)}
                            className="ctable-row"
                        >
                            <td>{indexOfFirstRecord + index + 1}</td>
                            {Object.keys(fieldsConfig).map(
                                (field) =>
                                    fieldsConfig[field].type !== "hidden" &&
                                    fieldsConfig[field].type !== "checkbox" && (
                                        <td key={field}>
                                            {record[field]?.length > 8
                                                ? `${record[field].substr(0, 8)}...`
                                                : record[field]}
                                        </td>
                                    )
                            )}
                            <td>
                                <div className="actions">
                                    <button
                                        className="bg-green-300 m-1 p-0.5 text-black rounded-md"
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering row click
                                            handleEdit(record);
                                        }}
                                        style={{ padding: "4px", marginRight: "8px" }}
                                    >
                                        <EditIcon style={{ fontSize: "16px" }} />
                                    </button>
                                    <button
                                        className="bg-red-500 m-1 p-0.5 rounded-md"
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering row click
                                            onDelete(record);
                                        }}
                                        style={{ padding: "4px" }}
                                    >
                                        <DeleteIcon style={{ fontSize: "16px" }} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

                <tfoot className="ctable-footer">
                    <tr>
                        <td colSpan={Object.keys(fieldsConfig).length + 2} style={{border: 'none'}}>
                            <ul className="pagination">
                                {Array.from({ length: Math.ceil(data.length / recordsPerPage) }).map((_, index) => (
                                    <li
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={currentPage === index + 1 ? "active" : ""}
                                    >
                                        {index + 1}
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <EditBox
                open={editBoxOpen}
                onClose={handleEditBoxClose}
                record={selectedRecord}
                onSave={onSave}
                onAdd={onAdd}
                fieldsConfig={fieldsConfig}
            />
        </div>
    );
};

export default Table;
