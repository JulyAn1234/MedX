import { getClinicInfoHandler } from '../../handlers/clinic';
import {use} from "react"
import Image from 'next/image';
import undefined_user from '../images/undefined_user.png';
import deleteIcon from '../images/delete.png';
import editIcon from '../images/edit.png';
import { getClinicUsers } from '@/app/handlers/user';

const ADMIN_USERS_KEYWORD = "adminUsers"
const ADMIN_CITAS_KEYWORD = "adminAppointments"
const ADMIN_HISTORIALES_KEYWORD = "adminHistorials"
const NAV_HISTORIALES_KEYWORD = "navHistorials"
const NAV_CITAS_KEYWORD = "navAppointments"

interface sessionProps {
  clinicId: string;
  username: string;
  permissions?: string;
}

// const fetchMap = new Map<string, Promise<any>>();
// function queryClient(name:string, query:() => Promise<any>) {
//   if(!fetchMap.has(name)) {
//     fetchMap.set(name, query());
//   }
//   return fetchMap.get(name)!;
// }


//Mechanism for making http request
const fetchMap = new Map<string, Promise<any>>();

function queryClient(name:string, query:() => Promise<any>) {
  if(!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }
  return fetchMap.get(name)!;
}

const adminUsuarios: React.FC<sessionProps> = ({ clinicId, username }) => {
    
    // making server request
    const res = use(
        queryClient("userInfo", () => getClinicUsers(clinicId))
    );

    console.log(res.data?.users);
    const usersArray:any = res.data?.users || [{username:"", password: "", permissions: [""]}]
    console.log(usersArray[0].username)
    const items: string[]= [""];
  return (
    <div className="overflow-x-auto">
        
        <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center bg-gray-100 font-sans overflow-hidden">
            <div className=" lg:w-5/6">
                <div className="bg-white shadow-md rounded my-6">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Nombre de usuario</th>
                                <th className="py-3 px-6 text-left">Permisos</th>
                                <th className="py-3 px-6 text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {usersArray.map((user:any) => (
                                    <tr className="border-b border-gray-200">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <Image className="w-16 h-16 rounded-full" src={undefined_user} alt='user'/>
                                                </div>
                                                <span>{user.username}</span>
                                            </div>                                
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className='flex space-x-6'>
                                                <div className='flex space-x-4'>
                                                    <span>Admin. Usuarios</span>
                                                    <input type="checkbox" id={`${user.username}_${ADMIN_USERS_KEYWORD}_checkbox`} name="vehicle1" value="Bike" checked = {user.permissions.includes(ADMIN_USERS_KEYWORD)}></input>
                                                </div>
                                                <div className='flex space-x-4'>
                                                    <span>Admin. Citas</span>
                                                    <input type="checkbox" id={`${user.username}_${ADMIN_CITAS_KEYWORD}_checkbox`} name="vehicle1" value="Bike" checked ={user.permissions.includes(ADMIN_CITAS_KEYWORD)}></input>
                                                </div>
                                                <div className='flex space-x-4'>
                                                    <span>Admin. Historiales</span>
                                                    <input type="checkbox" id={`${user.username}_${ADMIN_HISTORIALES_KEYWORD}_checkbox`} name="vehicle1" value="Bike" checked = {user.permissions.includes(ADMIN_HISTORIALES_KEYWORD)}></input>
                                                </div>
                                                <div className='flex space-x-4'>
                                                    <span>Nav. Historiales</span>
                                                    <input type="checkbox" id={`${user.username}_${NAV_HISTORIALES_KEYWORD}_checkbox`} name="vehicle1" value="Bike" checked = {user.permissions.includes(NAV_HISTORIALES_KEYWORD)}></input>
                                                </div>
                                                <div className='flex space-x-4'>
                                                    <span>Nav. Citas</span>
                                                    <input type="checkbox" id={`${user.username}_${NAV_CITAS_KEYWORD}_checkbox`} name="vehicle1" value="Bike" checked = {user.permissions.includes(NAV_CITAS_KEYWORD)}></input>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex space-x-4 items-center justify-center">
                                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                                    <Image className="w-4 h-4" src={deleteIcon} alt='delete'/>
                                                </button>
                                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                                    <Image className="w-4 h-4" src={editIcon} alt='edit'/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr> 
                            ),)}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};

export default adminUsuarios;

