import { NavLink } from "react-router-dom";
import {
  FaChartLine,
} from "react-icons/fa";

import { FaGlobe } from "react-icons/fa";
import {
  FaBrain,
} from "react-icons/fa";
import {
  FaChartPie,
  FaNetworkWired,
  FaBell,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Monitoring",
      path: "/dashboard/monitoring",
      icon: <FaNetworkWired />,
    },
    {
      name: "Alerts",
      path: "/dashboard/alerts",
      icon: <FaBell />,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      name: "Reports",
      path: "/dashboard/reports",
      icon: <FaFileAlt />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <FaCog />,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: <FaChartLine />,
    },
    {
      name: "Threat Map",
      path: "/dashboard/threat-map",
      icon: <FaGlobe />,
    },
    {
      name: "Predictions",
      path: "/dashboard/predictions",
      icon: <FaBrain />,
    }
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="logo">
          NetGuard AI
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(
            (item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className="nav-link"
              >
                {item.icon}
                <span>
                  {item.name}
                </span>
              </NavLink>
            )
          )}
        </nav>
      </div>

      <button
        className="logout-btn"
        onClick={logout}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;