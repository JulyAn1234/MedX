import React from 'react';
import Link from 'next/link';
interface MedicalHistoryProps {
    names: string;
    last_names: string;
    CURP: string;
    date_of_birth: string;
    sex: string;
    onClickEvent: () => void;
    isAdminPage?: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
}

const navExpedient: React.FC<MedicalHistoryProps> = ({ names, last_names,CURP, date_of_birth, sex, onClickEvent,onDelete, onEdit, isAdminPage}) => {
    date_of_birth = date_of_birth.split('T')[0];
    return (
        <tr className="border-b border-gray-200">
            <td className="py-2 px-4 text-left whitespace-nowrap">
                <p className="text-gray-700">{`${names} ${last_names}`}</p>
            </td>
            <td className="py-2 px-4 text-left whitespace-nowrap">
                <p className="text-gray-700">{CURP}</p>
            </td>
            <td className="py-2 px-4 text-left whitespace-nowrap">
                <p className="text-gray-700">{date_of_birth}</p>
            </td>
            <td className="py-2 px-4 text-left whitespace-nowrap">
                <p className="text-gray-700">{sex}</p>
            </td>
            <td className="py-2 px-4 text-left whitespace-nowrap">
                <div className="flex space-x-4 items-center justify-center">
                    <button className="w-12 h-12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={onClickEvent}>
                        <img src="/watch.png" alt="" />
                    </button>
                    {isAdminPage?
                        (<>
                            <button className="w-12 h-12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                                onClick={onDelete}>
                                <img src="/delete.png" alt="" />
                            </button>
                            <button className="w-12 h-12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                                onClick={onEdit}>
                                <img src="/edit.png" alt="" />
                            </button>
                        </>)
                        :
                        (<></>)}
                </div>
            </td>
        </tr>
    );
};

export default navExpedient;
