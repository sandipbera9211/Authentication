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
app.use(
  cors({
    origin: (origin, callback) => {
      // If no origin (like Postman or server-to-server requests), allow it
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('Blocked by CORS:', origin); // Optional: debug blocked origins
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);


// Routes
app.get('/', (req, res) => res.send("API working..."));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.listen(port,()=> console.log(`server started on Port:${port}`))


