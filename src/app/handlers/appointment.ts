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

export async function deleteExpedient(clinicId: string, CURP:string): Promise<{ data: any; error: any }> {
    try {
        if(!backEndpoint) 
            throw new Error("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/delete-expedient/${clinicId}/${CURP}`;
        const response: AxiosResponse = await axios.delete(apiUrl);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
  }

export async function createExpedient(clinicId: string, data:any): Promise<{ data: any; error: any }> {
    try {
        if(!backEndpoint) 
            throw new Error("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/create-expedient/${clinicId}`;
        const response: AxiosResponse = await axios.post(apiUrl, data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
  }

export async function updateExpedient(clinicId: string, CURP:string, data:any): Promise<{ data: any; error: any }> {
    try {
        if(!backEndpoint) 
            throw new Error("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/update-expedient/${clinicId}/${CURP}`;
        const response: AxiosResponse = await axios.put(apiUrl, data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}