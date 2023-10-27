"use client"
import {useSession} from "next-auth/react";
import Navbar from './components/navbarAdmin';
import LandingPage from "./components/landingPage";
import LoadingPage from "./components/loadingPage";
import LandingAdminPage from "./components/landingAdminPage";
function homePage(){

  const {data: session, status} = useSession();
  console.log(session?.user?.id);
  const username = session?.user?.username;
  const clinicData = {
    name: 'Sample Clinic',
    phone_number: '123-456-7890',
    address: '123 Main St, City, Country',
    image_url: 'https://www.tocdoc.com/sites/default/files/consultorios/clinica_medica_madero.jpg',
    username: username || ''
  };
  // const us: object= session?.user?; 
  return status === "authenticated"?
    //Admin home Page
    (<main>
      <Navbar permissions={session?.user?.permissions||[]} />
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