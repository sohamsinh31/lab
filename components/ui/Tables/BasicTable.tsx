import React from 'react';

interface TableProps {
    headers: string[];
    data: { [key: string]: string }[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-[80vw] border border-gray-200 rounded-lg">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="py-2 px-4 border-b text-left text-sm uppercase font-bold">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-600">
                            {headers.map((header) => (
                                <td key={header} className="py-2 px-4 border-b">
                                    {row[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
