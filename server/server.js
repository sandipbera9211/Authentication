import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect DB
connectDB();

// ✅ Put CORS first
const allowedOrigins = [
  'http://localhost:5173', // dev
  'https://authentication-frontend-r49s.onrender.com', // your deployed frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman or server requests
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.log('Blocked by CORS:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => res.send("API working..."));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// ✅ Handle preflight requests for all routes
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));

app.listen(port, () => console.log(`server started on Port:${port}`));

