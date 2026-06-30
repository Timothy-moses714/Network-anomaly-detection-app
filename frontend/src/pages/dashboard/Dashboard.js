import {
  FaShieldAlt,
  FaUsers,
  FaBell,
  FaNetworkWired,
} from "react-icons/fa";

import StatCard from "../../components/StatCard";
import RecentAlerts from "../../components/RecentAlerts";

const Dashboard = () => {
  return (
    <div className="dashboard-home">

      <div className="stats-grid">

        <StatCard title="Threats Detected" value="145" icon={<FaShieldAlt />} />
        <StatCard title="Active Devices" value="356" icon={<FaNetworkWired />} />
        <StatCard title="System Users" value="42" icon={<FaUsers />} />
        <StatCard title="Open Alerts" value="18" icon={<FaBell />} />

      </div>

      <div className="dashboard-grid">

        <RecentAlerts />

        <div className="widget-card">
          <h3>System Status</h3>
          <p>Network Health: Excellent</p>
          <p>Uptime: 99.98%</p>
          <p>Last Scan: 2 minutes ago</p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;