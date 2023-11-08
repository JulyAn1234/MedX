import React from 'react';
import { getAppointmentById, createAppointment, updateAppointment } from '@/app/handlers/appointment';

export function isAppointmentDataValid(appointment:any){
    //if any of the fields is empty, return false
    for (const key in appointment) {
        if (Object.prototype.hasOwnProperty.call(appointment, key)) {
            const element = appointment[key];
            if(element === "")
                return false;
        }
    }
    return true;
}

export function formAppointmentData(){
    let appointmentData:any = {};
    let input = document.getElementById("input_names") as HTMLInputElement;
    appointmentData.names = input.value;
    input = document.getElementById("input_last_names") as HTMLInputElement;
    appointmentData.last_names =input.value;
    input = document.getElementById("input_CURP") as HTMLInputElement;
    appointmentData.CURP = input.value;
    input = document.getElementById("input_endHour") as HTMLInputElement;
    appointmentData.endHour = input.value;
    input = document.getElementById("input_startHour") as HTMLInputElement;
    appointmentData.startHour = input.value;
    input = document.getElementById("input_date") as HTMLInputElement;
    appointmentData.date = input.value;
    const textarea = document.getElementById("input_details") as HTMLTextAreaElement;
    appointmentData.details =textarea.value;
    return appointmentData;
}

export function appointmentClearAction () {
    let input = document.getElementById("input_names") as HTMLInputElement;
    input.value = "";
    input = document.getElementById("input_last_names") as HTMLInputElement;
    input.value = "";
    input = document.getElementById("input_CURP") as HTMLInputElement;
    input.value = "";
    input = document.getElementById("input_endHour") as HTMLInputElement;
    input.value = "";
    input = document.getElementById("input_startHour") as HTMLInputElement;
    input.value = "";
    input = document.getElementById("input_date") as HTMLInputElement;
    input.value = "";
    const textarea = document.getElementById("input_details") as HTMLTextAreaElement;
    textarea.value = "";
    textarea.innerHTML = "";
    return;
}

export async function createAppointmentAcceptAction (clinicId:string, setAppointmentModalState:any, setAppointmentErrorMessage:any){
    try {
        setAppointmentModalState("Loading");
        const appointment = formAppointmentData();
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

export async function editAppointmentAcceptAction (clinicId:string, appointmentId:string, setAppointmentModalState:any, setAppointmentErrorMessage:any){
    try {
        setAppointmentModalState("Loading");
        const appointment = formAppointmentData();
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
    window.location.reload();
}

export async function populateAppointmentForm (clinicId:string,appointmentsId: string){
    const res = await getAppointmentById(clinicId,appointmentsId);
    const appointment = res.data?.appointment;
    console.log("appointment: ",appointment)
    //for each key in the appointment object, populate the input with the id input_{key}
    for (const key in appointment) {
        if (Object.prototype.hasOwnProperty.call(appointment, key)) {
            const element = appointment[key];
            const input = document.getElementById(`input_${key}`);
            if(input)
                input.setAttribute("value",element);
            else{
                console.log(`input_${key} not found`)
            }
        }
    }
    const textarea = document.getElementById("input_details") as HTMLTextAreaElement;
    textarea.innerHTML = appointment?.details;
}

export const CreateAppointmentForm: React.FC = () => {
    return(<>
            <div className='flex flex-col container bg-gray-200 p-4'>
            <div className='flex space-x-4 px-4'>
                <div className='flex space-x-2'>
                    <p className='text-left font-bold'>{"Nombre(s)"}:</p>
                    <input type="text" className='border-2' id='input_names'/>
                </div>
                <div className='flex space-x-2'>
                    <p className='text-left font-bold'>{"Apellido(s)"}:</p>
                    <input type="text" className='border-2 px-2' id='input_last_names'/>
                </div>
                <div className='flex space-x-2'>
                    <p className='text-left font-bold'>CURP:</p>
                    <input type="text" className='border-2' id='input_CURP'/>
                </div>
            </div>
            <div className='flex space-x-4 p-4'>
                <div className='flex space-x-2'>
                    <p className='text-left font-bold'>Fecha:</p>
                    <input id= "input_date" className="pl-2" type="date" min={new Date().toISOString().slice(0, 10)} max= "2100-12-30"/>
                </div>
                <div className='flex space-x-2'>
                    <p className='text-left font-bold'>Hora de inicio:</p>
                    <input type="time" step={3600} className='border-2' id='input_startHour'/>
                </div>
                <div className='flex space-x-2'>
                    <p className='text-left font-bold'>Hora de finalización:</p>
                    <input type="time" step={3600} className='border-2' id='input_endHour'/>
                </div>
            </div>
            <div className='flex flex-col px-4'>
                <p className='text-left font-bold'>Detalles de la cita:</p>
                <textarea className='border-2' id='input_details'/>
            </div>        
        </div>
    </>)
};