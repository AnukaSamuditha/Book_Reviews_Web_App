import React,{useState}from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import {Toaster,toast} from 'sonner';
import {CircleAlert, CircleCheck} from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const backendURL=import.meta.env.VITE_BACKEND_URL;
    const [formData,setFormData]=useState({
        username:"",
        email:"",
        password:"",
    })
    const [cookies,setCookie,removeCookie]=useCookies(['loggedUser']);
    const navigate=useNavigate();

    function handleChange(event){
        setFormData((prevData)=>{
            const {name,value}=event.target;

            return{
                ...prevData,
                [name]:value
            }
        })
    }


    function handleSubmit(event){
        event.preventDefault()

        if(!formData.username || !formData.email || !formData.password){
            toast.error("All field must require!", {
                icon: <CircleAlert size={18} color="red" />,
                className: "rounded-xl bg-white text-zinc-800 border-none",
            });

            return
        }
        axios.post(`${backendURL}/create-user`,{
            username:formData.username,
            email:formData.email,
            password:formData.password,

        }).then((res)=>{
            console.log("User created successfully",res.data.data._id);
            setCookie('loggedUser',res.data.data._id,{path:'/',maxAge:3600});

            toast.success("Account created successfully", {
                icon:<CircleCheck size={18} color="green"/>,
                className: "rounded-xl bg-white text-zinc-800 border-none   ",
            });
        
            setFormData({
                username:"",
                email:"",
                password:"",
            })

        }).catch((err)=>{
            console.error("Error creating the user",err);

            toast.error("Error creating user account!", {
                icon: <CircleAlert size={18} color="red" />,
                className: "rounded-xl bg-white text-zinc-800 border-none",
            });
        })
    }

    return(
        <div className="flex flex-col justify-center items-center w-full min-h-screen p-5 ">
            <Toaster/>
            <form className="border border-zinc-400 rounded-[8px] w-[90%] h-full p-5 lg:w-[30%] lg:mt-16" onSubmit={handleSubmit}>
            <h5 className="text-black text-2xl font-bold text-left mb-1">Signup</h5>
            <h5 className="text-zinc-400  text-sm mb-2">Enter your email to get started!</h5>

                <label htmlFor="username" className="text-sm font-medium text-zinc-600  mb-5">Username</label><br/>
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="border border-zinc-400 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-black text-sm p-4 placeholder-zinc-400 focus:outline-none" />

                <label htmlFor="email" className="text-sm font-medium text-zinc-600   mb-5">Email Address</label><br/>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-zinc-400 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-black text-sm p-4 placeholder-zinc-400 focus:outline-none" placeholder="m@example.com"/>

                <label htmlFor="password" className="text-sm font-medium text-zinc-600  mb-10">Password</label><br/>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="border border-zinc-400 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-black text-sm p-4 placeholder-zinc-400 focus:outline-none" />

                <button className="w-full bg-black text-white text-sm font-semibold rounded-[8px] h-[2.5rem] mb-3">Submit</button>
                <p className="text-sm text-center text-zinc-500 mt-4">Already have an account? <span className="underline cursor-pointer" onClick={()=>navigate('/signin')}>Log in</span></p>
            </form>
        </div>
    )
}