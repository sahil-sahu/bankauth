import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Home from  './screens/Home';
import Register from "./screens/register";
import Transact from "./screens/transaction";
import Account from "./screens/login";
import Login from "./screens/login";
import { AuthProvider } from "./context/authContext";
import Profile from "./screens/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/transact",
    element: <Transact />,
  },
  {
    path: "/account/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;