"use client"
import {useSession} from "next-auth/react";
import Navbar from '../components/navbarAdmin';

function AdminPage(){
  const {data: session, status} = useSession();
  const permises = ['a', 'b']; 
  console.log(session, status);
  return <main>
    <Navbar permissions={permises} />
    <h1>adminContent</h1>
    <h2>adminFooter</h2>
  </main>
}

export default AdminPage;

