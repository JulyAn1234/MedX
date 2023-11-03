import exp from 'constants';
import React from 'react';

interface MedicalHistoryProps {
    expedient: Record<string, any>;
}

const expedient: React.FC<MedicalHistoryProps> = ({ expedient}) => {
    console.log(`From expedient:${expedient}`);
    console.log(expedient);
    return (
        <div className='bg-white rounded border-2 mx-80 p-8'>
            <table className="table-fixed border border-gray-200" >
                <thead className='bg-gray-200'>
                    <tr>
                        <th className='px-4 py-2 text-center' colSpan={4}>Datos del paciente</th>
                    </tr>
                </thead>
                <tbody className=''>
                    <tr className=''>
                        <td className='pr-10 pl-2' colSpan={2}>
                            <div className='flex'>
                                <p className='font-bold'>Nombre Completo:</p>
                                <p className='pl-2'>{`${expedient.names} ${expedient.last_names}`}</p>
                            </div>
                        </td>
                        <td className='px-20' colSpan={2}>
                            <div className='flex'>
                                <p className='font-bold'>CURP:</p>
                                <p className='pl-2'>{`${expedient.CURP}`}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Sexo:</p>
                                <p className=''>{`${expedient.sex}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Escolaridad:</p>
                                <p className=''>{`${expedient.education}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Edad:</p>
                                <p className=''>{`${expedient.age}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Ocupación:</p>
                                <p className=''>{`${expedient.occupation}`}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                    <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Peso:</p>
                                <p className=''>{`${expedient.weight}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Talla:</p>
                                <p className=''>{`${expedient.clothes_size}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Estatura (cm):</p>
                                <p className=''>{`${expedient.height}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Etnia:</p>
                                <p className=''>{`${expedient.ethnicity}`}</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="table-fixed">
                <thead>
                    <tr>
                        <th>Antecedentes patológicos y heredofamiliares</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Diabetes:</p>
                                <p className=''>{`${expedient.names} ${expedient.last_names}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Enf. reumáticas:</p>
                                <p className=''>{`${expedient.CURP}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Fracturas:</p>
                                <p className=''>{`${expedient.sex}`}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Alergias:</p>
                                <p className=''>{`${expedient.sex}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Encames:</p>
                                <p className=''>{`${expedient.education}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Contracturas musculares:</p>
                                <p className=''>{`${expedient.age}`}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Cancer:</p>
                                <p className=''>{`${expedient.weight}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Accidentes:</p>
                                <p className=''>{`${expedient.clothes_size}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Transfusiones:</p>
                                <p className=''>{`${expedient.height}`}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Cardiopatías:</p>
                                <p className=''>{`${expedient.weight}`}</p>
                            </div>
                        </td>
                        <td className=''>
                            <div className='flex'>
                                <p className='font-bold'>Cirugías:</p>
                                <p className=''>{`${expedient.height}`}</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='flex'>
                <table className="table-fixed">
                    <thead>
                        <tr>
                            <th>Antecedentes patológicos y heredofamiliares</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=''>
                                <div className='flex'>
                                    <p className='font-bold'>Tabaquismo:</p>
                                    <p className=''>{`${expedient.names} ${expedient.last_names}`}</p>
                                </div>
                            </td>
                            <td className=''>
                                <div className='flex'>
                                    <p className='font-bold'>Actividad física:</p>
                                    <p className=''>{`${expedient.CURP}`}</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className=''>
                                <div className='flex'>
                                    <p className='font-bold'>Alcoholismo:</p>
                                    <p className=''>{`${expedient.sex}`}</p>
                                </div>
                            </td>
                            <td className=''>
                                <div className='flex'>
                                    <p className='font-bold'>Se automédica:</p>
                                    <p className=''>{`${expedient.education}`}</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className=''>
                                <div className='flex'>
                                    <p className='font-bold'>Drogras:</p>
                                    <p className=''>{`${expedient.weight}`}</p>
                                </div>
                            </td>
                            <td className=''>
                                <div className='flex'>
                                    <p className='font-bold'>Pasatiempos:</p>
                                    <p className=''>{`${expedient.clothes_size}`}</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {expedient.sex === 'Mujer'?
                (
                    <table className="table-fixed">
                    <thead>
                        <tr>
                            <th>En mujeres</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=''>
                                <div className='flex'>
                                    <p className='font-bold'>Está embarazada:</p>
                                    <p className=''>{`${expedient.names} ${expedient.last_names}`}</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className=''>
                                <div className='flex'>
                                    <p className='font-bold'>¿Cuántos hijos tiene?:</p>
                                    <p className=''>{`${expedient.sex}`}</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                )
                :
                (<></>)
                }
            </div>
        </div>
    );
};

export default expedient;
