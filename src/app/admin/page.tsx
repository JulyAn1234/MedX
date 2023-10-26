"use client"
import {useSession} from "next-auth/react";
import Navbar from '../components/navbarAdmin';

function AdminPage(){
  const {data: session, status} = useSession();
  // const us: object= session?.user?; 
  console.log(session?.user?.email);
  const array:any = [
    "navAppointments",
    "navHistorials",
    "adminAppointments",
    "adminHistorials",
    "adminUsers"
  ];
  return <main>
    <Navbar permissions={array} />
    <h1>adminContent</h1>
  </main>
}

export default AdminPage;