"use client"
import {useSession} from "next-auth/react";
import Navbar from '../../components/navbarAdmin';

function NavHistorialesPage(){
  const {data: session, status} = useSession();
  // const us: object= session?.user?; 
  return status === "authenticated"?
    //Admin home Page
    (<main>
      <Navbar permissions={session?.user?.permissions||[]} />
      <h1>NavHistorialesPage</h1>
    </main>) 
    : status ==="loading" ? (<main><h1>Loading...</h1></main>):
    //Landing Page 
    (
    <main>
      <h1>LANDING PAGE</h1>
    </main>
    )
}

export default NavHistorialesPage;


