 //           @ts-nocheck
import NavbarLink from './navbarLink';
import { signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import Logo from './images/logo.png';

type Permission = string; // You can define a more specific type for permissions

type NavbarProps = {
  permissions?: Permission[];
};

const Navbar: React.FC<NavbarProps> = ({ permissions }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSignOut = () => {
    // Show the confirmation dialog
    setShowConfirmation(true);
  };

  const confirmSignOut = () => {
    // Add your sign-out logic here
    signOut();

    // Close the confirmation dialog
    setShowConfirmation(false);
  };

  const cancelSignOut = () => {
    // Close the confirmation dialog
    setShowConfirmation(false);
  };

  return (

    <div className="bg-lime-500 p-4 w-full">
      <div className="container mx-auto flex justify-between items-center ">
        <Link href="/"className=""><Image className= "w-32"src={Logo} alt= "Logo"/></Link>
    
        <div className='flex flex-row space-x-8'>
          {permissions.includes("navAppointments") ? (
            <NavbarLink page={"Navegar Citas"} url={"/admin/navegar-citas"} />
          ) : null}
          {permissions.includes("navHistorials") ? (
            <NavbarLink page={"Navegar Historiales"} url={"/admin/navegar-historiales"} />
          ) : null}
          {permissions.includes("adminHistorials") ? (
            <NavbarLink page={"Admin. Historiales"} url={"/admin/admin-historiales"} />
          ) : null}
          {permissions.includes("adminAppointments") ? (
            <NavbarLink page={"Admin. Citas"} url={"/admin/admin-citas"} />
          ) : null}
          {permissions.includes("adminUsers") ? (
            <NavbarLink page={"Admin. Usuarios"} url={"/admin/admin-usuario"} />
          ) : null}
        </div>

        <button onClick = {handleSignOut}className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full">Cerrar sesión</button>
        {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-right justify-center z-50">
          <div className="modal w-96 text-xl">
            <div className="modal-content p-4 bg-white rounded shadow-md">
              <p className="mb-4">¿Está seguro que quieres cerrar sesión?</p>
              <button onClick={confirmSignOut} className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-2">
                Si
              </button>
              <button onClick={cancelSignOut} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                No
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default Navbar;
