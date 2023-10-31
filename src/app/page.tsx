"use client"
import {useSession} from "next-auth/react";
import Navbar from './components/navbarAdmin';
import LandingPage from "./components/landingPage";
import LoadingPage from "./components/loadingPage";
import LandingAdminPage from "./components/landingAdminPage";

function homePage(){
  //Obteniendo información de la sesión
  const {data: session, status} = useSession();
  const username = session?.user?.username;
  const id = session?.user?.id;
  const permissions = session?.user?.permissions;
  
  //Se crea objeto con información de la clínica 
  const clinicData = {
    clinicId: id || '',
    username: username || ''
  };

  return status === "authenticated"?
    //Admin home Page
    (<main>
      <Navbar permissions={permissions||[]} />
      <LandingAdminPage {...clinicData}/>
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

export default homePage;