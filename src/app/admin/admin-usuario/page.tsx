"use client"
import {useSession} from "next-auth/react";
import Navbar from '../../components/navbarAdmin';
import LandingPage from "../../components/landingPage";
import LoadingPage from "../../components/loadingPage";
import AdminUsuarios from "../../components/admin/admin-usuario";
import LandingAdminPage from "../../components/landingAdminPage";

function AdminUsuariosPage(){
  const {data: session, status} = useSession();
  const username = session?.user?.username;
  const id = session?.user?.id;
  const permissions = session?.user?.permissions;
  const clinicData = {
    clinicId: id || '',
    username: username || ''
  };
  return (status === "authenticated" && session?.user?.permissions?.includes("adminUsers"))?
    //Admin home Page
    (<main>
      <Navbar permissions={session?.user?.permissions||[]} />
      <AdminUsuarios {...clinicData}/>
    </main>) 
    : status ==="loading" ? 
    //Loading page
    (<main>
      <LoadingPage />
    </main>)
    : status === "authenticated"?
    //Admin Landing Page 
    (
      <main>
        <Navbar permissions={permissions||[]} />
        <LandingAdminPage {...clinicData}/>
      </main>
    )
    :
    //Landing Page
    (
      <main>
        <LandingPage />
      </main>
    )
}

export default AdminUsuariosPage;

