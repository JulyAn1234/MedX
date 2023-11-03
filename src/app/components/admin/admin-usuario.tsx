import {use} from "react"
import Image from 'next/image';
import undefined_user from '../images/undefined_user.png';
import deleteIcon from '../images/delete.png';
import editIcon from '../images/edit.png';
import { getClinicUsers, deleteUser, createUser,updateUser} from '@/app/handlers/user';
import FormModal from '../modals/formModal';
import NotificationModal from '../modals/notificationModal';
import ConfirmationModal from '../modals/confirmationModal';
import {ErrorNotification, SuccessNotification, LoadingNotification} from '../modals/errorNotification';
import CreateUserForm from '../forms/createUserForm';
import EditUserForm from '../forms/editUserForm';
import { useState, useEffect } from 'react';

//Permissions names on the database
const ADMIN_USERS_KEYWORD = "adminUsers"
const ADMIN_CITAS_KEYWORD = "adminAppointments"
const ADMIN_HISTORIALES_KEYWORD = "adminHistorials"
const NAV_HISTORIALES_KEYWORD = "navHistorials"
const NAV_CITAS_KEYWORD = "navAppointments"
//Array with all the permissions names, useful for mapping actions
const permissionsKeyWords = [ADMIN_USERS_KEYWORD, ADMIN_CITAS_KEYWORD, ADMIN_HISTORIALES_KEYWORD, NAV_HISTORIALES_KEYWORD, NAV_CITAS_KEYWORD];

//Type definition for the props that the component receives
interface sessionProps {
  clinicId: string;
  username: string;
  permissions?: string [];
}

//Type definition for the permissions in memory
interface permissionsInMemoryInterface {
    [key: string]: any;
  }


//Mechanism for making http request
const fetchMap = new Map<string, Promise<any>>();

function queryClient(name:string, query:() => Promise<any>) {
  if(!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }
  return fetchMap.get(name)!;
}

