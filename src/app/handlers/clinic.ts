'use server'
import axios, { AxiosResponse, AxiosError } from 'axios';
import dotenv from 'dotenv';
// Load environment variables from .env.local into process.env
dotenv.config({ path: '.env.local' });

const backEndpoint = process.env.BACKEND_ENDPOINT;

export async function getClinicInfoHandler(clinicId: string): Promise<{ data: any; error: any }> {
    try {
        if(!backEndpoint) 
            throw new Error("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/get-clinic-info/${clinicId}`;
        console.log(apiUrl);
        const response: AxiosResponse = await axios.get(apiUrl);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
  }