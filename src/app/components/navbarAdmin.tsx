 //           @ts-nocheck
import React from 'react';
import NavbarLink from './navbarLink';
type Permission = string; // You can define a more specific type for permissions

type NavbarProps = {
  permissions?: Permission[];
};

const Navbar: React.FC<NavbarProps> = ({ permissions }) => {
  const handleSignOut = () => {
    // Implement your sign-out logic here, e.g., redirect, clear sessions, or API call.
    alert('Signing out...'); // Placeholder for demonstration purposes.
  };

  return (

    <div className="bg-lime-500 p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Your Logo</div>
    
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

        <button onClick = {handleSignOut}className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full">Sign Out</button>
      </div>
    </div>
  );
};

export default Navbar;
