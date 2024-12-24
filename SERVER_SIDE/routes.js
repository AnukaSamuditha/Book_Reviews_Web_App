const express=require('express');
const router=express.Router();
const Review=require('./Models/Review');
const User=require('./Models/User');

router.post('/create-review',async (req,res)=>{
    const {bookTitle,author,message,rating,user,addedDate}=req.body;

    try{
        const newReview=new Review({
            bookTitle,
            author,
            message,
            rating,
            user,
            addedDate
        })

        const savedReview=await newReview.save();

        if(savedReview){
          const foundUser=await User.findById(user);

          if(!foundUser){
            return res.status(404).json({
              status: "",
              message: "User not found",
            });
          }

          foundUser.reviews.push(savedReview._id);
          await foundUser.save();

        }

        res.status(200).json({
            data:savedReview,
            message:'review created successfully!'
        })
    }catch(error){
        res.status(500).json({
            error:`error creating review ${error}`
        })
    }
});

router.post("/create-user", async (req, res) => {
    const { username, password, email, type } = req.body;
  
    const available=await User.findOne({email})
  
    if(available){
      return res.status(500).json({
        status:'email already available'
      })
    }
  
    const user = new User({
      username,
      email,
      password,
      type
    });
  
    try {
      await user.save();
      res.status(200).json({
        message: "User account created successfully",
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        status: "Failure",
        error: err,
      });
    }
});

router.post('/login',async(req,res)=>{
    const{email,password}=req.body;
  
    try{
      const user=await User.findOne({email:email});
  
      if(!user){
        return res.status(404).json({
          status:'Invalid email address'
        })
      }
      if(password!==user.password){
        return res.status(401).json({
          msg:'Invalid email or password'
        })
      }
      res.status(200).json({
        status:'user found',
        data:user
      })
    }catch(err){
      res.status(500).json({
        status:'error finding the user',
        error:err.message
      })
    }
});

router.get("/get-user/:userId", async (req, res) => {
  const userID = req.params.userId;

  try {
    const user = await User.findById(userID);

    if (user) {
      res.status(200).json({
        status: "success",
        user: user,
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "seller not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failure",
      message: "Error fetching the user",
      error: err,
    });
  }
});

router.post("/get-user-reviews", async (req, res) => {
  const { reviews } = req.body;

  

  try {
    const userReviews = await Review.find({ _id: { $in: reviews } });
    res.status(200).json({
      status: "success",
      data: userReviews,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error,
    });
  }
});

router.get("/get-review/:id", async (req, res) => {
  let reviewId = req.params.id;

  reviewId = reviewId.replace(/^:/, "");

  try {
    const review = await Review.findById(reviewId);
    if (review) {
      res.status(200).json({
        status: "success",
        data: review,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error,
    });
  }
});

router.put("/update-review/:reviewId",async (req, res) => {
    const reviewId = req.params.reviewId;
    const { bookTitle, author, rating, message } = req.body;

    console.log('review id up',reviewId);
    
    try {
      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({
          status: "review not found",
        });
      }

      review.bookTitle = bookTitle;
      review.author = author;
      review.rating = rating;
      review.message = message;

      const updatedReview = await review.save();

      if (updatedReview) {
        return res.status(200).json({
          status: "success",
          data: updatedReview,
        });

      } else {
        return res.status(404).json({
          status: "review not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "failed",
        error: err.message,
      });
    }
  }
);


router.delete("/delete-review/:reviewId", async (req, res) => {
  const { reviewId } = req.params;

  try {
    if (reviewId) {
      
      const review = await Review.findByIdAndDelete(reviewId);

      if (!review) {
        return res.status(404).json({
          status: "failed",
          message: "Review not found",
        });
      }

      await User.updateOne(
        { reviews: reviewId },
        { $pull: { reviews: reviewId } }
      );

      res.status(200).json({
        status: "success",
        message: "Review deleted successfully",
        data: {},
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Review ID is required",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
});

router.get("/get-reviews", async (req, res) => {
  try {
    const reviews = await Review.find({});

    if (reviews.length > 0) {
      res.status(200).json({
        status: "success",
        reviews: reviews,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
});


  
  

module.exports=router;