//Component definition
const adminUsuarios: React.FC<sessionProps> = ({ clinicId, username }) => {
    
    // making server request
    const res = use(
        queryClient("userInfo", () => getClinicUsers(clinicId))
    );
    
    const usersArray:any = res.data?.users || [{username:"", password: "", permissions: [""]}]
    let tempPermissions: permissionsInMemoryInterface= {};
    usersArray.forEach((user:any) => {
        tempPermissions[user.username] = user.permissions;
    });

    //State variable for permissions in memory
    const [permissionsInMemory, setPermissionsInMemory] = useState<permissionsInMemoryInterface>(tempPermissions);

    //function to update permissions in memory
    function updatePermissionsInMemory(username: string, permission: string, status: boolean) {
        console.log(status)
        setPermissionsInMemory((prevPermissions) => {
          const updatedPermissions = { ...prevPermissions }; // Create a new object
          if (!updatedPermissions[username]) {
            updatedPermissions[username] = [];
          }
          if (!status) {
            updatedPermissions[username] = updatedPermissions[username].filter((element: any) => element !== permission);
          } else {
            if(!updatedPermissions[username].includes(permission))
                updatedPermissions[username].push(permission);
          }
          return updatedPermissions;
        });
      }

    //State Variables for the different modals

    //ApplyChangesModal
    const [showApplyChangesModal, setShowApplyChangesModal] = useState(false);
    const [showApplyChangesNotificationModal, setShowApplyChangesNotificationModal] = useState(false);
    const [applyChangesModalState, setApplyChangesModalState] = useState("Initial");

    //Auxiliar functions for ApplyChangesModal
    async function applyChangesModalAcceptAction() {
        if(!atLeastOneUserHasAdminUsersPermission()){

            setApplyChangesModalState("noAdminUsersPermission");
            setShowApplyChangesModal(false);
            setShowApplyChangesNotificationModal(true);

            await new Promise(r => setTimeout(r, 3000));

            setShowApplyChangesNotificationModal(false);
            setApplyChangesModalState("Initial");
            
            return;
        }
        else
        {try {
            setApplyChangesModalState("Loading");
            setShowApplyChangesModal(false);
            setShowApplyChangesNotificationModal(true);
          
            for (const username of Object.keys(permissionsInMemory)) {
              const tempPermissions = { permissions: permissionsInMemory[username] };
              let res = await updateUser(clinicId, username, tempPermissions);
              if(res.error)
                throw new Error("No se pudo actualizar el usuario");
            }
          
            setShowApplyChangesNotificationModal(false);
            setApplyChangesModalState("Success");
            setShowApplyChangesNotificationModal(true);
          
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setShowApplyChangesNotificationModal(false);
            setApplyChangesModalState("Initial");

          } catch (error) {
            setApplyChangesModalState("Error");
          
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setShowApplyChangesNotificationModal(false);
            setApplyChangesModalState("Initial");
          }
        }
    }
    function atLeastOneUserHasAdminUsersPermission() {
        return Object.keys(permissionsInMemory).some((username) => permissionsInMemory[username].includes(ADMIN_USERS_KEYWORD));
    }

    //Delete user Modal
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [showDeleteUserNotificationModal, setShowDeleteUserNotificationModal] = useState(false);
    const [deleteUserModalState, setDeleteUserModalState] = useState("Initial");
    const [userToDelete, setUserToDelete] = useState("");

    //Auxiliar functions for DeleteUserModal
    async function deleteUserModalAcceptAction() {
        setDeleteUserModalState("Loading");
        setShowDeleteUserModal(false);
        setShowDeleteUserNotificationModal(true);
        try {
            if(userToDelete === username){
                setShowDeleteUserNotificationModal(false);
                setDeleteUserModalState("triedToDeleteSelf");
                setShowDeleteUserNotificationModal(true);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setShowDeleteUserNotificationModal(false);
                setDeleteUserModalState("Initial");
                return;
            }
            if(permissionsInMemory[userToDelete].includes(ADMIN_USERS_KEYWORD)){
                setShowDeleteUserNotificationModal(false);
                setDeleteUserModalState("triedToDeleteAdminUser");
                setShowDeleteUserNotificationModal(true);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setShowDeleteUserNotificationModal(false);
                setDeleteUserModalState("Initial");
                return;
            }
          
            let res = await deleteUser(clinicId, userToDelete);
            if(res.error)
                throw new Error("No se pudo eliminar el usuario");
          
            setShowDeleteUserNotificationModal(false);
            setDeleteUserModalState("Success");
            setShowDeleteUserNotificationModal(true);
          
            await new Promise((resolve) => setTimeout(resolve, 100));
            setShowDeleteUserNotificationModal(false);
            setDeleteUserModalState("Initial");
            //refresh pasge
            window.location.reload();
          } catch (error) {
            setDeleteUserModalState("Error");
          
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setShowDeleteUserNotificationModal(false);
            setDeleteUserModalState("Initial");
            
          }
    }
    
    //Edit user Modal
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [editUserModalState, setEditUserModalState] = useState("Initial");
    const [userToEdit, setUserToEdit] = useState("");
    const [editUserErrorMessage, setEditUserErrorMessage] = useState("");

    //Auxiliar functions for EditUserModal
    async function editUserModalAcceptAction() {
        try {
            setEditUserModalState("Loading");
            const passwordFormElement = document.getElementById("editUserForm_password") as HTMLInputElement;
            const password = passwordFormElement.value;
            if (password === "") {
                setEditUserErrorMessage("Error, el campo de contraseña es obligatorio."); 
                throw new Error("Error, el campo de contraseña es obligatorio.");
            }
            const res = await updateUser(clinicId, userToEdit, {password: password});
            if(res.error){
                setEditUserErrorMessage("Error, no se pudo modificar el usuario.");
                throw new Error("No se pudo modificar el usuario.");
            }
            setEditUserModalState("Success");
            await new Promise((resolve) => setTimeout(resolve, 200));
            window.location.reload();
        } catch (error) {
            setEditUserModalState("Error");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setEditUserModalState("Initial");
        }
    }

    function editUserClearAction(){
        const passwordFormElement = document.getElementById("editUserForm_password") as HTMLInputElement;
        passwordFormElement.value = "";
        return;
    }
    //Create user Modal
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    // const [showCreateUserNotificationModal, setShowCreateUserNotificationModal] = useState(false);
    const [createUserModalState, setCreateUserModalState] = useState("Initial");
    const [createUserErrorMessage, setCreateUserErrorMessage] = useState("");
    //Auxiliar functions for CreateUserModal
    async function createUserModalAcceptAction() {
        try {
            setCreateUserModalState("Loading");
            const userObject:any = await createUserObjectFromForm();
            if (userObject["username"] === "" || userObject["password"] === "") {
                setCreateUserErrorMessage("Error, los campos de usuario y contraseña son obligatorios."); 
                throw new Error("Error, los campos de usuario y contraseña son obligatorios.");
            }
            const res = await createUser(clinicId, userObject);
            if(res.error){
                setCreateUserErrorMessage(res.error.response.data.message);
                throw new Error(res.error.response.data.message);
            }
            setCreateUserModalState("Success");
            await new Promise((resolve) => setTimeout(resolve, 200));
            window.location.reload();
        } catch (error) {
            setCreateUserModalState("Error");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setCreateUserModalState("Initial");
        }

    }
    async function createUserObjectFromForm(){
        const userObject = {
            "username": "",
            "password": "",
            "permissions": [] as string[]
        };
        const usernameFormElement = document.getElementById("createUserForm_username") as HTMLInputElement;
        const passwordFormElement = document.getElementById("createUserForm_password") as HTMLInputElement;
        userObject["username"] = usernameFormElement.value;
        userObject["password"] = passwordFormElement.value;
        permissionsKeyWords.forEach((permission)=> {
            const permissionFormElement = document.getElementById(`createUserForm_${permission}`) as HTMLInputElement;
            if(permissionFormElement.checked)
                userObject["permissions"].push(permission);
        });
        return userObject;
    }
    function createUserClearAction() {
        const usernameFormElement = document.getElementById("createUserForm_username") as HTMLInputElement;
        const passwordFormElement = document.getElementById("createUserForm_password") as HTMLInputElement;
        usernameFormElement.value = "";
        passwordFormElement.value = "";
        permissionsKeyWords.forEach((permission)=> {
            const permissionFormElement = document.getElementById(`createUserForm_${permission}`) as HTMLInputElement;
            permissionFormElement.checked = false;
        });
        return;
    }
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
                                <th className="py-3 px-6 text-center">
                                    {/*create user button*/}
                                    <button className="bg-blue-300 hover:bg-blue-500 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => setShowCreateUserModal(true)}>
                                        <span>Agregar usuario</span>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {/*Creating one table row for each user in the database*/}
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
                                                    <input type="checkbox"
                                                        checked = {permissionsInMemory[user.username].includes(ADMIN_USERS_KEYWORD)}
                                                        onChange={(event)=>{updatePermissionsInMemory(user.username,ADMIN_USERS_KEYWORD,event.target.checked)}}
                                                    ></input>
                                                </div>
                                                <div className='flex space-x-4'>
                                                    <span>Admin. Citas</span>
                                                    <input type="checkbox" 
                                                        checked ={permissionsInMemory[user.username].includes(ADMIN_CITAS_KEYWORD)}
                                                        onChange={(event)=>{updatePermissionsInMemory(user.username,ADMIN_CITAS_KEYWORD,event.target.checked)}}
                                                    ></input>
                                                </div>
                                                <div className='flex space-x-4'>
                                                    <span>Admin. Historiales</span>
                                                    <input type="checkbox"
                                                        checked = {permissionsInMemory[user.username].includes(ADMIN_HISTORIALES_KEYWORD)}
                                                        onChange={(event)=>{updatePermissionsInMemory(user.username,ADMIN_HISTORIALES_KEYWORD,event.target.checked)}}
                                                    ></input>
                                                </div>
                                                <div className='flex space-x-4'>
                                                    <span>Nav. Historiales</span>
                                                    <input type="checkbox"
                                                        checked = {permissionsInMemory[user.username].includes(NAV_HISTORIALES_KEYWORD)}
                                                        onChange={(event)=>{updatePermissionsInMemory(user.username,NAV_HISTORIALES_KEYWORD,event.target.checked)}}
                                                    ></input>
                                                </div>
                                                <div className='flex space-x-4'>
                                                    <span>Nav. Citas</span>
                                                    <input type="checkbox"
                                                        checked = {permissionsInMemory[user.username].includes(NAV_CITAS_KEYWORD)}
                                                        onChange={(event)=>{updatePermissionsInMemory(user.username,NAV_CITAS_KEYWORD,event.target.checked)}}
                                                    ></input>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex space-x-4 items-center justify-center">
                                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => {
                                                        setUserToDelete(user.username);
                                                        setShowDeleteUserModal(true);
                                                    }}>
                                                    <Image className="w-4 h-4" src={deleteIcon} alt='delete'/>
                                                </button>
                                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => {
                                                        setUserToEdit(user.username);
                                                        setShowEditUserModal(true);                                                    
                                                }}>
                                                    <Image className="w-4 h-4" src={editIcon} alt='edit'/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr> 
                            ),)}
                        </tbody>
                    </table>

                </div>
                    {/*Save button (it saves permissions changes)*/}
                    <button className="bg-blue-300 hover:bg-blue-500 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => setShowApplyChangesModal(true)}>
                        <span>Aplicar cambios</span>
                    </button>
            </div>
        </div>
        
        {/* Modals */}
        {/* ApplyChangesModal */}
        <ConfirmationModal {...{
            modalTitle: "¿Seguro que quieres aplicar los cambios?",
            isOpen: showApplyChangesModal,
            onAccept: () => {applyChangesModalAcceptAction()},
            onClose: () => {setShowApplyChangesModal(false)},
            key: "applyChangesModal"
            }}>
                <p>Esto actualizará los permisos de los usuarios</p>
        </ConfirmationModal>
        {/* ApplyChangesNotificationModal */}
        <NotificationModal
            modalTitle={"Notificación"}
            isOpen={showApplyChangesNotificationModal}
            buttonsActive={false}
            onAccept={() => {setShowApplyChangesNotificationModal(false)}}
            onClose={() => {setShowApplyChangesNotificationModal(false)}}
        key={"applyChangesNotificationModal"}
        >
            {applyChangesModalState === "noAdminUsersPermission"? (<ErrorNotification {...{message: "Error, por lo menos un usuario debe tener permisos de admin. de usuarios."}}/>)
            :applyChangesModalState === "Success"? (<SuccessNotification {...{message: "Cambios realizados exitosamente"}}/>)
            :applyChangesModalState === "Loading"? (<LoadingNotification {...{message: "Cargando..."}}/>)
            :applyChangesModalState === "Error"? (<ErrorNotification {...{message: "Error, no se pudieron realizar los cambios"}}/>)
            :(<p>Notificación</p>)
            }
        </NotificationModal>
        {/* DeleteUserModal */}
        <ConfirmationModal {...{
            modalTitle: `¿Seguro que quieres eliminar al usuario ${userToDelete}?`,
            isOpen: showDeleteUserModal,
            onAccept: () => {deleteUserModalAcceptAction()},
            onClose: () => {setShowDeleteUserModal(false)},
            key: "deleteUserModal"
            }}>
                <p>Esto eliminará toda la información del usuario</p>
        </ConfirmationModal>

        {/* DeleteUserNotificationModal */}
        <NotificationModal
            modalTitle={"Notificación"}
            isOpen={showDeleteUserNotificationModal}
            buttonsActive={false}
            onAccept={() => {setShowDeleteUserNotificationModal(false)}}
            onClose={() => {setShowDeleteUserNotificationModal(false)}}
            key={"deleteUserNotificationModal"}
        >
            {deleteUserModalState === "triedToDeleteSelf"? (<ErrorNotification {...{message: "Error, no puedes eliminar tu propio usuario."}}/>)
            :deleteUserModalState === "triedToDeleteAdminUser"? (<ErrorNotification {...{message: "Error, no puedes eliminar un usuario con permisos de admin. de usuarios."}}/>)            
            :deleteUserModalState === "Success"? (<SuccessNotification {...{message: "Usuario eliminado exitosamente"}}/>)
            :deleteUserModalState === "Loading"? (<LoadingNotification {...{message: "Cargando..."}}/>)
            :deleteUserModalState === "Error"? (<ErrorNotification {...{message: "Error, no se pudo eliminar al usuario"}}/>)
            :(<p>Notificación</p>)
            }
        </NotificationModal>

        {/*CreateUserModal*/}
        <FormModal
            modalTitle={"Crear usuario"}
            isOpen={showCreateUserModal}
            onAccept={() => {createUserModalAcceptAction()}}
            onClose={() => {setShowCreateUserModal(false)}}
            onClear={()=> {createUserClearAction()}}
            key={"createUserModal"}
        >
            <CreateUserForm {...{}}/>
            {createUserModalState === "Success"? (<SuccessNotification {...{message: "Usuario creado exitosamente"}}/>)
            :createUserModalState === "Loading"? (<LoadingNotification {...{message: "Cargando..."}}/>)
            :createUserModalState === "Error"? (<ErrorNotification {...{message: `${createUserErrorMessage}`}}/>)
            :(<></>)}

        </FormModal>
        
        {/*EditUserModal*/}
        <FormModal
            modalTitle={`Editar usuario ${userToEdit}`}
            isOpen={showEditUserModal}
            onAccept={() => {editUserModalAcceptAction()}}
            onClose={() => {setShowEditUserModal(false)}}
            onClear={()=> {editUserClearAction()}}
            key={"editUserModal"}
        >
            <EditUserForm {...{username: userToEdit}}/>
            {editUserModalState === "Success"? (<SuccessNotification {...{message: "Usuario modificado exitosamente"}}/>)
            :editUserModalState === "Loading"? (<LoadingNotification {...{message: "Cargando..."}}/>)
            :editUserModalState === "Error"? (<ErrorNotification {...{message: `${editUserErrorMessage}`}}/>)
            :(<></>)}

        </FormModal>


    </div>
  );
};

export default adminUsuarios;

