import React, {use, useState} from "react";
import { getExpedientByCURP } from "@/app/handlers/expedient";
import Expedient from "../entityComponents/expedient";

//Type definition for the props that the component receives
interface sessionProps {
    clinicId: string;
    CURP: any;
  }

//Mechanism for making http request
const fetchMap = new Map<string, Promise<any>>();

function queryClient(name:string, query:() => Promise<any>) {
  if(!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }
  return fetchMap.get(name)!;
}

const Historial: React.FC<sessionProps> = ({ clinicId, CURP }) => {
    
    // making server request
    const res = use(
        queryClient("userInfo", () => getExpedientByCURP(clinicId, CURP))
    );

    const [expedient, setExpedient] = useState<object []>(res.data?.expedient);
    console.log(expedient);

    return expedient?  (
        
        <div>
            <h1>{`Historial ${CURP}`}</h1>
            <Expedient expedient = {expedient}></Expedient>
        </div>
    ):(
        <div>
            <h1>Historial no encontrado</h1>
        </div>
    )
};
export default Historial;