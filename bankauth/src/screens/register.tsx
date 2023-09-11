// About.tsx
import React, { useState, useRef } from 'react';
import Header from '../components/header';
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";

const MAKEUSER = gql`
mutation CreateAccount($payload: CreateAccountInput!) {
  createAccount(input : $payload)
  {
      id
      faceUrl
      credUrl
  }
}

`;

const Register: React.FC = () => {
  const [createUser, { loading, error, data }] = useMutation(MAKEUSER);
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [faceImg,setface] = useState<(File | string)[]>([]);

    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if(file)
      setSelectedFile(file);
    };

    const webcamRef = useRef<Webcam>(null);;

    const capture = () => {
      if (webcamRef.current) {
        const screenshot = webcamRef.current.getScreenshot();
        if (screenshot) {
          // Convert the screenshot to a Blob
          const blob = new Blob([screenshot], { type: 'image/png' });
    
          // Create a File object from the Blob
          const file = new File([blob], 'screenshot.png', { type: 'image/png' });
    
          setface([file, screenshot])
        }
      }
    };
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
        // try {
          const payload = {
            email,
            password,
            phone,
            pdfOrImg: typeof selectedFile === 'object' && selectedFile instanceof File
            ? selectedFile.name
            : '',
            faceImage: typeof faceImg[1] === 'string' ? "user.png" : "",
            address,
            accountType : "SAVINGS"
          }
          const response = await createUser({
            variables: { payload}
          });
          console.log('User created');
          const cred = fetch(response.data.createAccount.credUrl, {
            method: 'PUT',
            body: selectedFile,
          });
          const face = fetch(response.data.createAccount.faceUrl, {
            method: 'PUT',
            body: faceImg[0],
          });
          Promise.all([cred, face]).then((values) => {
            console.log("files uploaded");
            navigate("/login");
          });
          // } catch (error:any) {
            //   console.error('Error creating user:', error.message);
        // }
    };
    return <section>
      <h1>
        Account / Registration
      </h1>
      <div className="Registercontainer">
        <div className="clientDetails">
        <h2>
          Client Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block font-medium mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label htmlFor="Identification" className="block font-medium mb-1">
          Identification
          </label>
          <input type="text" className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200" placeholder='(passport, driving license, etc.)' id="identification" />
        </div>
      <div className="block font-medium mb-1">
        <Webcam audio={false} style={{width:"auto",height:"10rem", margin:"1rem auto",}} ref={webcamRef} />
        {faceImg[1] && <img style={{width:"auto",height:"10rem"}} src={typeof faceImg[1] === 'string' ? faceImg[1] : ""} alt="Face Image" />}
        <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"  onClick={capture}>Capture</div>
      </div>
        <div>
          <label htmlFor="address" className="block font-medium mb-1">
            Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
            rows={4}
            required
          />
        </div>

        <div style={{width:"100%", justifyContent:"flex-start"}} >
          <label className="block font-medium mb-1" htmlFor="">
          Communication preference
          </label>
          <select name="Communication" id="">
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
          </select>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
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
          </div>
        </div>
      </div>
    </section>;
//   return <>
//     <Header></Header>
//     <div className="max-w-md mx-auto p-4">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block font-medium mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="block font-medium mb-1">
//             password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setpassword(e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="phone" className="block font-medium mb-1">
//             Phone
//           </label>
//           <input
//             type="tel"
//             id="phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="address" className="block font-medium mb-1">
//             Address
//           </label>
//           <textarea
//             id="address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
//             rows={4}
//             required
//           />
//         </div>
//         <div className="block font-medium mb-1">
//         <label htmlFor="fileInput" className="text-lg font-semibold">
//           Upload a Identity Proof
//         </label>
//         <input
//           type="file"
//           id="fileInput"
//           className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
//           onChange={handleFileChange}
//         />
//         {selectedFile && (
//           <p className="text-green-600">Selected file: {selectedFile.name}</p>
//         )}
//       </div>
//       <div className="block font-medium mb-1">
//         <Webcam audio={false} ref={webcamRef} />
//         {faceImg[1] && <img src={typeof faceImg[1] === 'string' ? faceImg[1] : ""} alt="Face Image" />}
//         <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={capture}>Capture</div>
//       </div>
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//     <Link to="/login" className="margin:auto">
//       already have account sign here
//     </Link>
//     </div>
//     </>;
};

export default Register;
