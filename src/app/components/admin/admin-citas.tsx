import React from 'react';
import NavegarCitasPage from '../admin/navegar-citas';
import FormModal from '../modals/formModal';
import {
    CreateAppointmentForm, appointmentClearAction, populateAppointmentForm, formAppointmentData, isAppointmentDataValid
} from '../forms/appointment';
import { SuccessNotification, LoadingNotification, ErrorNotification } from '../modals/errorNotification';
import {deleteAppointment, createAppointment, updateAppointment } from '@/app/handlers/appointment';
import ConfirmationModal from '../modals/confirmationModal';
import NotificationModal from '../modals/notificationModal';
//Type definition for the props that the component receives
interface sessionProps {
    clinicId: string;
  }

const AdminCitas: React.FC<sessionProps> = ({ clinicId}) => {

    const [showAppointmentFormModal, setShowAppointmentFormModal] = React.useState(false);
    const [appointmentErrorMessage, setAppointmentErrorMessage] = React.useState("");
    const [appointmentModalState, setAppointmentModalState] = React.useState("");
    const [showEditAppointmentFormModal, setShowEditAppointmentFormModal] = React.useState(false);
    const [appointmentToEdit, setAppointmentToEdit] = React.useState("");
    const [showDeleteAppointmentModal, setShowDeleteAppointmentModal] = React.useState(false);
    const [showDeleteAppointmentNotificationModal, setShowDeleteAppointmentNotificationModal] = React.useState(false);
    const [deleteAppointmentModalState, setDeleteAppointmentModalState] = React.useState("");
    const [appointmentToDelete, setAppointmentToDelete] = React.useState("");

    const onDeleteButtonAction = (appointmentId:string) => {
        setAppointmentToDelete(appointmentId);
        setShowDeleteAppointmentModal(true);
    }

    const onEditButtonAction = async (appointmentId:string) => {
        setAppointmentToEdit(appointmentId);
        setShowEditAppointmentFormModal(true);
        await populateAppointmentForm(clinicId, appointmentId);
    }

    const onCreateButtonAction = () => {
        setShowAppointmentFormModal(true);
    }

    async function editAppointmentAcceptAction (clinicId:string, appointmentId:string){
        try {
            setAppointmentModalState("Loading");
            const appointment = formAppointmentData();
            if(!isAppointmentDataValid(appointment))
                throw new Error("Error, faltan campos por llenar.");
            const res = await updateAppointment(clinicId,appointmentId,appointment); 
            if(res.error)
                throw new Error(res.error.response.data.message? res.error.response.data.message : "Error, no se pudo actualizar la cita.");
            setAppointmentModalState("Success");
            await new Promise(r => setTimeout(r, 100));
            window.location.reload();
        } catch (error:any) {
            setAppointmentModalState("Error");
            setAppointmentErrorMessage(error.message);
            await new Promise(r => setTimeout(r, 2000));
            setAppointmentModalState("");
        }
    }

    async function createAppointmentAcceptAction (clinicId:string){
        try {
            setAppointmentModalState("Loading");
            const appointment = formAppointmentData();
            if(!isAppointmentDataValid(appointment))
                throw new Error("Error, faltan campos por llenar.");
            const res = await createAppointment(clinicId,appointment); 
            if(res.error)
                throw new Error(res.error.response.data.message? res.error.response.data.message : "Error, no se pudo crear la cita.");
            setAppointmentModalState("Success");
            await new Promise(r => setTimeout(r, 100));
            window.location.reload();
        } catch (error:any) {
            setAppointmentModalState("Error");
            setAppointmentErrorMessage(error.message);
            await new Promise(r => setTimeout(r, 2000));
            setAppointmentModalState("");
        }
    }

    async function deleteAppointmentModalAcceptAction (){
        try {
            setDeleteAppointmentModalState("Loading");
            const res = await deleteAppointment(clinicId,appointmentToDelete); 
            if(res.error)
                throw new Error(res.error.response.data.message? res.error.response.data.message : "Error, no se pudo eliminar la cita.");
            setDeleteAppointmentModalState("Success");
            setShowDeleteAppointmentModal(false);
            setShowDeleteAppointmentNotificationModal(true);
            await new Promise(r => setTimeout(r, 100));
            window.location.reload();
        } catch (error:any) {
            setDeleteAppointmentModalState("Error");
            await new Promise(r => setTimeout(r, 2000));
            setDeleteAppointmentModalState("");
        }
    }

    return (
        <>
            <NavegarCitasPage
                clinicId={clinicId}
                isAdminPageMainProp={true}
                onDeleteMainProp={onDeleteButtonAction}
                onEditMainProp={onEditButtonAction}
                onCreateMainProp={onCreateButtonAction}></NavegarCitasPage>
        
            {/*CreateAppointmentsModal*/}
            <FormModal
                modalTitle={"Crear Cita"}
                isOpen={showAppointmentFormModal}
                onAccept={() => {createAppointmentAcceptAction(clinicId)}}
                onClose={() => {setShowAppointmentFormModal(false)}}
                onClear={()=> {appointmentClearAction()}}
                key={"createExpedientModal"}
            >
                <CreateAppointmentForm {...{}}/>
                { appointmentModalState === "Success"? (<SuccessNotification {...{message: "Cita creada exitosamente"}}/>)
                :appointmentModalState === "Loading"? (<LoadingNotification {...{message: "Cargando..."}}/>)
                :appointmentModalState === "Error"? (<ErrorNotification {...{message: `${appointmentErrorMessage}`}}/>)
                :(<></>)} 
            </FormModal>

           {/*EditAppointmentsModal*/}
           <FormModal
                modalTitle={"Editar Cita"}
                isOpen={showEditAppointmentFormModal}
                onAccept={() => {editAppointmentAcceptAction(clinicId, appointmentToEdit)}}
                onClose={() => {setShowEditAppointmentFormModal(false)}}
                onClear={()=> {appointmentClearAction()}}
                key={"editAppointmentModal"}
            >
                <CreateAppointmentForm {...{}}/>
                { appointmentModalState === "Success"? (<SuccessNotification {...{message: "Cita actualizada exitosamente"}}/>)
                :appointmentModalState === "Loading"? (<LoadingNotification {...{message: "Cargando..."}}/>)
                :appointmentModalState === "Error"? (<ErrorNotification {...{message: `${appointmentErrorMessage}`}}/>)
                :(<></>)} 
            </FormModal>

        {/*Delete Expedient Modal*/}
        <ConfirmationModal {...{
            modalTitle: `¿Seguro que quieres eliminar la cita?`,
            isOpen: showDeleteAppointmentModal,
            onAccept: () => {deleteAppointmentModalAcceptAction()},
            onClose: () => {setShowDeleteAppointmentModal(false)},
            key: "deleteExpedientModal"
            }}>
                <p>Esto eliminará toda la información de la cita</p>
        </ConfirmationModal>

        {/* DeleteExpedientNotificationModal */}
        <NotificationModal
            modalTitle={"Notificación"}
            isOpen={showDeleteAppointmentNotificationModal}
            buttonsActive={false}
            onAccept={() => {setShowDeleteAppointmentNotificationModal(false)}}
            onClose={() => {setShowDeleteAppointmentNotificationModal(false)}}
            key={"deleteAppointmentNotificationModal"}
        >
            {deleteAppointmentModalState === "Success"? (<SuccessNotification {...{message: "Cita eliminada exitosamente"}}/>)
            :deleteAppointmentModalState === "Loading"? (<LoadingNotification {...{message: "Cargando..."}}/>)
            :deleteAppointmentModalState === "Error"? (<ErrorNotification {...{message: "Error, no se pudo eliminar al expediente"}}/>)
            :(<p>Notificación</p>)
            }
        </NotificationModal>

        </>

        
    )
}

export default AdminCitas;