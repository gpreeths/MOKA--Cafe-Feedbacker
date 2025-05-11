const express= require('express')
const mongoose=require('mongoose')
const app=express()
const cors=require('cors')
app.use(cors())
require("dotenv").config()
app.use(express.json())
mongoose.connect(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("MongoDB connection error:", err));


const path=require('path')
app.use('/uploads',express.static(path.join(__dirname,'uploads','reviews')))

app.use('/reviews', (req, res, next) => {
    console.log('Requested image:', req.url);
    next();
  });


const userRoute=require('./routes/userRoute')
app.use('/user',userRoute)


const adminRoute=require('./routes/adminRoute')
app.use('/admin',adminRoute)

app.listen(process.env.PORT,()=>{
    console.log(`running on ${process.env.PORT}`);
    
})
// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

