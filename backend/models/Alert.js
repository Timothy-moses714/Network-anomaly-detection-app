import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    sourceIP: {
      type: String,
      required: true,
    },

    destinationIP: {
      type: String,
      required: true,
    },

    protocol: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Critical",
      ],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Open",
        "Acknowledged",
        "Resolved",
      ],
      default: "Open",
    },

    anomalyScore: {
      type: Number,
      default: 0,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    resolvedAt: Date,

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Alert",
  alertSchema
);