import axios, { AxiosResponse, AxiosError } from 'axios';
import dotenv from 'dotenv';
// Load environment variables from .env.local into process.env
dotenv.config({ path: '.env.local' });

//const backEndpoint = process.env.BACKEND_ENDPOINT;
const backEndpoint = "http://localhost:3001";

export const getClinicAppointments = async (id: string) => {
    try {
        if(!backEndpoint)
            throw new Error ("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/get-appointments/${id}`;
        const response: AxiosResponse = await axios.get(apiUrl);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
  };

export async function getAppointmentById(clinicId: string, appointmentId:string): Promise<{ data: any; error: any }> {
    try {
        if(!backEndpoint) 
            throw new Error("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/get-appointment/${clinicId}/${appointmentId}`;
        const response: AxiosResponse = await axios.get(apiUrl);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
  }

export async function deleteAppointment(clinicId: string, CURP:string): Promise<{ data: any; error: any }> {
    try {
        if(!backEndpoint) 
            throw new Error("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/delete-appointment/${clinicId}/${CURP}`;
        const response: AxiosResponse = await axios.delete(apiUrl);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
  }

export async function createAppointment(clinicId: string, data:any): Promise<{ data: any; error: any }> {
    try {
        if(!backEndpoint) 
            throw new Error("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/create-appointment/${clinicId}`;
        const response: AxiosResponse = await axios.post(apiUrl, data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
  }

export async function updateAppointment(clinicId: string, CURP:string, data:any): Promise<{ data: any; error: any }> {
    try {
        if(!backEndpoint) 
            throw new Error("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/update-appointment/${clinicId}/${CURP}`;
        const response: AxiosResponse = await axios.put(apiUrl, data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}