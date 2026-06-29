import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Line,
  Pie,
  Bar,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const trafficData = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],

    datasets: [
      {
        label:
          "Network Traffic",

        data: [
          1500,
          2400,
          1800,
          3200,
          2800,
          4000,
          3500,
        ],

        borderColor:
          "#2563eb",

        backgroundColor:
          "#2563eb",

        tension: 0.4,
      },
    ],
  };

  const threatData = {
    labels: [
      "DDoS",
      "Port Scan",
      "Malware",
      "Brute Force",
    ],

    datasets: [
      {
        data: [
          30,
          20,
          25,
          25,
        ],

        backgroundColor: [
          "#dc2626",
          "#ea580c",
          "#2563eb",
          "#16a34a",
        ],
      },
    ],
  };

  const protocolData = {
    labels: [
      "TCP",
      "UDP",
      "ICMP",
      "HTTP",
    ],

    datasets: [
      {
        label:
          "Protocol Usage",

        data: [
          4500,
          3000,
          1000,
          5200,
        ],

        backgroundColor:
          "#2563eb",
      },
    ],
  };

  return (
    <div>

      <div className="analytics-header">
        <h1>
          Security Analytics
        </h1>

        <p>
          Network behavior
          insights and trends
        </p>
      </div>

      <div className="analytics-grid">

        <div className="chart-card">
          <h3>
            Traffic Trend
          </h3>

          <Line
            data={trafficData}
          />
        </div>

        <div className="chart-card">
          <h3>
            Threat
            Distribution
          </h3>

          <Pie
            data={threatData}
          />
        </div>

        <div className="chart-card full-width">
          <h3>
            Protocol Usage
          </h3>

          <Bar
            data={protocolData}
          />
        </div>

      </div>

      <div className="report-summary">

        <h3>
          Weekly Security
          Summary
        </h3>

        <ul>

          <li>
            Total Traffic:
            19,200 Packets
          </li>

          <li>
            Threats
            Detected: 42
          </li>

          <li>
            Critical Alerts:
            7
          </li>

          <li>
            Active Devices:
            356
          </li>

          <li>
            System Uptime:
            99.98%
          </li>

        </ul>

      </div>

    </div>
  );
};

export default Analytics;