import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import cors from "cors";
dotenv.config({});
connectDB();
const app=express();

const PORT=process.env.PORT || 3000;
const allowedOrigins = process.env.FRONTEND_URLS.split(",");

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server requests
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

//default middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user",userRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/media",mediaRoute);
app.use("/api/v1/purchase",purchaseRoute);
app.use("/api/v1/progress",courseProgressRoute);

//http://localhost:8080/api/v1/user/register
app.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`);
})