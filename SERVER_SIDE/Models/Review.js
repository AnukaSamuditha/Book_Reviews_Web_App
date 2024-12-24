const mongoose=require('mongoose');

const reviewSchema=mongoose.Schema({
    bookTitle:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    addedDate:{
        type:String,
        required:false
    }
})

const Review=mongoose.model('Review',reviewSchema);
module.exports=Review;