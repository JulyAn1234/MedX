import React from 'react';

interface MedicalHistoryProps {
    expedient: Record<string, any>;
}

const expedient: React.FC<MedicalHistoryProps> = ({ expedient}) => {
    console.log(`From expedient:${expedient}`);
    console.log(expedient);
    return (
        <div className='flex flex-col w-50'>
            <table className="table-fixed border border-gray-200" >
                <thead className='bg-gray-200'>
                    <tr>
                        <th className='px-4 py-2 text-center' colSpan={4}>Datos del paciente</th>
                    </tr>
                </thead>
                <tbody className=''>
                    <tr className=''>
                        <td className='pr-10 pl-2 py-2' colSpan={2}>
                            <div className='flex'>
                                <p className='font-bold'>Nombre Completo:</p>
                                <p className='pl-2'>{`${expedient.names} ${expedient.last_names}`}</p>
                            </div>
                        </td>
                        <td className='px-20 py-2' colSpan={2}>
                            <div className='flex'>
                                <p className='font-bold'>CURP:</p>
                                <p className='pl-2'>{`${expedient.CURP}`}</p>
                            </div>
                        </td>
                    </tr>
                    <tr className=''>
                        <td className='pl-2 py-2'>
                            <div className='flex'>
                                <p className='font-bold'>Sexo:</p>
                                <p className='pl-2'>{`${expedient.sex}`}</p>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='font-bold'>Escolaridad:</p>
                                <p className='pl-2'>{`${expedient.education}`}</p>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='font-bold'>Edad:</p>
                                <p className='pl-2'>{`${expedient.age}`}</p>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='font-bold'>Ocupación:</p>
                                <p className='pl-2'>{`${expedient.occupation}`}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pl-2 py-2'>
                            <div className='flex'>
                                <p className='font-bold'>Peso:</p>
                                <p className='pl-2'>{`${expedient.weight}`}</p>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='font-bold'>Talla:</p>
                                <p className='pl-2'>{`${expedient.clothes_size}`}</p>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='font-bold'>Estatura (cm):</p>
                                <p className='pl-2'>{`${expedient.height}`}</p>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='font-bold'>Etnia:</p>
                                <p className='pl-2'>{`${expedient.ethnicity}`}</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="table-fixed my-8 border-spacing-y-2">
                <thead className=' border border-gray-200'>
                    <tr className='bg-gray-200'>
                        <th className='px-4 py-2 text-center'colSpan={4}>Antecedentes patológicos y heredofamiliares</th>
                    </tr>
                </thead>
                <tbody className='border border-gray-200'>
                    <tr>
                        <td className='pl-2 py-2'>
                            <div className='flex'>
                                <p className='font-bold'>Diabetes:</p>
                                <p className='pl-2'>{expedient.diabetes? "Si":"No"}</p>
                            </div>
                        </td>
                        <td className='px-4 '>
                            <div className='flex'>
                                <p className='font-bold'>Enf. reumáticas:</p>
                                <p className='pl-2'>{expedient.rheumatic_diseases? "Si":"No"}</p>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='font-bold'>Fracturas:</p>
                                <p className='pl-2'>{expedient.fractures? "Si":"No"}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pl-2 py-2'>
                            <div className='flex'>
                                <p className='font-bold'>Alergias:</p>
                                <p className='pl-2'>{expedient.allergies? "Si":"No"}</p>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='font-bold'>Encames:</p>
                                <p className='pl-2'>{expedient.layed? "Si":"No"}</p>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='font-bold'>Contracturas musculares:</p>
                                <p className='pl-2'>{expedient.contractures? "Si":"No"}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pl-2 py-2'>
                            <div className='flex'>
                                <p className='font-bold'>Cancer:</p>
                                <p className='pl-2'>{expedient.cancer? "Si":"No"}</p>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='font-bold'>Accidentes:</p>
                                <p className='pl-2'>{expedient.accidents? "Si":"No"}</p>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='font-bold'>Transfusiones:</p>
                                <p className='pl-2'>{expedient.transfusions? "Si":"No"}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pl-2 py-2'>
                            <div className='flex'>
                                <p className='font-bold'>Cardiopatías:</p>
                                <p className='pl-2'>{expedient.cardiopathies? "Si":"No"}</p>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='font-bold'>Cirugías:</p>
                                <p className='pl-2'>{expedient.surgeries? "Si":"No"}</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='flex flex-row'>
                <table className="table-fixed border border-gray-200">
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className='px-4 py-2 text-center'colSpan={2}>Hábitos de salud</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='pl-2 py-2'>
                                <div className='flex'>
                                    <p className='font-bold'>Tabaquismo:</p>
                                    <p className='pl-2'>{expedient.tabaquism? "Si":"No"}</p>
                                </div>
                            </td>
                            <td className='px-4'>
                                <div className='flex'>
                                    <p className='font-bold'>Actividad física:</p>
                                    <p className='pl-2'>{expedient.physical_activity? "Si":"No"}</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='pl-2 py-2'>
                                <div className='flex'>
                                    <p className='font-bold'>Alcoholismo:</p>
                                    <p className='pl-2'>{expedient.alcoholism? "Si":"No"}</p>
                                </div>
                            </td>
                            <td className='px-4'>
                                <div className='flex'>
                                    <p className='font-bold'>Se automédica:</p>
                                    <p className='pl-2'>{expedient.automedication? "Si":"No"}</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='pl-2 py-2'>
                                <div className='flex'>
                                    <p className='font-bold'>Drogras:</p>
                                    <p className='pl-2'>{expedient.drug_use? "Si":"No"}</p>
                                </div>
                            </td>
                            <td className='px-4'>
                                <div className='flex'>
                                    <p className='font-bold'>Pasatiempos:</p>
                                    <p className='pl-2'>{expedient.hobbies}</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {expedient.sex === 'Mujer'?
                (
                    <table className="table-fixed mx-4 border border-gray-200">
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='px-4 py-2 text-center'colSpan={1}>En mujeres</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='px-4'>
                                    <div className='flex'>
                                        <p className='font-bold'>Está embarazada:</p>
                                        <p className='pl-2'>{expedient.pregnant? "Si":"No"}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='px-4'>
                                    <div className='flex'>
                                        <p className='font-bold'>¿Cuántos hijos tiene?:</p>
                                        <p className='pl-2'>{expedient.child? `${expedient.child}`:"Ninguno"}</p>
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
