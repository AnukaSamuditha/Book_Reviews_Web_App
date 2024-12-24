import { NavLink, useNavigate } from "react-router-dom";
import { LibraryBig, Menu, X, ArrowRight } from "lucide-react";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Header() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [cookies] = useCookies(["loggedUser"]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (cookies.loggedUser) {
      axios
        .get(`${backendURL}/get-user/${cookies.loggedUser}`)
        .then((res) => {
          console.log("Successfully fetched the user", res.data.user);
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log("Error fetching the user", err);
        });
    }
  }, [cookies.loggedUser]);

  return (
    <header className="w-full lg:h-[4rem] h-auto flex justify-between items-center p-3 lg:shadow-md relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#afa18f] text-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 z-50`}
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={toggleSidebar}
        >
          <X size={24} />
        </button>
        <div className="p-4 border-b border-gray-700 mt-12">
          <h2 className="text-lg font-bold">{user && user.username}</h2>
        </div>

       <div className="lg:hidden w-full flex flex-col justify-start items-left p-5">
       <div className="p-4">
          <NavLink to="/" className="block text-lg cursor-pointer">
            Reviews
          </NavLink>
        </div>

        <div className="p-4">
          <NavLink to="/signin" className="block text-lg cursor-pointer">
            SignIn
          </NavLink>
        </div>

        <div className="p-4">
          <NavLink to="/signup" className="block text-lg cursor-pointer">
            SignUp
          </NavLink>
        </div>

        {cookies.loggedUser && <div className="p-4">
          <NavLink to="/" className="block text-lg cursor-pointer">
            Reviews
          </NavLink>
        </div>}
       </div>
      </div>

      
      <div className="lg:hidden flex justify-start items-center">
        <button onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </div>

      
      <div className="hidden lg:flex w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <LibraryBig />
          <h1 className="text-2xl font-bold tracking-tighter">Book Rate</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="w-[7rem] h-[2.5rem] rounded-full bg-[#ec4e39] font-medium text-sm text-white"
          >
            Get started
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="w-[7rem] h-[2.5rem] rounded-full border border-gray-400 text-sm font-medium text-black flex justify-center items-center gap-2"
          >
            Login <ArrowRight color="black" />
          </button>
          <NavLink
            to={cookies.loggedUser ? "/dashboard" : "/signin"}
            className="text-lg text-gray-500 font-medium tracking-tighter pr-5 pl-8"
          >
            Dashboard
          </NavLink>
        </div>
      </div>
    </header>
  );
}
