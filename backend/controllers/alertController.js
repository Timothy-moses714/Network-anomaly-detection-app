import Alert from "../models/Alert.js";
import { getIO } from "../config/socket.js";

// Create Alert
export const createAlert = async (
  req,
  res
) => {
  try {
    const alert =
      await Alert.create(req.body);

    getIO().emit(
      "alertCreated",
      alert
    );

    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Alerts
export const getAlerts = async (
  req,
  res
) => {
  try {
    const alerts =
      await Alert.find()
        .populate(
          "assignedTo",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    res.json(alerts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Alert By ID
export const getAlert = async (
  req,
  res
) => {
  try {
    const alert =
      await Alert.findById(
        req.params.id
      ).populate(
        "assignedTo",
        "name email"
      );

    if (!alert) {
      return res.status(404).json({
        message: "Alert not found",
      });
    }

    res.json(alert);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Alert
export const updateAlert = async (
  req,
  res
) => {
  try {
    const alert =
      await Alert.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!alert) {
      return res.status(404).json({
        message: "Alert not found",
      });
    }

    getIO().emit(
      "alertUpdated",
      alert
    );

    res.json(alert);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Alert
export const deleteAlert =
  async (req, res) => {
    try {
      const alert =
        await Alert.findByIdAndDelete(
          req.params.id
        );

      if (!alert) {
        return res.status(404).json({
          message:
            "Alert not found",
        });
      }

      getIO().emit(
        "alertDeleted",
        req.params.id
      );

      res.json({
        message:
          "Alert deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };