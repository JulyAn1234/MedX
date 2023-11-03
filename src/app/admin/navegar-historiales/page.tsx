"use client"
import {useSession} from "next-auth/react";
import Navbar from '../../components/navbarAdmin';
import LandingPage from "../../components/landingPage";
import LoadingPage from "../../components/loadingPage";
import NavegarHistoriales from "../../components/admin/navegar-historiales";

function NavHistorialesPage(){
  //obteniendo información de la sesión  
  const {data: session, status} = useSession();
  const id = session?.user?.id;

  //formando información de la clinica
  const clinicData = {
    clinicId: id || ''
  };

  return (status === "authenticated" && session?.user?.permissions?.includes("navHistorials"))?
    //Admin home Page
    (<main>
      <Navbar permissions={session?.user?.permissions||[]} />
      <NavegarHistoriales {...clinicData}/>
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

export default NavHistorialesPage;


