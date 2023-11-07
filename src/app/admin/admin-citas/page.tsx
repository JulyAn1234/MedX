"use client"
import {useSession} from "next-auth/react";
import Navbar from '../../components/navbarAdmin';
import LandingPage from "../../components/landingPage";
import LoadingPage from "../../components/loadingPage";
import AdminCitas from "../../components/admin/admin-citas";
function AdminCitasPage(){

  //Obteniendo información de la sesión
  const {data: session, status} = useSession();
  const id = session?.user?.id;
  //formando información de la clinica
  const clinicData = {
    clinicId: id || ''
  };

  return (status === "authenticated" && session?.user?.permissions?.includes("adminAppointments"))?  
    //Admin home Page
    (<main>
      <Navbar permissions={session?.user?.permissions||[]} />
      <AdminCitas  {...clinicData}></AdminCitas>
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

