import { getClinicInfoHandler } from '../../handlers/clinic';
import {use} from "react"
import Image from 'next/image';
import undefined_user from '../images/undefined_user.png';
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

const adminUsuarios: React.FC<sessionProps> = ({ clinicId, username }) => {

//   const res = use(
//     queryClient("clinicInfo", () => getClinicInfoHandler(clinicId))
//   );
//   const clinicInfo = res.data.clinic;
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
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="mr-2">
                                            <Image className="w-16 h-16 rounded-full" src={undefined_user} alt='user'/>
                                        </div>
                                        <span>User Name</span>
                                    </div>                                
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className='flex space-x-16'>
                                        <div className='flex space-x-4'>
                                            <span>permiso1</span>
                                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                                        </div>
                                        <div className='flex space-x-4'>
                                            <span>permiso1</span>
                                            <input type="checkbox" id="vehicle2" name="vehicle1" value="Bike"></input>
                                        </div>
                                        <div className='flex space-x-4'>
                                            <span>permiso1</span>
                                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                                        </div>
                                        <div className='flex space-x-4'>
                                            <span>permiso1</span>
                                            <input type="checkbox" id="vehicle2" name="vehicle1" value="Bike"></input>
                                        </div>
                                        <div className='flex space-x-4'>
                                            <span>permiso1</span>
                                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex space-x-8 items-center justify-center">
                                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};

export default adminUsuarios;

