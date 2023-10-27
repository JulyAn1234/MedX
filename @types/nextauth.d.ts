import {DefaultSession} from "next-auth";


declare module "next-auth" {
    interface Session {
      user: {
        id?: string,
        clinicId?: string,
        username?:string,
        permissions?: string [];
      } & DefaultSession['user']; 
    }
  }