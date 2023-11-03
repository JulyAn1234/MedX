import React, {use, useState} from "react";
import { getClinicExpedients, getExpedientByCURP } from "@/app/handlers/expedient";
import NavExpedient from "../entityComponents/navExpedient";
import SearchBar from "../searchBar";
import NotificationModal from '../modals/notificationModal';
import Expedient from "../entityComponents/expedient";
import { set } from "mongoose";
//Type definition for the props that the component receives
interface sessionProps {
    clinicId: string;
  }

//Mechanism for making http request
const fetchMap = new Map<string, Promise<any>>();

function queryClient(name:string, query:() => Promise<any>) {
  if(!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }
  return fetchMap.get(name)!;
}

const navegarHistoriales: React.FC<sessionProps> = ({ clinicId }) => {
    
    // making server request
    const res = use(
        queryClient("userInfo", () => getClinicExpedients(clinicId))
    );
    
    const [showExpedentModal, setShowExpedientModal] = useState(false);
    const [expedientToShow, setExpedientToShow] = useState(res.data?.expedients[0]);
    const [expedientArray, setExpedientArray] = useState<object []>(res.data?.expedients);
    const [searching, setSearching] = useState("none");
    
    const openExpedientModal = async (CURP:string) =>{
        const expedient = await getExpedientByCURP(clinicId, CURP);
        setExpedientToShow(expedient.data?.expedient);
        setShowExpedientModal(true); 
    }

    async function searchExpedient(searchText:string){
        setSearching("loading");
        const res = await getExpedientByCURP(clinicId, searchText);
        if(res.data?.expedient)
        {
            setExpedientArray([res.data?.expedient]);
            setSearching("none");
        }
        else
            setSearching("notFound");
    }

    return(
        <div className="w-full">
            <div className="py-4">
                <SearchBar onSearch={searchExpedient}></SearchBar>            
            </div>
            {searching ==="none"?
            (
                <div className="flex flex-col">
                    {expedientArray.map((expedient:any) => (
                        <>
                            {/* <NavExpedient {...expedient}></NavExpedient> */}
                            <NavExpedient
                                names={expedient.names}
                                last_names={expedient.last_names}
                                CURP={expedient.CURP}
                                date_of_birth={expedient.date_of_birth}
                                sex= {expedient.sex}
                                onClickEvent= {() => {openExpedientModal(expedient.CURP)}}></NavExpedient>
                        </>
                    ),)}
                </div > 
            ): searching ==="loading"?
            (
                <div className="max-w-md mx-auto py-8">
                    <img className= 'w-20 mx-auto' src="/loading.gif" alt="" />
                    <p className="text-center py-4">Cargando...</p>
                </div>
            )
            :
            (
                <div className="max-w-md mx-auto py-8">
                    <img className= 'w-20 mx-auto'src="/notFound.png" alt="" />
                    <p className="text-center py-4">No hay un expediente con esa CURP</p>
                </div>
            )
        }

            {/* ExpedientModal */}
            <NotificationModal
                modalTitle={"Historial médico"}
                isOpen={showExpedentModal}
                buttonsActive={false}
                onAccept={() => {setShowExpedientModal(false)}}
                onClose={() => {setShowExpedientModal(false)}}
                key={"ExpedientModal"}
            >
                <Expedient expedient = {expedientToShow}></Expedient>
            </NotificationModal>

        </div>
    )
};
export default navegarHistoriales;