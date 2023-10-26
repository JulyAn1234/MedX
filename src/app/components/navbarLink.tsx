import React from 'react';
import Link from 'next/link';
type NavbarProps = {
  page: string;
  url: string;
};

const NavbarLink: React.FC<NavbarProps> = ({ page, url }) => {

  return (
    <Link href={url}>
        <h1 className='hover:bg-lime-800 p-4 transition duration-300 ease-in-out text-white'>{page}</h1>
    </Link>

    );
};

export default NavbarLink;
