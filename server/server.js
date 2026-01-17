import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoute.js";

const app=express();
const port=process.env.PORT || 4000;

// Connect DB
connectDB();


const allowedOrigins = [
  'http://localhost:5173', // dev
  'https://authentication-frontend-6qhm.onrender.com' // prod frontend
];



app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true); // allow Postman / server-side requests
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error('CORS Policy Blocked this origin'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Routes
app.get('/', (req, res) => res.send("API working..."));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.listen(port,()=> console.log(`server started on Port:${port}`))


