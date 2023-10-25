import React from 'react';

type Permission = string; // You can define a more specific type for permissions

type NavbarProps = {
  permissions: Permission[];
};

const Navbar: React.FC<NavbarProps> = ({ permissions }) => {
  const renderNavbarLinks = () => {
    // Define the links based on permissions
    const links = permissions.map((permission) => {
      switch (permission) {
        case 'a':
          return <a key="dashboard" href="/dashboard">Dashboard</a>;
        case 'b':
          return <a key="profile" href="/profile">Profile</a>;
        // Add more cases for other permissions and corresponding links
        default:
          return null; // Handle unknown or unsupported permissions
      }
    });

    return links;
  };

  return (
    <nav>
      <ul>
        {renderNavbarLinks()}
      </ul>
    </nav>
  );
};

export default Navbar;
