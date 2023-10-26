"use client"
import {useSession} from "next-auth/react";
import Navbar from '../../components/navbarAdmin';

function NavHistorialesPage(){
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
    <h1>NavHistorialesPage</h1>
  </main>
}

export default NavHistorialesPage;

