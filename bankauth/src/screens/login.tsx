// About.tsx
import React, { useState } from 'react';
import Header from '../components/header';
import { Link } from "react-router-dom";
import { useAuth } from '../context/authContext';
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const { login } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Working")
        const url = 'http://localhost:5000/login'; // Replace with your actual API endpoint

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // You might also include authorization headers here if needed
            },
            body: JSON.stringify({email,password}),
          });

          const data = await response.json();
          login(data.accessToken, data.userid);
          navigate("/");

        } catch (error) {
          console.error('Error:', error);
          console.log('An error occurred');
        }
    };

  return <>
    <Header></Header>
    <div className="max-w-md mx-auto p-4">
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
            Password
          </label>
          <input
            type="tel"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
    <Link to="/register" className="flex items-center">
      dont have account sign Up here
    </Link>
    </>;
};

export default Login;
