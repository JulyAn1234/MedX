import axios, { AxiosResponse, AxiosError } from 'axios';
import dotenv from 'dotenv';
// Load environment variables from .env.local into process.env
dotenv.config({ path: '.env.local' });

const backEndpoint = process.env.BACKEND_ENDPOINT;

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

// export const getUser2 = async (id: number) => {
//     try {
//       const response: AxiosResponse = await axios.get(
//         `https://jsonplaceholder.typicode.com/users/${id}`
//       );
//       return response.data;
//     } catch (error) {
//       throw new Error(error);
//     }
//   };