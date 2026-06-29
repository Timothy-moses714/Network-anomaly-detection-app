import mongoose from "mongoose";

const trafficSchema = new mongoose.Schema(
  {
    sourceIP: {
      type: String,
      required: true,
    },

    destinationIP: {
      type: String,
      required: true,
    },

    sourcePort: {
      type: Number,
      required: true,
    },

    destinationPort: {
      type: Number,
      required: true,
    },

    protocol: {
      type: String,
      enum: [
        "TCP",
        "UDP",
        "ICMP",
        "HTTP",
        "HTTPS",
      ],
      required: true,
    },

    packets: {
      type: Number,
      required: true,
    },

    bytes: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    anomalyScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Normal",
        "Suspicious",
        "Anomaly",
      ],
      default: "Normal",
    },

    country: {
      type: String,
      default: "Unknown",
    },

    city: {
      type: String,
      default: "Unknown",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Traffic",
  trafficSchema
);