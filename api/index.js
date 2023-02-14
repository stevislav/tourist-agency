import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import offersRoute from "./routes/offers.js";
import pendingOffersRoute from "./routes/pendingOffers.js";

    // hiii
const app = express()
dotenv.config()

const connect = async () => {
    try {
        
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO , { useNewUrlParser: true });
        console.log("main connection to database successful")
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("Disconnected from database")
})

/* mongoose "connected" nije neophodno*/
mongoose.connection.on("connected", ()=>{
    console.log("Connected to database")
})

//middlewares


app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/offers", offersRoute);
app.use("/api/pendingoffers", pendingOffersRoute);

app.use((err, req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Server Error"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack: err.stack,
    })
})

app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend")
})
