import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>NetGuard</h2>

        <nav>
          <Link to="/dashboard">Home</Link>
          <Link to="/dashboard/analytics">Analytics</Link>
          <Link to="/dashboard/monitoring">Monitoring</Link>
          <Link to="/dashboard/alerts">Alerts</Link>
          <Link to="/dashboard/users">Users</Link>
          <Link to="/dashboard/reports">Reports</Link>
          <Link to="/dashboard/settings">Settings</Link>
          <Link to="/dashboard/threat-map">Threat Map</Link>
          <Link to="/dashboard/predictions">Predictions</Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;