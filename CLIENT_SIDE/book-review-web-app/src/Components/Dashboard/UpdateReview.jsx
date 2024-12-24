import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { CircleAlert, CircleCheck } from "lucide-react";

const StarRating = ({ rating, onRatingChange }) => {
  const handleRating = (value) => {
    onRatingChange(value);
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

export default function UpdateReview() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);
  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    message: "",
    rating: 0,
  });

  useEffect(() => {
    if (reviewId) {
      axios
        .get(`${backendURL}/get-review/${reviewId}`)
        .then((res) => {
          setReview(res.data.data);
        })
        .catch((err) => {
          console.log("Error fetching review", err);
        });
    }
  }, [reviewId]);

  useEffect(() => {
    if (review) {
      setFormData({
        bookTitle: review.bookTitle,
        author: review.author,
        message: review.message,
        rating: review.rating,
      });
    }
  }, [review]);

  function handleSubmit(event) {
    event.preventDefault();

    const { bookTitle, author, message, rating } = formData;

    if (!bookTitle || !author || !message || rating === 0) {
      toast.error("All fields must be filled!", {
        icon: <CircleAlert size={18} color="red" />,
        className: "rounded-xl bg-white text-zinc-800 border-none",
      });

      return;
    }

    axios
      .put(`${backendURL}/update-review/${review._id}`, formData)
      .then(() => {
        setFormData({
          bookTitle: "",
          author: "",
          message: "",
          rating: 0,
        });

        toast.success("Review updated successfully", {
          icon: <CircleCheck size={18} color="green" />,
          className: "rounded-xl bg-white text-zinc-800 border-none",
        });
      })
      .catch((err) => {
        console.log("Error updating review", err);
        toast.error("Error updating review!", {
          icon: <CircleAlert size={18} color="red" />,
          className: "rounded-xl bg-white text-zinc-800 border-none",
        });
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="w-full h-[100vh] mt-10 flex justify-center items-center">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="lg:w-[35%] w-[90%] h-auto rounded-xl border border-gray-300 p-3"
      >
        <h1 className="font-bold text-black text-xl tracking-tighter mb-5">
          Update review
        </h1>
        <label htmlFor="bookTitle" className="text-sm font-medium">
          Book Title
        </label>
        <br />
        <input
          type="text"
          id="bookTitle"
          onChange={handleChange}
          value={formData.bookTitle}
          name="bookTitle"
          className="w-full h-[2.5rem] p-3 mb-3 rounded-lg border text-gray-500 border-gray-400 focus:outline-none placeholder:text-sm"
          placeholder="Book title"
        />

        <label htmlFor="author" className="text-sm font-medium">
          Author
        </label>
        <br />
        <input
          type="text"
          id="author"
          onChange={handleChange}
          value={formData.author}
          name="author"
          className="w-full h-[2.5rem] p-3 mb-3 rounded-lg border border-gray-400 text-gray-500 focus:outline-none placeholder:text-sm"
          placeholder="Book author"
        />

        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <br />
        <textarea
          rows={5}
          name="message"
          id="message"
          onChange={handleChange}
          value={formData.message}
          className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none text-gray-500"
          placeholder="Add your review here..."
        />

        <label htmlFor="rating" className="text-sm font-medium">
          Rating
        </label>
        <div className="w-full h-[4rem] flex justify-center items-center mb-5">
          <StarRating
            rating={formData.rating}
            onRatingChange={(value) =>
              setFormData((prevData) => ({ ...prevData, rating: value }))
            }
          />
        </div>

        <button className="w-full h-[2.5rem] rounded-lg bg-black text-white font-medium active:scale-95 duration-200">
          Save
        </button>
      </form>
    </div>
  );
}
