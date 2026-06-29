import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Analytics from "./pages/analytics/Analytics";
import Monitoring from "./pages/monitoring/Monitoring";
import Alerts from "./pages/alerts/Alerts";
import Users from "./pages/users/Users";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/settings/Settings";
import ThreatMap from "./pages/threat-map/ThreatMap";
import Predictions from "./pages/predictions/Predictions";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/monitoring"
          element={
            <ProtectedRoute>
              <Monitoring />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alerts"
          element={<Alerts />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/threat-map"
          element={<ThreatMap />}
        />

        <Route
          path="/predictions"
          element={<Predictions />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;