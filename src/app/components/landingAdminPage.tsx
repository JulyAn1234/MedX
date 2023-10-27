import React from 'react';

interface ClinicInfoProps {
  name: string;
  phone_number: string;
  address: string;
  image_url: string;
  username: string
}

const ClinicInfo: React.FC<ClinicInfoProps> = ({ name, phone_number, address, image_url, username }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
      <h1 className="text-3xl font-semibold mb-4 text-center">{"Bienvenido "} {username} {"a:"}</h1>
      <h2 className="text-3xl font-semibold mb-4 text-center">{"Página administrativa de "} {name}</h2>
      <div className="flex items-center mb-4">
        <div className="w-250 h-250 overflow-hidden">
          <img src={image_url} alt={name} className="object-cover w-full h-full" />
        </div>
      </div>
      <div className="flex items-center ">
        <p className="text-gray-600 text-lg text-center ">{phone_number} &bull; {address}</p>
      </div>
    </div>
  );
};

export default ClinicInfo;

