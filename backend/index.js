import express, { request, response } from "express";
import { PORT, mongoDBURL, FRONTEND_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);
// app.use(
//   cors({
//     origin: "https://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN Stack Book Shop");
});

app.use("/books", booksRoute);

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDBURL, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log("App connected to db");
    return true;
  } catch (error) {
    console.log("Error connecting to the database:", error);
    return false;
  }
}

async function startServer() {
  const isConnected = await connectToDatabase();
  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } else {
    console.log("Failed to start server due to database connection error");
    process.exit(1);
  }
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Mongoose connection disconnected through app termination");
    process.exit(0);
  } catch (error) {
    console.error("Error closing Mongoose connection:", error);
    process.exit(1);
  }
});

startServer();
