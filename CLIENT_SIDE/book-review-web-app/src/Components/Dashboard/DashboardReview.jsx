
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { DisplayStarRating } from "./DashboardReviews";
import {Toaster,toast} from 'sonner';
import {CircleAlert, CircleCheck} from 'lucide-react';
import Swal from "sweetalert2";

export default function DashboardReview() {

  const backendURL=import.meta.env.VITE_BACKEND_URL;
  const [review, setReview] = useState(null);
  const { reviewId } = useParams();
  const navigate = useNavigate();
  
  console.log("Here is the review id",reviewId)

  useEffect(() => {
    if (reviewId) {
      axios.get(`${backendURL}/get-review/${reviewId}`)
        .then((res) => {
          setReview(res.data.data);
        })
        .catch((err) => {
          console.log("Error fetching review", err);
        });
    }
  }, [reviewId]);

  if (!review) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  function deleteReview(){
    axios.delete(`${backendURL}/delete-review/${review._id}`)
    .then((res)=>{
        toast.success("Review deleted successfully", {
            icon:<CircleCheck size={18} color="green"/>,
            className: "rounded-xl bg-white text-zinc-800 border-none   ",
        });
    })
    .catch((err)=>{
        console.log('error deleting review');
        toast.error("Error deleting review!", {
            icon: <CircleAlert size={18} color="red" />,
            className: "rounded-xl bg-white text-zinc-800 border-none",
        });
    })
  }

  function triggerDelete(){
    
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        customClass:{
            popup:'w-[30rem] h-[20rem]',
            icon:'w-[3rem] h-[3rem]'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          deleteReview(); 
          navigate('/dashboard/home/')
        }
      });
  }

  return (
    <div className="w-full  h-auto flex flex-col gap-4 items-center p-5">
      <Toaster/>
      <div className="flex justify-start items-center w-full">
        <ArrowLeft
          color="black"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
      </div>

      <div className="w-full h-auto flex justify-center items-center">
        <div className="w-[40%]  h-auto flex flex-col justify-start items-left p-3">
            <h1 className="text-xl font-bold tracking-tighter">{review && review.bookTitle}</h1>
            <h1 className="text-md font-medium text-gray-400 tracking-tighter">{review && review.author}</h1>
            <p className="text-sm mt-5 font-medium text-gray-600 tracking-tighter text-justify">{review && review.message}</p>
            <div className="w-full h-[3rem] mt-3">
             <DisplayStarRating rating={review.rating || 0}/>
            </div>
            <small className="text-xs tracking-tighter font-medium text-gray-500">{new Date(review.addedDate).toLocaleDateString()}</small>

            <div className="w-full h-[7rem] flex flex-col justify-center items-left gap-3">
                <button onClick={()=>navigate(`/dashboard/home/update-review/${review._id}`)} className="w-[90%] h-[2.5rem] rounded-lg bg-black text-white font-medium">Update</button>
                <button onClick={triggerDelete} className="w-[90%] h-[2.5rem] rounded-lg bg-transparent border-[1.5px] border-[#ec4e39] text-black font-medium">Delete</button>
            </div>
        </div>

      </div>
      
    </div>
  );
}
