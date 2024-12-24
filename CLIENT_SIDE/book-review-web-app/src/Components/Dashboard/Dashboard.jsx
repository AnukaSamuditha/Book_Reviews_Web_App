import React, { useEffect, useState } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Dashboard = () => {

  const backendURL=import.meta.env.VITE_BACKEND_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [cookies,setCookie,removeCookie]=useCookies(['loggedUser']);
  const [user,setUser]=useState(null);
  const navigate=useNavigate();

  useEffect(()=>{
    if(cookies.loggedUser){
      axios.get(`${backendURL}/get-user/${cookies.loggedUser}`)
      .then((res)=>{
        console.log("successfully fetched the user",res.data.user);
        setUser(res.data.user);
      })
      .catch((err)=>{
        console.log("error fetching the user",err);
      })
    }
  },[cookies.loggedUser]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };



  const userName = "John Doe";

  return (
    <div className="w-full h-screen flex">
      
      <div
        className={`fixed top-0 left-0 h-full bg-[#afa18f] text-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
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

        
        <div className="p-4">
          <NavLink
            to="home"
            className="block text-lg cursor-pointer"
          >
            My Reviews
          </NavLink>
        </div>
      </div>

      
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? null : <Menu size={24} />}
      </button>

      {isOpen && (
          <div
            className="absolute inset-0 right-3 w-[90%] pointer-events-none"
            onClick={toggleSidebar}
          ></div>
        )}
      
      <div
        className={`transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        } w-full h-full`}
      >
        <div className="w-full p-5 h-auto flex justify-start items-center gap-4">
         <ArrowLeft color="gray" onClick={()=>navigate('/')}/>
         <h1 className="font-bold tracking-tighter text-2xl">Dashboard</h1>
        </div>
        <div className="w-full h-auto">
         <Outlet context={{user,setUser}} />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
