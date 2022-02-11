import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToDatabase from "./config/database";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

//initialization
const app = express();
dotenv.config();

//database connnection
try {
  await connectToDatabase();
} catch (err) {
  console.err(err.red.bold);
  process.exit(1);
}

//check environment
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);

//constants

const HOST = process.env.HOST;
const port = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

//routes

app.route("/api", coreRoutes);
app.route("/api/users", userRoutes);

//routes
app.use("/api", coreRoutes);
