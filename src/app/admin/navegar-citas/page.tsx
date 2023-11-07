"use client"
import {useSession} from "next-auth/react";
import Navbar from '../../components/navbarAdmin';
import LandingPage from "../../components/landingPage";
import LoadingPage from "../../components/loadingPage";
import NavegarCitas from "@/app/components/admin/navegar-citas";
function NavCitasPage(){

  //obteniendo información de la sesión  
  const {data: session, status} = useSession();
  const id = session?.user?.id;

  //formando información de la clinica
  const clinicData = {
    clinicId: id || ''
  };

  return (status === "authenticated" && session?.user?.permissions?.includes("navAppointments"))?
    //Admin home Page
    (<main>
      <Navbar permissions={session?.user?.permissions||[]} />
      <NavegarCitas {...clinicData}/>
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

export default NavCitasPage;

