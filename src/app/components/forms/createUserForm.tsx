import React, { ReactNode} from 'react';

const ADMIN_USERS_KEYWORD = "adminUsers"
const ADMIN_CITAS_KEYWORD = "adminAppointments"
const ADMIN_HISTORIALES_KEYWORD = "adminHistorials"
const NAV_HISTORIALES_KEYWORD = "navHistorials"
const NAV_CITAS_KEYWORD = "navAppointments"


const ConfirmationModal: React.FC = () => {

    return (
    <>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre de usuario
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="createUserForm_username" type="text" placeholder="Usuario_1"></input>
        </div>
        <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Contraseña
            </label>
            <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="createUserForm_password" type="password" placeholder="********"></input>
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Permisos
            </label>
            <div className='flex flex-col space-y-6'>
                <div className='flex space-x-8'>
                    <span className='w-32'>Admin. Usuarios</span>
                    <input type="checkbox" id={`createUserForm_${ADMIN_USERS_KEYWORD}`}></input>
                </div>
                <div className='flex space-x-8'>
                    <span className='w-32'>Admin. Citas</span>
                    <input type="checkbox" id={`createUserForm_${ADMIN_CITAS_KEYWORD}`}></input>
                </div>
                <div className='flex space-x-8'>
                    <span className='w-32'>Admin. Historiales</span>
                    <input type="checkbox" id={`createUserForm_${ADMIN_HISTORIALES_KEYWORD}`}></input>
                </div>
                <div className='flex space-x-8'>
                    <span className='w-32'>Nav. Historiales</span>
                    <input type="checkbox" id={`createUserForm_${NAV_HISTORIALES_KEYWORD}`}></input>
                </div>
                <div className='flex space-x-8'>
                    <span className='w-32'>Nav. Citas</span>
                    <input type="checkbox" id={`createUserForm_${NAV_CITAS_KEYWORD}`}></input>
                </div>                        
            </div>    
        </div>
    </>
    );
};

export default ConfirmationModal;
