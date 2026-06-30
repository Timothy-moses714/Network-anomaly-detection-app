import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">

      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="dashboard-main">
        <Navbar />

        <div className="page-content">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;