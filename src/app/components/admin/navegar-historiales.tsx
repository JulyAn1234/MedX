import React, {use, useState} from "react";
import { getClinicExpedients, getExpedientByCURP } from "@/app/handlers/expedient";
import NavExpedient from "../entityComponents/navExpedient";
import SearchBar from "../searchBar";
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
    
    const [expedientArray, setExpedientArray] = useState<object []>(res.data?.expedients);
    const [searching, setSearching] = useState("none");
    console.log(expedientArray);

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
                <>
                    {expedientArray.map((expedient:any) => (
                        <>
                        <NavExpedient {...expedient}></NavExpedient>
                        </>
                    ),)}
                </> 
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

        </div>
    )
};
export default navegarHistoriales;