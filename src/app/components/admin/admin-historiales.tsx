import React, {use, useState} from "react";
import { getExpedientByCURP, deleteExpedient, createExpedient, updateExpedient } from "@/app/handlers/expedient";
import NavegarHistorialesPage from "./navegar-historiales";
import FormModal from '../modals/formModal';
import NotificationModal from '../modals/notificationModal';
import ConfirmationModal from '../modals/confirmationModal';
import {ErrorNotification, SuccessNotification, LoadingNotification} from '../modals/errorNotification';
import { CreateExpedientForm,  textFields, dateFields, checkboxFields, selectFields} from '../forms/createExpedientForm';

//Type definition for the props that the component receives
interface sessionProps {
    clinicId: string;
  }

const adminHistoriales: React.FC<sessionProps> = ({ clinicId}) => {

    //Create Expedient Modal
    const [showCreateExpedientModal, setShowCreateExpedientModal] = useState(false);
    // const [showCreateExpedientNotificationModal, setShowCreateExpedientNotificationModal] = useState(false);
    const [createExpedientModalState, setCreateExpedientModalState] = useState("Initial");
    const [createExpedientErrorMessage, setCreateExpedientErrorMessage] = useState("");

    //Auxiliar functions for CreateExpedientModal
    async function createExpedientModalAcceptAction() {
        try {
            setCreateExpedientModalState("Loading");
            validateCreateExpedientForm();
            const expedientObject = createExpedientObjectFromForm();
            const res = await createExpedient(clinicId, expedientObject);
            if(res.error){
                throw new Error(res.error.response.data.message? res.error.response.data.message : "Error, no se pudo crear el expediente.");
            }
            setCreateExpedientModalState("Success");
            await new Promise((resolve) => setTimeout(resolve, 100));
            window.location.reload();
        } catch (error: any) {
            setCreateExpedientErrorMessage(error.message);
            setCreateExpedientModalState("Error");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setCreateExpedientModalState("Initial");
        }
    }

    function validateCreateExpedientForm(){
        textFields.forEach((field) => {
            const input = document.getElementById(`text_${field}`) as HTMLInputElement;
            if(input === null)
                throw new Error(`Error, hubo un problema con el formulario ${field}.`);
            else
            {
                if(input.value === "")
                    throw new Error(`Error, faltan campos por llenar.`);
            }
        });

        dateFields.forEach((field) => {
            const input = document.getElementById(`date_${field}`) as HTMLInputElement;
            if(input === null)
                throw new Error("Error, hubo un problema con el formulario.");
            else
            {
                if(input.value === "")
                    throw new Error(`Error, faltan campos por llenar.`);
            }
        });
    }

    function createExpedientObjectFromForm(){
        const expedientObject: any = {};
        textFields.forEach((field) => {
            const input = document.getElementById(`text_${field}`) as HTMLInputElement;
            if(input === null)
                throw new Error("Error, hubo un problema con el formulario.");
            else
            {
                expedientObject[field] = input.value;
            }
        });

        dateFields.forEach((field) => {
            const input = document.getElementById(`date_${field}`) as HTMLInputElement;
            if(input === null)
                throw new Error("Error, hubo un problema con el formulario.");
            else
            {
                expedientObject[field] = input.value;
            }
        });

        checkboxFields.forEach((field) => {
            const input = document.getElementById(`checkbox_${field}`) as HTMLInputElement;
            if(input === null)
                throw new Error("Error, hubo un problema con el formulario.");
            else
            {
                expedientObject[field] = input.checked;
            }
        });

        selectFields.forEach((field) => {
            const input = document.getElementById(`select_${field}`) as HTMLInputElement;
            if(input === null)
                throw new Error("Error, hubo un problema con el formulario.");
            else
            {
                expedientObject[field] = input.value;
            }
        });

        console.log(expedientObject);

        return expedientObject;
    }

    function createExpedientClearAction() {
        textFields.forEach((field) => {
            const input = document.getElementById(`text_${field}`) as HTMLInputElement;
            if(input === null)
                throw new Error("Error, hubo un problema con el formulario.");
            else
            {
                input.value = "";
            }
        });

        dateFields.forEach((field) => {
            const input = document.getElementById(`date_${field}`) as HTMLInputElement;
            if(input === null)
                throw new Error("Error, hubo un problema con el formulario.");
            else
            {
                input.value = "";
            }
        });

        checkboxFields.forEach((field) => {
            const input = document.getElementById(`checkbox_${field}`) as HTMLInputElement;
            if(input === null)
                throw new Error("Error, hubo un problema con el formulario.");
            else
            {
                input.checked = false;
            }
        });
    }

     //Delete Expedient Modal
    const [showDeleteExpedientModal, setShowDeleteExpedientModal] = useState(false);
    const [showDeleteExpedientNotificationModal, setShowDeleteExpedientNotificationModal] = useState(false);
    const [deleteExpedientModalState, setDeleteExpedientModalState] = useState("Initial");
    const [ExpedientToDelete, setExpedientToDelete] = useState("");
    
    //Auxiliar functions for DeleteExpedientModal
    async function deleteExpedientModalAcceptAction() {
            setDeleteExpedientModalState("Loading");
            setShowDeleteExpedientModal(false);
            setShowDeleteExpedientNotificationModal(true);
            try {
                let res = await deleteExpedient(clinicId, ExpedientToDelete);
                if(res.error)
                    throw new Error("No se pudo eliminar el usuario");
              
                setShowDeleteExpedientNotificationModal(false);
                setDeleteExpedientModalState("Success");
                setShowDeleteExpedientNotificationModal(true);
              
                await new Promise((resolve) => setTimeout(resolve, 100));
                setShowDeleteExpedientNotificationModal(false);
                setDeleteExpedientModalState("Initial");
                //refresh pasge
                window.location.reload();
              } catch (error) {
                setDeleteExpedientModalState("Error");
              
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setShowDeleteExpedientNotificationModal(false);
                setDeleteExpedientModalState("Initial");
              }
    }

    const [userToEdit, setUserToEdit] = useState("");
    const [showEditExpedientModal, setShowEditExpedientModal] = useState(false);
    const [editExpedientModalState, setEditExpedientModalState] = useState("Initial");
    const [editExpedientErrorMessage, setEditExpedientErrorMessage] = useState("");

    async function populateEditExpedientForm(expedient:any){
       await new Promise((resolve) => setTimeout(resolve, 200));
        textFields.forEach((field) => {
            const input = document.getElementById(`text_${field}`) as HTMLInputElement;
            if(input === null){
                console.log("si")
                throw new Error("Error, hubo un problema con el formulario.");
            }
            else
            {
                console.log(expedient[field]);
                input.value = expedient[field];
            }
        });

        dateFields.forEach((field) => {
            const input = document.getElementById(`date_${field}`) as HTMLInputElement;
            if(input === null)
                throw new Error("Error, hubo un problema con el formulario.");
            else
            {
                input.value = expedient[field];
            }
        });

        checkboxFields.forEach((field) => {
            const input = document.getElementById(`checkbox_${field}`) as HTMLInputElement;
            if(input === null)
                throw new Error("Error, hubo un problema con el formulario.");
            else
            {
                input.checked = expedient[field];
            }
        });

        selectFields.forEach((field) => {
            const input = document.getElementById(`select_${field}`) as HTMLInputElement;
            if(input === null)
                throw new Error("Error, hubo un problema con el formulario.");
            else
            {
                input.value = expedient[field];
            }
        });
    }

    async function editExpedientModalAcceptAction() {
        try {
            setEditExpedientModalState("Loading");
            validateCreateExpedientForm();
            const expedientObject = createExpedientObjectFromForm();
            const res = await updateExpedient(clinicId, userToEdit,expedientObject);
            if(res.error){
                throw new Error(res.error.response.data.message? res.error.response.data.message : "Error, no se pudo crear el expediente.");
            }
            setEditExpedientModalState("Success");
            await new Promise((resolve) => setTimeout(resolve, 100));
            window.location.reload();
        } catch (error: any) {
            setEditExpedientErrorMessage(error.message);
            setEditExpedientModalState("Error");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setEditExpedientModalState("Initial");
        }
    }

    function onDeleteButtonAction(CURP:string){
        setExpedientToDelete(CURP);
        setShowDeleteExpedientModal(true);
    }
    function onCreateButtonAction(){
        setShowCreateExpedientModal(true);
    }

    async function onEditButtonAction(CURP:string){
        try {
            setDeleteExpedientModalState("Loading");
            setShowDeleteExpedientNotificationModal(true);
            setUserToEdit(CURP);
            const res = await getExpedientByCURP(clinicId, CURP);
            if(res.error){
                throw new Error(res.error.response.data.message? res.error.response.data.message : "Error, no se pudo obtener la información del expediente.");
            }
            setShowDeleteExpedientNotificationModal(false);
            setShowEditExpedientModal(true);
            await populateEditExpedientForm(res.data?.expedient);
        } catch (error) {
            setShowEditExpedientModal(false);
            setDeleteExpedientModalState("ErrorEdit");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setShowDeleteExpedientNotificationModal(false);
        }


    }

    return(
    <>
        <NavegarHistorialesPage
            clinicId={clinicId}
            isAdminPageMainProp={true}
            onDeleteMainProp={onDeleteButtonAction}
            onEditMainProp={onEditButtonAction}
            onCreateMainProp={onCreateButtonAction}></NavegarHistorialesPage>

        {/*CreateExpedientModal*/}
        <FormModal
            modalTitle={"Crear expediente"}
            isOpen={showCreateExpedientModal}
            onAccept={() => {createExpedientModalAcceptAction()}}
            onClose={() => {setShowCreateExpedientModal(false)}}
            onClear={()=> {createExpedientClearAction()}}
            key={"createExpedientModal"}
        >
            <CreateExpedientForm {...{}}/>
            {createExpedientModalState === "Success"? (<SuccessNotification {...{message: "Expediente creado exitosamente"}}/>)
            :createExpedientModalState === "Loading"? (<LoadingNotification {...{message: "Cargando..."}}/>)
            :createExpedientModalState === "Error"? (<ErrorNotification {...{message: `${createExpedientErrorMessage}`}}/>)
            :(<></>)}
        </FormModal>

        {/*EditExpedientModal*/}
        <FormModal
            modalTitle={"Editar expediente"}
            isOpen={showEditExpedientModal}
            onAccept={() => {editExpedientModalAcceptAction()}}
            onClose={() => {setShowEditExpedientModal(false)}}
            onClear={()=> {createExpedientClearAction()}}
            key={"editExpedientModal"}
        >
            <CreateExpedientForm {...{}}/>
            {editExpedientModalState === "Success"? (<SuccessNotification {...{message: "Expediente editado exitosamente"}}/>)
            :editExpedientModalState === "Loading"? (<LoadingNotification {...{message: "Cargando..."}}/>)
            :editExpedientModalState === "Error"? (<ErrorNotification {...{message: `${editExpedientErrorMessage}`}}/>)
            :(<></>)}
        </FormModal>

        {/*Delete Expedient Modal*/}
        <ConfirmationModal {...{
            modalTitle: `¿Seguro que quieres eliminar el expediente?`,
            isOpen: showDeleteExpedientModal,
            onAccept: () => {deleteExpedientModalAcceptAction()},
            onClose: () => {setShowDeleteExpedientModal(false)},
            key: "deleteExpedientModal"
            }}>
                <p>Esto eliminará toda la información del paciente con la CURP ${ExpedientToDelete}</p>
        </ConfirmationModal>

        {/* DeleteExpedientNotificationModal */}
        <NotificationModal
            modalTitle={"Notificación"}
            isOpen={showDeleteExpedientNotificationModal}
            buttonsActive={false}
            onAccept={() => {setShowDeleteExpedientNotificationModal(false)}}
            onClose={() => {setShowDeleteExpedientNotificationModal(false)}}
            key={"deleteExpedientNotificationModal"}
        >
            {deleteExpedientModalState === "Success"? (<SuccessNotification {...{message: "Expediente eliminado exitosamente"}}/>)
            :deleteExpedientModalState === "Loading"? (<LoadingNotification {...{message: "Cargando..."}}/>)
            :deleteExpedientModalState === "Error"? (<ErrorNotification {...{message: "Error, no se pudo eliminar al expediente"}}/>)
            :deleteExpedientModalState === "ErrorEdit"? (<ErrorNotification {...{message: "Error, no se pudo recuperar la información del expediente"}}/>)
            :(<p>Notificación</p>)
            }
        </NotificationModal>

    </>)
}

export default adminHistoriales;