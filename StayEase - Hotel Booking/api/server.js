import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoute from "./routes/bookingRoute.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/booking", bookingRoute);

app.get("/", (req, res) => {
  res.send("Currently in dev mode");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
