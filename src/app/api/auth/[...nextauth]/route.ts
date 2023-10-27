import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import { loginHandler } from "@/app/handlers/user";

const signInHandler = NextAuth({
    providers:[
        //Setting up my own credentials auth mechanism
        CredentialsProvider({
            name: "credentials",
            //What credentials am I asking for in the Login?
            credentials: {
                email: {label: "Email", type: "email", placeholder: "example@gmail.com"},
                username: {label: "Username", type: "username", placeholder: "user_123"},
                password: {label: "Password", type: "password", placeholder: "******"},
            },
            async authorize(credentials, req){
                //Session info I can get from Anywhere in the site
                const email = credentials?.email as string;
                const username = credentials?.username as string;
                const password = credentials?.password as string;

                const loginBody = {email, username, password};
                const {data, error} = await loginHandler(loginBody);
                if(error) throw error.response.data.message;
                console.log(data);
                const user= {
                    id: data.session.clinicId,
                    username: data.session.username,
                    permissions: data.session.permissions
                };
    
                return user;
            }
        })
    ],
    callbacks: {
        jwt({account, token, user, profile, session}){
            if(user)
                token.user = user;
            return token;
        },
        session ({session, token}) {
            session.user = token.user as any;
            return session; 
        }
    }
});

export {signInHandler as GET, signInHandler as POST};


