import Traffic from "../models/Traffic.js";
import { getIO } from "../config/socket.js";
import Alert from "../models/Alert.js";

// Create traffic record
export const createTraffic = async (req, res) => {
  try {
    const traffic = await Traffic.create(req.body);

    if (
      traffic.status === "Anomaly" ||
      traffic.status === "Suspicious"
    ) {
      let severity = "Medium";

      if (traffic.anomalyScore >= 0.9) {
        severity = "Critical";
      } else if (traffic.anomalyScore >= 0.7) {
        severity = "High";
      }

      const alert = await Alert.create({
        title: "Network Anomaly Detected",
        description:
          "Machine learning model detected suspicious network traffic.",
        sourceIP: traffic.sourceIP,
        destinationIP: traffic.destinationIP,
        protocol: traffic.protocol,
        anomalyScore: traffic.anomalyScore,
        severity,
      });

      getIO().emit("alertCreated", alert);
    }

    const io = getIO();

    io.emit("newTraffic", traffic);

    if (
      traffic.status === "Anomaly" ||
      traffic.status === "Suspicious"
    ) {
      io.emit("newAlert", traffic);
    }

    return res.status(201).json(traffic);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get all traffic
export const getTraffic =
  async (req, res) => {
    try {
      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 20;

      const skip =
        (page - 1) * limit;

      const filter = {};

      if (req.query.protocol) {
        filter.protocol =
          req.query.protocol;
      }

      if (req.query.status) {
        filter.status =
          req.query.status;
      }

      if (req.query.sourceIP) {
        filter.sourceIP = {
          $regex: req.query.sourceIP,
          $options: "i",
        };
      }

      const traffic =
        await Traffic.find(filter)
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit);

      const total =
        await Traffic.countDocuments(
          filter
        );

      res.json({
        page,
        total,
        totalPages:
          Math.ceil(
            total / limit
          ),
        data: traffic,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// Get single record
export const getTrafficById =
  async (req, res) => {
    try {
      const traffic =
        await Traffic.findById(
          req.params.id
        );

      if (!traffic) {
        return res
          .status(404)
          .json({
            message:
              "Traffic not found",
          });
      }

      res.json(traffic);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// Update traffic
export const updateTraffic = async (req, res) => {
  try {
    const traffic = await Traffic.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!traffic) {
      return res.status(404).json({
        message: "Traffic not found",
      });
    }

    const io = getIO();

    io.emit("trafficUpdated", traffic);

    return res.json(traffic);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete traffic
export const deleteTraffic = async (req, res) => {
  try {
    const traffic = await Traffic.findByIdAndDelete(
      req.params.id
    );

    if (!traffic) {
      return res.status(404).json({
        message: "Traffic not found",
      });
    }

    const io = getIO();

    io.emit("trafficDeleted", req.params.id);

    return res.json({
      message: "Traffic deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};