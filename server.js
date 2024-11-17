const express= require("express");
const app=express()
const router = require('./router/router');
const cors = require('cors');
const connectDB=require('./DB/connectDB');
const cookieParser = require("cookie-parser");
const path = require('path');

connectDB()
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }));
app.use("/",router)


app.listen(8000,()=>{
    console.log('server is runnig on the port 8000')
})