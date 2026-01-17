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

const allowedOrigins = [
  'https://authentication-frontend-r49s.onrender.com',
  'http://localhost:5173'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.options('*', cors());


app.use(express.json());
app.use(cookieParser());


//Api EndPoints.
app.get('/',(req,res)=> res.send("Api working..."))
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.listen(port,()=> console.log(`server started on Port:${port}`))
