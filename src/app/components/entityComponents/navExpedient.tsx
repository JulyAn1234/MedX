import React from 'react';
import Link from 'next/link';
interface MedicalHistoryProps {
    names: string;
    last_names: string;
    CURP: string;
    date_of_birth: string;
    sex: string;
}

const navExpedient: React.FC<MedicalHistoryProps> = ({ names, last_names,CURP, date_of_birth, sex }) => {
    date_of_birth = date_of_birth.split('T')[0];
    return (
        <Link href= {`/admin/navegar-historiales/${CURP}`}className="bg-white shadow-md rounded px-8 pt-6 pb-8 mx-80 mb-4 flex flex-col my-2">
                {/* <h2 className="text-2xl font-bold mb-2">Historial Médico</h2> */}
            <div className="flex justify-center space-x-32 " >
                <div className="flex flex-col ">
                    <p className="text-gray-700 font-bold">Nombre completo:</p>
                    <p className="text-gray-700">{`${names} ${last_names}`}</p>
                </div>
                <div className="flex flex-col ">
                    <p className="text-gray-700 font-bold">CURP:</p>
                    <p className="text-gray-700">{CURP}</p>
                </div>
                <div className="flex flex-col ">
                    <p className="text-gray-700 font-bold">Fecha de nacimiento:</p>
                    <p className="text-gray-700">{date_of_birth}</p>
                </div>
                <div className="flex flex-col ">
                    <p className="text-gray-700 font-bold">Sexo:</p>
                    <p className="text-gray-700">{sex}</p>
                </div>
            </div>
        </Link>
    );
};

export default navExpedient;
