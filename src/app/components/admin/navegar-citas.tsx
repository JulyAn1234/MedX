import React, {use, useState} from "react";
import { getExpedientByCURP } from "@/app/handlers/expedient";
import { getClinicAppointments, getAppointmentById } from "@/app/handlers/appointment";
import AppointmentRow from "../entityComponents/appointmentRow";
import NotificationModal from '../modals/notificationModal';
import Appointment from "../entityComponents/appointment";
import { get } from "http";
import exp from "constants";

//Type definition for the props that the component receives
interface sessionProps {
    clinicId: string;
    isAdminPageMainProp?: boolean;
    onDeleteMainProp?: (CURP:string) => void;
    onEditMainProp?: (CURP:string) => void;
    onCreateMainProp?: () => void;
}

//Mechanism for making http request
const fetchMap = new Map<string, Promise<any>>();

function queryClient(name:string, query:() => Promise<any>) {
  if(!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }
  return fetchMap.get(name)!;
}

const NavegarCitas: React.FC<sessionProps> = ({ clinicId, isAdminPageMainProp, onDeleteMainProp, onEditMainProp, onCreateMainProp }) => {
    
    // making server request
    const res = use(
        queryClient("appointmentsInfo", () => getClinicAppointments(clinicId))
    );
    console.log(res);
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);
    const [AppointmentToShow, setAppointmentToShow] = useState(res.data?.appointments[0]);
    const [appointmentArray, setAppointmentArray] = useState<object []>(res.data?.appointments);
    const [expedientToShow, setExpedientToShow] = useState();

    const openAppointmentsModal = async (appointmentId:string) =>{
        const appointment = await getAppointmentById(clinicId, appointmentId);
        setAppointmentToShow(appointment.data?.appointment);
        const expedient = await getExpedientByCURP(clinicId, appointment.data?.appointment.CURP);
        setExpedientToShow(expedient.data?.expedient);
        setShowAppointmentModal(true);
    }

    return(
        <div className="w-full">                
            <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center bg-gray-100 font-sans overflow-hidden">
                <div className=" lg:w-5/6">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Nombre completo:</th>
                                    <th className="py-3 px-6 text-left">Fecha:</th>
                                    <th className="py-3 px-6 text-left">Hora de inicio:</th>
                                    <th className="py-3 px-6 text-left">Hora de finalización:</th>
                                    <th className="py-3 px-6 text-left">
                                        {isAdminPageMainProp?(
                                            <button className="w-24 h-12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                                                onClick={onCreateMainProp}>
                                                Nueva cita
                                            </button>
                                        ):(
                                            <></>
                                        )}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {appointmentArray.map((appointment:any) => (
                                <>
                                    <AppointmentRow
                                        names={appointment.names}
                                        last_names={appointment.last_names}
                                        date = {appointment.date}
                                        startHour =  {appointment.startHour}
                                        endHour = {appointment.endHour}
                                        onClickEvent= {() => {openAppointmentsModal(appointment._id)}}
                                        isAdminPage= {isAdminPageMainProp? true:false}
                                        onDelete= {() =>{onDeleteMainProp? onDeleteMainProp(appointment._id):console.log("no hay onDelete")}}
                                        onEdit= { () =>{onEditMainProp? onEditMainProp(appointment._id):console.log("no hay onDelete")}}></AppointmentRow>
                                </>
                            ),)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div > 

            {/* ExpedientModal */}
            <NotificationModal
                modalTitle={"Detalles de cita"}
                isOpen={showAppointmentModal}
                buttonsActive={false}
                onAccept={() => {setShowAppointmentModal(false)}}
                onClose={() => {setShowAppointmentModal(false)}}
                key={"AppointmentModal"}
            >
                <Appointment appointment = {AppointmentToShow} expedientToShow = {expedientToShow}></Appointment>               
            </NotificationModal>

        </div>
    )
};
export default NavegarCitas;