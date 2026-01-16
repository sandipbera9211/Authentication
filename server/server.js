import express from "express";
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoute.js";

const app=express();
const port=process.env.PORT || 4000;

connectDB();

const allowedOriginals=['https://authentication-frontend-r49s.onrender.com/','http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOriginals, credentials:true}))

//Api EndPoints.
app.get('/',(req,res)=> res.send("Api working..."))
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.listen(port,()=> console.log(`server started on Port:${port}`))
