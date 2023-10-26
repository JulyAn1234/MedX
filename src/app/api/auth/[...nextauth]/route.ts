import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

const signInHandler = NextAuth({
    providers:[
        //Setting up my own credentials auth mechanism
        CredentialsProvider({
            name: "credentials",
            //What credentials am I asking for in the Login?
            credentials: {
                email: {label: "Email", type: "email", placeholder: "jsmith"}
            },
            authorize(credentials, req){
                //Session info I can get from Anywhere in the site
                const user= {
                    id: "1",
                    fullname:"J Smith",
                    email: "john@gmail.com",
                    permissions: [
                        "navAppointments",
                        "navHistorials",
                        "adminAppointments",
                        "adminHistorials",
                        // "adminUsers"
                    ]
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


