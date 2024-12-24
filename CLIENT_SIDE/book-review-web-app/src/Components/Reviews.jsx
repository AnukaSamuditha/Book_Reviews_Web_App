import { Search } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DisplayStarRating } from "./Dashboard/DashboardReviews";

export default function Reviews() {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [reviews, setReviews] = useState([]);
    const [ratingFilter, setRatingFilter] = useState("desc"); 
    const [dateFilter, setDateFilter] = useState("desc"); 

    useEffect(() => {
        axios.get(`${backendURL}/get-reviews`)
            .then((res) => {
                console.log("Reviews are here", res.data.reviews);
                setReviews(res.data.reviews);
            })
            .catch((err) => {
                console.log("Error fetching reviews", err);
            });
    }, []);

    const sortedByRating = [...reviews].sort((a, b) => {
        if (ratingFilter === "asc") {
            return a.rating - b.rating; 
        }
        return b.rating - a.rating; 
    });

    const sortedByDate = [...sortedByRating].sort((a, b) => {
        if (dateFilter === "asc") {
            return new Date(a.addedDate) - new Date(b.addedDate); 
        }
        return new Date(b.addedDate) - new Date(a.addedDate); 
    });

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center mt-8">
            <div className="lg:w-full w-[80%] h-auto lg:h-[28rem] flex flex-col justify-center items-center">
                <div className="w-full">
                    <h1 className="lg:text-7xl text-5xl font-bold tracking-tighter text-center">Discover,<br className="lg:hidden block" /> Review,<br className="lg:hidden block" /> and Share <br /> <span className="text-[#d2d2d2] leading-normal lg:text-7xl text-4xl"> Your Favorite Reads.</span></h1>
                </div>
                <div className="lg:w-[40%] w-[80%] relative h-[3rem] lg:h-[3rem] flex justify-center items-center rounded-full border border-gray-600 mt-8 lg:mt-10">
                    <input type="text" name="searchQuery" className="w-[90%] h-full focus:outline-none placeholder:lg:text-sm placeholder:text-xs" placeholder="Search your book..." />
                    <div className="lg:w-[3rem] w-[3rem] h-[3rem] absolute right-0 lg:h-[3rem] flex justify-center items-center rounded-full bg-black">
                        <Search color="white" size={20} />
                    </div>
                </div>

                <div className="lg:w-[40%] w-[80%] overflow-hidden overflow-x-scroll  scrollbar-hide h-[3rem] flex justify-start items-center mt-5">
                    <h1 className="text-md font-medium tracking-tight text-gray-700 mr-5">Filter</h1>
                    <div className="w-auto h-full flex justify-start items-center">
                        <select 
                            className="text-sm tracking-tight text-gray-400"
                            value={ratingFilter} 
                            onChange={(e) => setRatingFilter(e.target.value)}
                        >
                            <option value="desc">Rating: High to Low</option>
                            <option value="asc">Rating: Low to High</option>
                        </select>
                    </div>
                    <div className="ml-5">
                        <select 
                            className="text-sm tracking-tight text-gray-400"
                            value={dateFilter} 
                            onChange={(e) => setDateFilter(e.target.value)}
                        >
                            <option value="desc">Date: Newest First</option>
                            <option value="asc">Date: Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="lg:w-full w-[90%] h-auto flex justify-center items-center">
                <div className="lg:w-[90%] w-full h-auto flex lg:flex-row flex-col lg:flex-wrap justify-center items-center gap-5">
                    {sortedByDate.length > 0 && sortedByDate.map((review) => (
                        <div key={review._id} className="lg:w-[30%] w-[90%] lg:h-[11rem] h-[13rem] flex-col justify-center items-center rounded-[8px] shadow-md pt-2 pr-4 pl-4">
                            <div className="w-full flex justify-between items-center">
                                <h1 className="text-lg font-bold tracking-tighter text-black">{review.bookTitle}</h1>
                                <small className="text-zinc-500 font-medium tracking-tighter">{new Date(review.addedDate).toLocaleDateString()}</small>
                            </div>
                            <h1 className="text-md font-bold text-gray-500 tracking-tighter">{review.author}</h1>
                            <p className="w-full h-[35%] text-sm text-justify text-gray-700 font-medium mt-2 mb-6 text-ellipsis">{review.message}</p>
                            <div className="w-full h-auto flex justify-between items-center">
                                {<DisplayStarRating rating={review.rating} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
