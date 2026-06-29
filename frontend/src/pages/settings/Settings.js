import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaBell,
  FaShieldAlt,
  FaSave,
} from "react-icons/fa";

const Settings = () => {
  const [profile, setProfile] =
    useState({
      name: "Administrator",
      email: "admin@netguard.com",
    });

  const [password, setPassword] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [notifications, setNotifications] =
    useState({
      email: true,
      sms: false,
      push: true,
    });

  const [security, setSecurity] =
    useState({
      twoFactor: true,
      autoLogout: true,
    });

  const [darkMode, setDarkMode] =
    useState(false);

  const saveSettings = () => {
    alert("Settings Saved Successfully");
  };

  return (
    <div>

      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>
            Manage your profile and
            system preferences
          </p>
        </div>
      </div>

      <div className="settings-grid">

        {/* Profile */}

        <div className="settings-card">

          <div className="settings-title">
            <FaUser />
            <h3>
              Profile Settings
            </h3>
          </div>

          <div className="form-group">
            <label>
              Full Name
            </label>

            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email:
                    e.target.value,
                })
              }
            />
          </div>

        </div>

        {/* Password */}

        <div className="settings-card">

          <div className="settings-title">
            <FaLock />
            <h3>
              Change Password
            </h3>
          </div>

          <div className="form-group">
            <label>
              Current Password
            </label>

            <input
              type="password"
              value={
                password.currentPassword
              }
              onChange={(e) =>
                setPassword({
                  ...password,
                  currentPassword:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>
              New Password
            </label>

            <input
              type="password"
              value={
                password.newPassword
              }
              onChange={(e) =>
                setPassword({
                  ...password,
                  newPassword:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Confirm Password
            </label>

            <input
              type="password"
              value={
                password.confirmPassword
              }
              onChange={(e) =>
                setPassword({
                  ...password,
                  confirmPassword:
                    e.target.value,
                })
              }
            />
          </div>

        </div>

        {/* Notifications */}

        <div className="settings-card">

          <div className="settings-title">
            <FaBell />
            <h3>
              Notifications
            </h3>
          </div>

          <div className="toggle-row">

            <span>
              Email Alerts
            </span>

            <input
              type="checkbox"
              checked={
                notifications.email
              }
              onChange={() =>
                setNotifications({
                  ...notifications,
                  email:
                    !notifications.email,
                })
              }
            />

          </div>

          <div className="toggle-row">

            <span>
              SMS Alerts
            </span>

            <input
              type="checkbox"
              checked={
                notifications.sms
              }
              onChange={() =>
                setNotifications({
                  ...notifications,
                  sms:
                    !notifications.sms,
                })
              }
            />

          </div>

          <div className="toggle-row">

            <span>
              Push Notifications
            </span>

            <input
              type="checkbox"
              checked={
                notifications.push
              }
              onChange={() =>
                setNotifications({
                  ...notifications,
                  push:
                    !notifications.push,
                })
              }
            />

          </div>

        </div>

        {/* Security */}

        <div className="settings-card">

          <div className="settings-title">
            <FaShieldAlt />
            <h3>
              Security
            </h3>
          </div>

          <div className="toggle-row">

            <span>
              Two Factor Authentication
            </span>

            <input
              type="checkbox"
              checked={
                security.twoFactor
              }
              onChange={() =>
                setSecurity({
                  ...security,
                  twoFactor:
                    !security.twoFactor,
                })
              }
            />

          </div>

          <div className="toggle-row">

            <span>
              Auto Logout
            </span>

            <input
              type="checkbox"
              checked={
                security.autoLogout
              }
              onChange={() =>
                setSecurity({
                  ...security,
                  autoLogout:
                    !security.autoLogout,
                })
              }
            />

          </div>

          <div className="toggle-row">

            <span>
              Dark Mode
            </span>

            <input
              type="checkbox"
              checked={darkMode}
              onChange={() =>
                setDarkMode(
                  !darkMode
                )
              }
            />

          </div>

        </div>

      </div>

      <button
        className="save-settings-btn"
        onClick={saveSettings}
      >
        <FaSave />
        Save Changes
      </button>

    </div>
  );
};

export default Settings;