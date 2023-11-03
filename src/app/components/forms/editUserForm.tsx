import React, { ReactNode} from 'react';

const ADMIN_USERS_KEYWORD = "adminUsers"
const ADMIN_CITAS_KEYWORD = "adminAppointments"
const ADMIN_HISTORIALES_KEYWORD = "adminHistorials"
const NAV_HISTORIALES_KEYWORD = "navHistorials"
const NAV_CITAS_KEYWORD = "navAppointments"

interface userToEditInfo {
    username: string;
  }

const ConfirmationModal: React.FC <userToEditInfo> = ({username}) => {

    return (
    <>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre de usuario
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="editUserForm_username" type="text" placeholder="Usuario_1" disabled value = {username}></input>
        </div>
        <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Contraseña
            </label>
            <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="editUserForm_password" type="password" placeholder="********"></input>
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
    </>
    );
};

export default ConfirmationModal;
