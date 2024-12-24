import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from 'axios';
import {Toaster,toast} from 'sonner';
import {CircleAlert, CircleCheck} from 'lucide-react';
import { useCookies } from "react-cookie";

const StarRating = ({ rating, setRating }) => {
    const handleRating = (value) => {
      setRating(value);
    };
  
    return (
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            className="cursor-pointer"
          >
            {rating >= star ? (
              <AiFillStar size={35} color="#f39c12" />
            ) : (
              <AiOutlineStar size={35} color="#f39c12" />
            )}
          </span>
        ))}
      </div>
    );
};

export default function ReviewForm(){

    const backendURL=import.meta.env.VITE_BACKEND_URL;
    const [cookies,setCookie,removeCookie]=useCookies(['loggedUser']);
    console.log('backend url',backendURL);

    const [rating,setRating]=useState(0);
    const [formData,setFormData] =useState({
        bookTitle:'',
        author:'',
        message:''
    });

    function handleChange(event){
        const {name,value}=event.target;

        setFormData((prevData)=>{
            return{
                ...prevData,
                [name]:value
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault();

        if(!formData.bookTitle || !formData.author || !formData.message || !rating){
            toast.error("All field must require!", {
                icon: <CircleAlert size={18} color="red" />,
                className: "rounded-xl bg-white text-zinc-800 border-none",
            });

            return
        }

        axios.post(`${backendURL}/create-review`,{
            bookTitle:formData.bookTitle,
            author:formData.author,
            rating:rating,
            message:formData.message,
            user:cookies.loggedUser,
            addedDate:new Date()
        })
        .then((res)=>{
            console.log('review was created successfully',res.data.data);
            setFormData({
                bookTitle:'',
                author:'',
                message:''
            });

            toast.success("Review published successfully", {
                icon:<CircleCheck size={18} color="green"/>,
                className: "rounded-xl bg-white text-zinc-800 border-none   ",
            });
    
            setRating(0);
        })
        .catch((err)=>{
            console.log('error creating review',err);
            toast.error("Failed to create the review!", {
                icon: <CircleAlert size={18} color="red" />,
                className: "rounded-xl bg-white text-zinc-800 border-none",
            });
    
        })
    }

    return(
        <div className="w-full h-auto flex justify-center items-center p-10">
            <Toaster/>
            <form onSubmit={handleSubmit} className="lg:w-[35%] w-full h-auto rounded-xl border border-gray-300 p-3">
                <h1 className="font-bold text-black text-xl tracking-tighter mb-5">Publish review</h1>
                <label htmlFor="bookTitle" className="text-xs font-medium">Book Title</label><br/>
                <input type="text" id="bookTitle" onChange={handleChange} value={formData.bookTitle} name="bookTitle" className="w-full h-[2.5rem] p-3 mb-3 rounded-lg border border-gray-400 focus:outline-none placeholder:text-sm" placeholder="Book title"/>

                <label htmlFor="author" className="text-xs font-medium">Author</label><br/>
                <input type="text" id="author" onChange={handleChange} value={formData.author} name="author" className="w-full h-[2.5rem] p-3 mb-3 rounded-lg border border-gray-400 focus:outline-none placeholder:text-sm" placeholder="Book author"/>

                <label htmlFor="message" className="text-xs font-medium">Message</label><br/>
                <textarea rows={5} name="message"  id="message" onChange={handleChange} value={formData.message} className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none" placeholder="Add your review here..."/>

                <label htmlFor="rating" className="text-xs font-medium">Rating</label>
                <div className="w-full h-[4rem] flex justify-center items-center mb-5">
                 <StarRating rating={rating} setRating={setRating} />
                </div>

                <button className="w-full h-[2.5rem] rounded-lg bg-[#ec4e39] text-white font-medium active:scale-95 duration-200 ">Submit</button>
                
            </form>
        </div>
    )
}