import React, { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed, ShieldAlert } from "lucide-react";
import {Toaster,toast} from 'sonner';
import {CircleAlert, CircleCheck} from 'lucide-react';

export default function SignIn(){
    const backendURL=import.meta.env.VITE_BACKEND_URL;
    const[formData,setFormData]=useState({
        email:'',
        password:''
    });
    const [cookies,setCookie,removeCookie]=useCookies(['loggedUser']);
    const[user,setUser]=useState(null);

    const[error,setError]=useState({
        email:'',
        password:''
    })
    const[viewPassword,setViewPassword]=useState(false);
    const navigate=useNavigate();
      

    function handleChange(event){
        const {name,value} =event.target;

        setFormData((prevData)=>{
            return{
                ...prevData,
                [name]:value
            }
        })

        if(value==''){
            setError((prevErr)=>{
                return{
                    ...prevErr,
                    [name]:`${name} field cannot be empty`
                }
            })
        }
        else{
            setError((prevErr)=>{
                return{
                    ...prevErr,
                    [name]:''
                }
            })
        }
    }

    function handleSubmit(event){
        event.preventDefault();

       if(!formData.email){
        setError((prevErr)=>({...prevErr,email:'Email field cannot be empty'}));
        
       }

       if(!formData.password){
        setError((prevErr)=>({...prevErr,password:'Password field cannot be empty'}));
        return
       }

        axios.post(`${backendURL}/login`,{
            email:formData.email,
            password:formData.password
        })
        .then((res)=>{
            if(res.status==401){
                setError((prevErr)=>({...prevErr,email:res.data.msg}));
            }
            //console.log('successfully logged',res.data.data);
            setUser(res.data.data);
            setCookie('loggedUser',res.data.data._id,{path:'/',maxAge:3600})

            toast.success("Login successfull", {
                icon:<CircleCheck size={18} color="green"/>,
                className: "rounded-xl bg-white text-zinc-800 border-none   ",
            });
            setFormData({email:'',password:''});
            
        }).catch((err) => {
            if (err.response) {
                
                if (err.response.status === 401) {
                    setError((prevErr) => ({
                        ...prevErr,
                        email: err.response.data.msg,
                    }));
                }
                if (err.response.status === 404) {
                    setError((prevErr) => ({
                        ...prevErr,
                        email: err.response.data.status,
                    }));
                }
            } else if (err.request) {
                
                console.error("No response received:", err.request);
                setError((prevErr) => ({
                    ...prevErr,
                    email: "No response from server. Please try again later.",
                }));
            } else {
               
                console.error("Error setting up request:", err.message);
                setError((prevErr) => ({
                    ...prevErr,
                    email: "An unexpected error occurred. Please try again.",
                }));
            }
        });
        

    }

    return(
        <div className="flex flex-col justify-center items-center w-full h-screen p-5">
            <Toaster/>
            
            <form className="border border-zinc-400 rounded-[8px] w-[90%] h-auto p-5 lg:w-[30%] lg:mt-16" onSubmit={handleSubmit} autoComplete="off">
            <h5 className="text-black text-2xl font-bold text-left mb-1">Login</h5>
            <h5 className="text-zinc-400  text-sm mb-5">Enter your credentials to login!</h5>

                <div className="flex flex-col justify-center items-start gap-3 w-full">
                <div className="w-full">
                <label htmlFor="email" className="text-sm font-medium text-zinc-500 p-1">Email Address</label><br/>
                <input type="email" autoComplete="off"  name="email" value={formData.email} onChange={handleChange} className="  border relative border-zinc-400 w-full rounded-[8px] h-[2.5rem]   bg-transparent focus:outline-none peer-placeholder-:mb-2  text-zinc-500 text-sm p-4 placeholder-zinc-400" placeholder="m@example.com"/>
                {error.email && <small className="text-sm font-semibold leading-none text-red-700 p-2 flex gap-2 justify-start items-center"><ShieldAlert color="red" size={15} />{error.email}</small>} <br/>
                </div>
                
                <div className="w-full">
                <label htmlFor="password" className="text-sm font-medium text-zinc-500 p-1 ">Password</label><br/>
                <div className="flex justify-center items-center w-full relative">
                <input type={viewPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className="border border-zinc-400  bg-transparent w-full focus:outline-none rounded-[8px] h-[2.5rem] text-zinc-500 text-sm p-4 placeholder-zinc-400" autoComplete="off"/>
                {viewPassword ? <Eye color="black" size={18} className="absolute top-3 right-4" onClick={()=>setViewPassword((prev)=>!prev)}/> : <EyeClosed color="black" size={18} className="absolute top-3 right-4" onClick={()=>setViewPassword((prev)=>!prev)}/>}

                </div>
                {error.password!=='' && <small className="text-sm font-semibold leading-none text-red-700 p-2 flex justify-start items-center gap-2"><ShieldAlert color="red" size={15}/>{error.password}</small> }<br/>

                </div>
                </div>
                <button className="w-full bg-black text-white text-sm font-semibold rounded-[8px] h-[2.5rem] lg:h-[2.5rem] mt-3 mb-3">Login</button>
                <p className="text-sm text-center text-zinc-500 mt-4">Still not registered? <span className="underline cursor-pointer" onClick={()=>navigate('/signup')}> Sign up!</span></p>
            </form>
        </div>
    )
}