import React, {use, useState} from 'react';
import { getExpedientByCURP } from '@/app/handlers/expedient';
import Expedient from './expedient';

interface AppointmentProps {
    appointment: Record<string, any>;
    expedientToShow: Record<string, any> | undefined;
}

//Mechanism for making http request
const fetchMap = new Map<string, Promise<any>>();

function queryClient(name:string, query:() => Promise<any>) {
  if(!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }
  return fetchMap.get(name)!;
}

const Appointment: React.FC<AppointmentProps> = ({ appointment, expedientToShow }) => {    
    return (
    <>
        <div className='flex flex-col container bg-gray-200 p-4'>
            <div className='flex space-x-16 px-4'>
                <div className='flex space-x-2'>
                    <p className='text-left font-bold'>Nombre del paciente:</p>
                    <p>{appointment.names} {appointment.last_names}</p>
                </div>
                <div className='flex space-x-2'>
                    <p className='text-left font-bold'>CURP:</p>
                    <p>{appointment.CURP}</p>
                </div>
            </div>
            <div className='flex space-x-16 p-4'>
                <div className='flex space-x-2'>
                    <p className='text-left font-bold'>Fecha:</p>
                    <p>{appointment.date}</p>
                </div>
                <div className='flex space-x-2'>
                    <p className='text-left font-bold'>Hora de inicio:</p>
                    <p>{appointment.startHour}</p>
                </div>
                <div className='flex space-x-2'>
                    <p className='text-left font-bold'>Hora de finalización:</p>
                    <p>{appointment.endHour}</p>
                </div>
            </div>
            <div className='flex flex-col px-4'>
                <p className='text-left font-bold'>Detalles de la cita:</p>
                <p>{appointment.details}</p>
            </div>        
        </div>
        <h1 className='text-xl font-bold text-center p-4'>Historial asociado:</h1>    

        {expedientToShow? (
            <Expedient expedient = {expedientToShow}></Expedient>
        ):(<div className='container rounded bg-red-200 text-red-600 p-4 text-center'>No se encontró un historial asociado con la CURP {appointment.CURP} </div>)}
    
    </>)
}

export default Appointment;