// Profile.tsx
import React from 'react';
import Header from '../components/header';

import { useAuth } from '../context/authContext';
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GETUSER = gql`
query GetUser($id: String!) {
  userById(id: $id) {
      email
      phone
      address
      aml
      kyc
      accountType
  }
}


`;

const Profile: React.FC = () => {

  const navigate = useNavigate();
  const { userId,isAuthenticated } = useAuth();

  const { loading, error, data } = useQuery(GETUSER, {
    variables: { id: userId },
  });

  // if(!isAuthenticated){
  //   navigate("/login")
  // }

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return <section>
  <h1>
    Account Transaction / Profile Change
  </h1>
  <div className="Registercontainer">
    <div className="clientDetails">
      <h2>
        Client Details
      </h2>
      <div>
        <p>
          Client Account Number
        </p>
        <p>
          Verified Facial Image
        </p>
        <br />
        <br />
        <br />
        <br />
        <div style={{width:"100%", justifyContent:"flex-start"}} >
          <label className="block font-medium mb-1" htmlFor="">
          Communication preference
          </label>
          <select name="Communication" id="">
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>
    </div>
    <div className="sideSection">
      <ol>
        <li>
          <strong>AML</strong> : status
        </li>
        <li>
          <strong>KYC</strong> : status
        </li>
      </ol>
      <div>
        <h2>
          Account Section
        </h2>
        <p>
          Account Type
        </p>
        <p>
          Account Balance
        </p>
        <p>
          Recent Transactions
        </p>
      </div>
    </div>
  </div>
  <div className='buttons'>
    <Link className='transferButton' to="/transact">
      Make a bank transfer or pay someone
    </Link>
    <Link className='profileButton' to="/account/register">
      Make a change to my profile
    </Link>
  </div>
</section>;

//   return <>
//   <Header></Header>
//   <section className="bg-gray-100 py-8">
//   <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-2">Client Details</h2>
//         <p className="mb-1">
//           Email: {data.userById.email}
//         </p>
//         <p className="mb-1">
//           Phone: {data.userById.phone}
//         </p>
//         <p>
//           Address: {data.userById.address}
//         </p>
//       </div>
//       <div className="p-4 bg-blue-100 rounded-lg">
//         <label htmlFor="AML" className="block font-semibold mb-2">
//           AML Status
//         </label>
//         <input type="checkbox" disabled id="AML" value={data.userById.aml} className="form-checkbox h-4 w-4 text-blue-500" />
//         <label htmlFor="KYC" className="block font-semibold mb-2">
//           KYC Status
//         </label>
//         <input type="checkbox" disabled value={data.userById.kyc} id="KYC" className="form-checkbox h-4 w-4 text-blue-500" />
//         <div className="mt-6 p-4 bg-white rounded shadow-md">
//           <h2 className="text-xl font-semibold mb-2">Account Details</h2>
//           <p className="mb-1">
//             Account Type: {data.userById.accountType}
//           </p>
//           <p className="mb-1">
//             Account Balance: $10,000
//           </p>
//           <div className="flex justify-between mt-2">
//             <a href="#" className="text-blue-500 hover:underline">
//               View Recent Transactions
//             </a>
//             <a href="#" className="text-blue-500 hover:underline">
//               Deposit Funds
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="flex justify-between my-4">
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         onClick={() => {navigate("/transact")}}
//       >
//         Make transaction
//       </button>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Profile Change
//       </button>
//     </div>
//   </div>
// </section>

//   </>;
};

export default Profile;
