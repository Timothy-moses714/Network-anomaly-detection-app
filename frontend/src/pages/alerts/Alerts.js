import { useMemo, useState } from "react";
import {
  FaEye,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

const Alerts = () => {
  const [search, setSearch] =
    useState("");

  const [severity, setSeverity] =
    useState("all");

  const [selectedAlert, setSelectedAlert] =
    useState(null);

  const [alerts, setAlerts] =
    useState([
      {
        id: 1,
        title:
          "DDoS Attack Detected",
        sourceIP:
          "192.168.1.12",
        severity:
          "Critical",
        status: "Open",
        date:
          "2026-06-24",
        description:
          "Unusual traffic spike detected from multiple sources.",
      },

      {
        id: 2,
        title:
          "Port Scan Attempt",
        sourceIP:
          "10.0.0.5",
        severity: "High",
        status: "Open",
        date:
          "2026-06-24",
        description:
          "Repeated port scanning activity detected.",
      },

      {
        id: 3,
        title:
          "Suspicious Login",
        sourceIP:
          "172.16.0.25",
        severity:
          "Medium",
        status:
          "Resolved",
        date:
          "2026-06-23",
        description:
          "Login from an unusual location.",
      },
    ]);

  const filteredAlerts =
    useMemo(() => {
      return alerts.filter(
        (alert) => {
          const matchesSearch =
            alert.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            alert.sourceIP
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesSeverity =
            severity === "all"
              ? true
              : alert.severity ===
                severity;

          return (
            matchesSearch &&
            matchesSeverity
          );
        }
      );
    }, [
      alerts,
      search,
      severity,
    ]);

  const resolveAlert = (id) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status:
                "Resolved",
            }
          : alert
      )
    );
  };

  const deleteAlert = (id) => {
    setAlerts((prev) =>
      prev.filter(
        (alert) =>
          alert.id !== id
      )
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>
            Alert Management
          </h1>
          <p>
            Monitor and manage
            security incidents
          </p>
        </div>

        <div className="filter-group">
          <input
            type="text"
            placeholder="Search alerts..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="search-input"
          />

          <select
            value={severity}
            onChange={(e) =>
              setSeverity(
                e.target.value
              )
            }
            className="protocol-filter"
          >
            <option value="all">
              All Severity
            </option>

            <option value="Critical">
              Critical
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="traffic-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Source IP</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Date</th>
              <th>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredAlerts.map(
              (alert) => (
                <tr
                  key={alert.id}
                >
                  <td>
                    {
                      alert.title
                    }
                  </td>

                  <td>
                    {
                      alert.sourceIP
                    }
                  </td>

                  <td>
                    <span
                      className={`severity-badge severity-${alert.severity.toLowerCase()}`}
                    >
                      {
                        alert.severity
                      }
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        alert.status ===
                        "Resolved"
                          ? "badge-success"
                          : "badge-danger"
                      }
                    >
                      {
                        alert.status
                      }
                    </span>
                  </td>

                  <td>
                    {
                      alert.date
                    }
                  </td>

                  <td>
                    <div className="action-buttons">

                      <button
                        className="view-btn"
                        onClick={() =>
                          setSelectedAlert(
                            alert
                          )
                        }
                      >
                        <FaEye />
                      </button>

                      <button
                        className="resolve-btn"
                        onClick={() =>
                          resolveAlert(
                            alert.id
                          )
                        }
                      >
                        <FaCheckCircle />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteAlert(
                            alert.id
                          )
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {selectedAlert && (
        <div className="modal-overlay">
          <div className="alert-modal">

            <div className="modal-header">
              <h2>
                Alert Details
              </h2>

              <button
                onClick={() =>
                  setSelectedAlert(
                    null
                  )
                }
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <p>
                <strong>
                  Title:
                </strong>{" "}
                {
                  selectedAlert.title
                }
              </p>

              <p>
                <strong>
                  Source IP:
                </strong>{" "}
                {
                  selectedAlert.sourceIP
                }
              </p>

              <p>
                <strong>
                  Severity:
                </strong>{" "}
                {
                  selectedAlert.severity
                }
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {
                  selectedAlert.status
                }
              </p>

              <p>
                <strong>
                  Description:
                </strong>{" "}
                {
                  selectedAlert.description
                }
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;