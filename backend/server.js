import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import { initializeSocket } from "./config/socket.js";

import authRoutes from "./routes/authRoutes.js";
import monitoringRoutes from "./routes/monitoringRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

const server = http.createServer(app);

// =========================
// CORS Configuration
// =========================

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// =========================
// Socket.IO
// =========================

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initializeSocket(io);

// =========================
// Middleware
// =========================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(helmet());

app.use(morgan("dev"));

// =========================
// Routes
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "NetGuard Backend Running Successfully",
  });
});

app.use("/api/auth", authRoutes);

app.use(
  "/api/monitoring",
  monitoringRoutes
);

app.use(
  "/api/alerts",
  alertRoutes
);

// =========================
// Error Handling
// =========================

app.use(notFound);

app.use(errorHandler);

// =========================
// Socket Events
// =========================

io.on("connection", (socket) => {
  console.log(
    `Client Connected: ${socket.id}`
  );

  socket.on("disconnect", () => {
    console.log(
      `Client Disconnected: ${socket.id}`
    );
  });
});

// =========================
// Server
// =========================

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    ` Server running on port ${PORT}`
  );
});