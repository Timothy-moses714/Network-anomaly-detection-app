import Traffic from "../models/Traffic.js";
import Alert from "../models/Alert.js";
import { getIO } from "../config/socket.js";
import { predictTraffic } from "../services/aiService.js";

// Create traffic record
export const createTraffic = async (req, res) => {
  try {
    // Predict using ML service
    const prediction = await predictTraffic(req.body);

    req.body.status = prediction.prediction;
    req.body.anomalyScore = prediction.score;

    // Save traffic
    const traffic = await Traffic.create(req.body);

    // Create alert if anomaly detected
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

    return res.status(201).json({
      success: true,
      data: traffic,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all traffic
export const getTraffic = async (req, res) => {
  try {
    const traffic = await Traffic.find().sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      count: traffic.length,
      data: traffic,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single traffic
export const getTrafficById = async (req, res) => {
  try {
    const traffic = await Traffic.findById(req.params.id);

    if (!traffic) {
      return res.status(404).json({
        success: false,
        message: "Traffic not found",
      });
    }

    return res.json({
      success: true,
      data: traffic,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
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
        success: false,
        message: "Traffic not found",
      });
    }

    getIO().emit("trafficUpdated", traffic);

    return res.json({
      success: true,
      data: traffic,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
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
        success: false,
        message: "Traffic not found",
      });
    }

    getIO().emit("trafficDeleted", req.params.id);

    return res.json({
      success: true,
      message: "Traffic deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};