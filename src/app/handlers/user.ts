
import axios, { AxiosResponse, AxiosError } from 'axios';
import dotenv from 'dotenv';
// Load environment variables from .env.local into process.env
dotenv.config({ path: '.env.local' });

//const backEndpoint = process.env.BACKEND_ENDPOINT;
const backEndpoint = "http://localhost:3001";
export async function loginHandler(loginBody:object): Promise<{ data: any; error: any }> {
    try {
        if(!backEndpoint) 
            throw new Error("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/login`;
        console.log(apiUrl);
        const response: AxiosResponse = await axios.post(apiUrl, loginBody);
        
        return { data: response.data, error: null };
        
    } catch (error) {
        return { data: null, error };
    }
  }

export const getClinicUsers = async (id: string) => {
    try {
        if(!backEndpoint)
            throw new Error ("BACKEND_ENDPOINT is not defined");
        const apiUrl = `${backEndpoint}/get-users/${id}`;
        const response: AxiosResponse = await axios.get(apiUrl);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
  };