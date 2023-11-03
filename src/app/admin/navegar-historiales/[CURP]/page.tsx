"use client"
import {useSession} from "next-auth/react";
import Navbar from '../../../components/navbarAdmin';
import LandingPage from "../../../components/landingPage";
import LoadingPage from "../../../components/loadingPage";
import Historial from "../../../components/admin/historial";
import { NextPage } from 'next';

interface Params {
    CURP: string;
}

const HistorialPage: NextPage<{params: Params}> = ({params}) => {
    //obteniendo información de la sesión  
    const {data: session, status} = useSession();
    const id = session?.user?.id;
    const CURP = params.CURP;
  //formando información de la clinica
  const dataForHistorial = {
    clinicId: id || '',
    CURP: CURP || ''
  };

  return (status === "authenticated" && session?.user?.permissions?.includes("navHistorials"))?
    //Admin home Page
    (<main>
      <Navbar permissions={session?.user?.permissions||[]} />
      <Historial {...dataForHistorial}/>
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

export default HistorialPage;


