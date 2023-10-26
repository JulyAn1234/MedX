import {DefaultSession} from "next-auth";


declare module "next-auth" {
    interface Session {
      user: {
        id?: string;
        permissions?: string [];
      } & DefaultSession['user']; 
    }
  }