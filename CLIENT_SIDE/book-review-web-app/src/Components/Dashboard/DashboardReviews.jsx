
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DisplayStarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {rating >= star ? (
              <AiFillStar size={20} color="#f39c12" />
            ) : (
              <AiOutlineStar size={20} color="#f39c12" />
            )}
          </span>
        ))}
      </div>
    );
  };


export default function DashboardReviews(){
    const backendURL=import.meta.env.VITE_BACKEND_URL;
    const [user,setUser]=useState(null);
    const [cookies,setCookie,removeCookie]=useCookies(['loggedUser']);
    const [reviews,setReviews]=useState([]);
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

    useEffect(()=>{

        if(user && user.reviews && user.reviews.length>0){

            axios.post(`${backendURL}/get-user-reviews`,{reviews : user.reviews})
            .then((res)=>{
                console.log("Successfully fetched user's reviews",res.data.data);
                setReviews(res.data.data);
            })
            .catch((err)=>{
                console.log("Error fetching user's reviews",err.message);
            })
        }
      },[user]);


    return(
        <div className="w-full h-auto p-5">
            {user && user.reviews.length === 0 ? <h1 className="text-black tracking-tighter font-medium">No reviews yet!</h1> : ''}
            <div className="w-full h-auto flex flex-wrap justify-start items-center">
                {reviews.length > 0 && reviews.map((review)=>(
                    <div key={review._id} className="w-[30%] h-[11rem] flex-col  justify-center items-center rounded-[8px] shadow-md pt-2 pr-4 pl-4">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-lg font-bold tracking-tighter text-black">{review.bookTitle}</h1>
                            <small className="text-zinc-500 font-medium tracking-tighter">{new Date(review.addedDate).toLocaleDateString()}</small>
                        </div>
                        <p className="w-full h-[35%] text-sm text-justify text-gray-700 font-medium mt-2 mb-6 text-ellipsis">{review.message}</p>
                        <div className="w-full h-auto flex justify-between items-center">
                            {<DisplayStarRating rating={review.rating}/>}
                            <button onClick={()=>navigate(`/dashboard/home/${review._id}`)} className="w-[2rem] h-[2rem] rounded-full bg-[#ec4e39] flex justify-center items-center"><ArrowRight color="white" size={19}/></button>
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    )
}