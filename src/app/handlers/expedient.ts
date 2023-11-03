import axios, { AxiosResponse, AxiosError } from 'axios';
import dotenv from 'dotenv';
// Load environment variables from .env.local into process.env
dotenv.config({ path: '.env.local' });

//const backEndpoint = process.env.BACKEND_ENDPOINT;
const backEndpoint = "http://localhost:3001";

export const getClinicExpedients = async (id: string) => {
    try {
        if(!backEndpoint)
            throw new Error ("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/get-expedients/${id}`;
        const response: AxiosResponse = await axios.get(apiUrl);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
  };

export async function getExpedientByCURP(clinicId: string, CURP:string): Promise<{ data: any; error: any }> {
    try {
        if(!backEndpoint) 
            throw new Error("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/get-expedient/${clinicId}/${CURP}`;
        const response: AxiosResponse = await axios.get(apiUrl);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
  }