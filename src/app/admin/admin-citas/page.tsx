"use client"
import {useSession} from "next-auth/react";
import Navbar from '../../components/navbarAdmin';
import LandingPage from "../../components/landingPage";
import LoadingPage from "../../components/loadingPage";
function AdminCitasPage(){
  const {data: session, status} = useSession();
  // const us: object= session?.user?; 
  return (status === "authenticated" && session?.user?.permissions?.includes("adminAppointments"))?  
    //Admin home Page
    (<main>
      <Navbar permissions={session?.user?.permissions||[]} />
      <h1>admin citas</h1>
    </main>) 
    : status ==="loading" ? 
    //Loading page
    (<main>
      <LoadingPage />
    </main>)
    :
    //Landing Page 
    (
      <main>
        <LandingPage />
      </main>
    )
}

export default AdminCitasPage;

