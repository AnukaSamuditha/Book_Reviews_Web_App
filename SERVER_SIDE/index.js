const express=require('express');
const cors=require('cors');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
const routes=require('./routes');

app.use(express.json());
app.use(cors());
app.use(routes);


const PORT=process.env.PORT;
const DB_LINK=process.env.VITE_MONGO_URL;


mongoose.connect(DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("Database is not connected",error.message);
});


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}...`);
})