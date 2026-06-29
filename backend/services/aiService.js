import axios from "axios";

const ML_API =
  "http://127.0.0.1:8000/predict";

export const predictTraffic =
  async (traffic) => {
    const response =
      await axios.post(
        ML_API,
        {
          packets: traffic.packets,
          bytes: traffic.bytes,
          duration: traffic.duration,
        }
      );

    return response.data;
  };