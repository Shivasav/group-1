import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import UserRouter from "./routes/user.js";
import OrderRouter from "./routes/orders.js";

dotenv.config();

const app = express();
const corsOptions = {
  origin: "https://group-1-fe.onrender.com", // Replace with your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allow relevant HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  credentials: true,  // If you're using cookies or authorization headers
};

app.use(cors(corsOptions)); 
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.options('*', cors(corsOptions));
//error handel
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello This is Group 1 Project",
  });
});

app.use("/api/user/", UserRouter);

app.use("/api/orders", OrderRouter);
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MODNO_DB)
    .then(() => console.log("Connected to MONGO DB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
