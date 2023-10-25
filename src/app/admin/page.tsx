"use client"
import {useSession} from "next-auth/react"

function AdminPage(){
  const {data: session, status} = useSession();

  console.log(session, status);
  return <div>admin</div>
}

export default AdminPage;

// import { getSession } from 'next-auth/react';
// import { GetServerSideProps } from 'next';

// type AdminPageProps = {
//   session: any; // Replace 'any' with the actual type of your session object
// };

// const AdminPage: React.FC<AdminPageProps> = ({ session }) => {
//   console.log(session);
//   return <div>Admin</div>;
// };

// export const getServerSideProps: GetServerSideProps<AdminPageProps> = async (context) => {
//   const session = await getSession(context);

//   return {
//     props: {
//       session,
//     },
//   };
// };

// export default AdminPage;