import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";  //Helps you see all incoming requests in console — super useful in production debugging.
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler.js"; //✅ Makes debugging and logging uniform across routes.
import { swaggerSpec, swaggerUi } from "./config/swagger.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import connectDB from "./config/db.js";


dotenv.config();
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Global Middlewares
app.use(helmet());                 // Secure HTTP headers
const allowedOrigins = [
  "http://localhost:3000", // local frontend
  "https://product-inventory-app-1.onrender.com", // ✅ your live Render frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);    // Allow CORS
app.use(express.json());           // Parse JSON
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")); 
// Log requests
app.use(errorHandler);           // Global error handler


// ✅ Rate Limiter (Protect API from abuse)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    error: "Too many requests. Please try again later."
  }
});

// ✅ Swagger API Documentation
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { persistAuthorization: true }
  }));
}

// ✅ Correct base prefix
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/sales", salesRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);




// ✅ Start the Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const gracefulShutdown = async (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);

  try {
    await mongoose.connection.close(false);
    console.log("✅ MongoDB disconnected.");
  } catch (err) {
    console.error("❌ Error disconnecting MongoDB:", err);
  }

  server.close(() => {
    console.log("✅ Server stopped safely.");
    setTimeout(() => process.exit(0), 200); // Force exit if not closed in time
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
