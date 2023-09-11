// Transact.tsx
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/header';
import Webcam from "react-webcam";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext';
import { useQuery, gql } from '@apollo/client';

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

const Transact: React.FC = () => {
  const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [kycChecked, setKycChecked] = useState(false);
    const [verify, setVerify] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);

    const navigate = useNavigate();
    const { userId,isAuthenticated } = useAuth();

    const handleVerify = () => {
      setVerifying(true);
      // Simulating a delay for verification process
      setTimeout(() => {
        setVerifying(false);
        setVerified(true);
      }, 2000); // 2 seconds
    };

    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setVerify(true);
        // Perform form submission logic here
    };

    const webcamRef = useRef<Webcam>(null);;

    const capture = () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setVerify(false) // You can display or manipulate the imageSrc here
      }
    };

    // useEffect(()=>{
    //   if(!isAuthenticated){
    //     navigate("/login")
    //   }
    // },[])

  return <>
    <h1>Account Transaction (Payment / Money Transfer)</h1>
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 transactionSection">
        <div className="bg-white p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Client Details</h2>
          <div className='ClientThings'>
          <div>
            <div className="mb-2">Client Account Number</div>
            <div className="mb-2">Verified Facial Image</div>
          </div>
          {
            verify && <div>
            <div className="container mx-auto px-4 py-8 text-center">
              <h2 className="text-xl font-semibold mb-4">Verification Section</h2>
              <Webcam style={{
                margin:"1em auto",
                height:"15rem",
              }} audio={false} ref={webcamRef} />
              {verifying ? (
                <div>
                  <p>Verifying...</p>
                  <img src="verifying-image.gif" alt="Verifying" className="mt-4 mx-auto" />
                </div>
              ) : verified ? (
                <div>
                  <p>Image Verified!</p>
                </div>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleVerify}
                >
                  Verify Image
                </button>
              )}
            </div>
          </div>
          }
        </div>
        </div>
        {!verify && <div className="bg-white p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Recipient Details</h2>
          <div className="mb-2">
            <label className="block mb-1">Name</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Account Type</label>
            <select className="w-full p-2 border rounded">
              <option value="savings">Savings</option>
              <option value="current">Current</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Account Number</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          {/* <div className="mb-2">
            <label className="block mb-1">Sort Code</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Amount to Pay</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Reference</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div> */}
          <div className="mb-2">
            <label className="block mb-1">Purpose</label>
            <textarea className="w-full p-2 border rounded" rows={4} />
          </div>
        </div>}
      </div>
      <div className='buttons'>
        {
          verify ? <>
          <Link className='transferButton' to="/transact">
          Make a bank transfer or pay someone
        </Link>
        <Link className='profileButton' to="/account/register">
          Make a change to my profile
        </Link>
          </>:<button className='payButton' onClick={()=> {setVerify(!verify)}}>
          Continue
        </button>
        }
      </div>
    </div>
    </>;
};

export default Transact;
