import { getClinicInfoHandler } from '../handlers/clinic';
import {use} from "react"

interface sessionProps {
  clinicId: string;
  username: string;
  permissions?: string;
}

const fetchMap = new Map<string, Promise<any>>();
function queryClient(name:string, query:() => Promise<any>) {
  if(!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }
  return fetchMap.get(name)!;
}

const ClinicInfo: React.FC<sessionProps> = ({ clinicId, username }) => {

  const res = use(
    queryClient("clinicInfo", () => getClinicInfoHandler(clinicId))
  );
  const clinicInfo = res.data.clinic;
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
      <h1 className="text-3xl font-semibold mb-4 text-center">{"Bienvenido "} {username} {"a:"}</h1>
      <h2 className="text-3xl font-semibold mb-4 text-center">{"Página administrativa de "} {clinicInfo.name}</h2>
      <div className="flex items-center mb-4">
        <div className="w-250 h-250 overflow-hidden">
          <img src={clinicInfo.image_url} alt={"imagenClinica"} className="object-cover w-full h-full" />
        </div>
      </div>
      <div className="flex items-center ">
        <p className="text-gray-600 text-lg text-center ">{clinicInfo.phone_number} &bull; {clinicInfo.address}</p>
      </div>
    </div>
  );
};

export default ClinicInfo;

