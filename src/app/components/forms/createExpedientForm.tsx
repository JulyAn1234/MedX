import React from 'react';

export const selectFields =[
    "sex"
]


export const textFields = [
    "names",
    "last_names",
    "CURP",
    "education",
    "occupation",
    "weight",
    "clothes_size",
    "height",
    "ethnicity",
    "physical_activity",
    "hobbies",
    "child"
];

export const checkboxFields = [
    "diabetes",
    "rheumatic_diseases",
    "fractures",    
    "allergies",
    "layed",
    "contractures",
    "cancer",
    "accidents",
    "transfusions",
    "cardiopathies",
    "surgeries",
    "tabaquism",
    "alcoholism",
    "automedication",
    "drug_use",
    "pregnant"
];

export const dateFields = [
    "date_of_birth"
];

export const CreateExpedientForm: React.FC = () => {
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
                        <td className='pr-10 pl-2 py-2'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>{'Nombre(s):'}</p>
                                <input className="border-2" type="text" id={`text_${textFields[0]}`}/>
                            </div>
                        </td>
                        <td className='pr-10 pl-2 py-2'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>{"Apellido(s):"}</p>
                                <input className="border-2" type="text" id={`text_${textFields[1]}`}/>
                            </div>
                        </td>
                        <td className='px-20 py-2' colSpan={2}>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>CURP:</p>
                                <input className="border-2" type="text" id={`text_${textFields[2]}`}/>
                            </div>
                        </td>
                    </tr>
                    <tr className=''>
                        <td className='pl-2 py-2'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Sexo:</p>
                                <select className=""  id={`select_${selectFields[0]}`}>
                                    <option value="Hombre">Masculino</option>
                                    <option value="Mujer">Femenino</option>
                                </select>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Escolaridad:</p>
                                <input className="border-2" type="text" id={`text_${textFields[3]}`}/>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Fecha de nacimiento:</p>
                                <input className="pl-2" type="date" min="1900-01-01" max={new Date().toISOString().slice(0, 10)} id={`date_${dateFields[0]}`}/>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Ocupación:</p>
                                <input className="border-2" type="text" id={`text_${textFields[4]}`}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pl-2 py-2'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Peso:</p>
                                <input className="border-2" type="text" id={`text_${textFields[5]}`}/>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Talla:</p>
                                <input className="border-2" type="text" id={`text_${textFields[6]}`}/>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Estatura (cm):</p>
                                <input className="border-2" type="text" id={`text_${textFields[7]}`}/>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Etnia:</p>
                                <input className="border-2" type="text" id={`text_${textFields[8]}`}/>
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
                                <p className='pr-2 font-bold'>Diabetes:</p>
                                <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[0]}`}/>
                            </div>
                        </td>
                        <td className='px-4 '>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Enf. reumáticas:</p>
                                <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[1]}`}/>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Fracturas:</p>
                                <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[2]}`}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pl-2 py-2'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Alergias:</p>
                                <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[3]}`}/>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Encames:</p>
                                <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[4]}`}/>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Contracturas musculares:</p>
                                <input className="pl-4" type="checkbox" id={`checkbox_${checkboxFields[5]}`}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pl-2 py-2'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Cancer:</p>
                                <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[6]}`}/>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Accidentes:</p>
                                <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[7]}`}/>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Transfusiones:</p>
                                <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[8]}`}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pl-2 py-2'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Cardiopatías:</p>
                                <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[9]}`}/>
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='flex'>
                                <p className='pr-2 font-bold'>Cirugías:</p>
                                <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[10]}`}/>
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
                                    <p className='pr-2 font-bold'>Tabaquismo:</p>
                                    <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[11]}`}/>
                                </div>
                            </td>
                            <td className='px-4'>
                                <div className='flex'>
                                    <p className='pr-2 font-bold'>Actividad física:</p>
                                    <input className="border-2" type="text" id={`text_${textFields[9]}`}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='pl-2 py-2'>
                                <div className='flex'>
                                    <p className='pr-2 font-bold'>Alcoholismo:</p>
                                    <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[12]}`}/>
                                </div>
                            </td>
                            <td className='px-4'>
                                <div className='flex'>
                                    <p className='pr-2 font-bold'>Se automédica:</p>
                                    <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[13]}`}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='pl-2 py-2'>
                                <div className='flex'>
                                    <p className='pr-2 font-bold'>Usa Drogras:</p>
                                    <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[14]}`}/>
                                </div>
                            </td>
                            <td className='px-4'>
                                <div className='flex'>
                                    <p className='pr-2 font-bold'>Pasatiempos:</p>
                                    <input className="border-2" type="text" id={`text_${textFields[10]}`}/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                                    <p className='pr-2 font-bold'>Está embarazada:</p>
                                    <input className="pl-2" type="checkbox" id={`checkbox_${checkboxFields[15]}`}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='px-4'>
                                <div className='flex'>
                                    <p className='pr-2 font-bold'>¿Cuántos hijos tiene?:</p>
                                    <input className="border-2" type="text" id={`text_${textFields[11]}`}/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
