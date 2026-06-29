import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./config/socket.js";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import monitoringRoutes from "./routes/monitoringRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import {notFound, errorHandler,} from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

initializeSocket(io);

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use("/api/alerts", alertRoutes);

app.use(notFound);

app.use(errorHandler);

app.use(morgan("dev"));

 app.use("/api/auth", authRoutes);

 app.use("/api/monitoring", monitoringRoutes);

app.get("/", (req, res) => {
  res.json({
    message:
      "NetGuard  Backend Running",
  });
});

io.on("connection", (socket) => {
  console.log(
    "Client Connected"
  );

  socket.on(
    "disconnect",
    () => {
      console.log(
        "Client Disconnected"
      );
    }
  );
});

const PORT =
  process.env.PORT || 5000;


server.listen(PORT, () =>
  console.log(
    `Server Running on ${PORT}`
  )
);