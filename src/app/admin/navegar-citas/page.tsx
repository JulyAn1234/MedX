"use client"
import {useSession} from "next-auth/react";
import Navbar from '../../components/navbarAdmin';

function NavCitasPage(){
  const {data: session, status} = useSession();
  const array:any = [
    "navAppointments",
    "navHistorials",
    "adminAppointments",
    "adminHistorials",
    "adminUsers"
  ];
  return <main>
    <Navbar permissions={array} />
    <h1>NavCitasPage</h1>
  </main>
}

export default NavCitasPage;

