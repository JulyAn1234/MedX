"use client"
import {useSession} from "next-auth/react";
import Navbar from '../../components/navbarAdmin';
import LandingPage from "../../components/landingPage";
import LoadingPage from "../../components/loadingPage";
function AdminHistorialesPage(){
  const {data: session, status} = useSession();
  // const us: object= session?.user?; 
  return status === "authenticated"?
    //Admin home Page
    (<main>
      <Navbar permissions={session?.user?.permissions||[]} />
      <h1>admin historiales</h1>
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

export default AdminHistorialesPage;

