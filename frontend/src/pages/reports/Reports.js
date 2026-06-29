import { useState } from "react";
import {
  FaFilePdf,
  FaFileCsv,
  FaDownload,
  FaCalendarAlt,
} from "react-icons/fa";

const Reports = () => {
  const [reportType, setReportType] =
    useState("Security Report");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [reportHistory] = useState([
    {
      id: 1,
      name: "Weekly Security Report",
      type: "PDF",
      date: "2026-06-20",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Network Traffic Report",
      type: "CSV",
      date: "2026-06-18",
      size: "1.1 MB",
    },
    {
      id: 3,
      name: "Threat Analysis Report",
      type: "PDF",
      date: "2026-06-15",
      size: "3.2 MB",
    },
  ]);

  const generateReport = () => {
    alert(
      `${reportType} generated successfully`
    );
  };

  const downloadReport = (name) => {
    alert(`Downloading ${name}`);
  };

  return (
    <div>

      <div className="page-header">
        <div>
          <h1>
            Reports Center
          </h1>

          <p>
            Generate and export
            security reports
          </p>
        </div>
      </div>

      <div className="reports-grid">

        <div className="report-card">

          <h3>
            Generate Report
          </h3>

          <div className="form-group">
            <label>
              Report Type
            </label>

            <select
              value={reportType}
              onChange={(e) =>
                setReportType(
                  e.target.value
                )
              }
            >
              <option>
                Security Report
              </option>

              <option>
                Traffic Report
              </option>

              <option>
                Threat Report
              </option>

              <option>
                User Activity Report
              </option>
            </select>
          </div>

          <div className="date-grid">

            <div className="form-group">
              <label>
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
              />
            </div>

          </div>

          <button
            className="generate-btn"
            onClick={generateReport}
          >
            <FaCalendarAlt />
            Generate Report
          </button>

        </div>

        <div className="report-card">

          <h3>
            Quick Statistics
          </h3>

          <div className="report-stat">
            <span>
              Total Reports
            </span>
            <strong>128</strong>
          </div>

          <div className="report-stat">
            <span>
              Threat Reports
            </span>
            <strong>42</strong>
          </div>

          <div className="report-stat">
            <span>
              Security Reports
            </span>
            <strong>56</strong>
          </div>

          <div className="report-stat">
            <span>
              Traffic Reports
            </span>
            <strong>30</strong>
          </div>

        </div>

      </div>

      <div className="report-summary-card">

        <h3>
          Current Threat Summary
        </h3>

        <div className="summary-grid">

          <div className="summary-item">
            <h2>145</h2>
            <p>
              Threats Detected
            </p>
          </div>

          <div className="summary-item">
            <h2>18</h2>
            <p>
              Active Alerts
            </p>
          </div>

          <div className="summary-item">
            <h2>356</h2>
            <p>
              Devices Monitored
            </p>
          </div>

          <div className="summary-item">
            <h2>99.98%</h2>
            <p>
              System Uptime
            </p>
          </div>

        </div>

      </div>

      <div className="report-history-card">

        <h3>
          Report History
        </h3>

        <div className="table-container">

          <table className="traffic-table">

            <thead>
              <tr>
                <th>
                  Report Name
                </th>
                <th>
                  Type
                </th>
                <th>
                  Date
                </th>
                <th>
                  Size
                </th>
                <th>
                  Download
                </th>
              </tr>
            </thead>

            <tbody>

              {reportHistory.map(
                (report) => (
                  <tr
                    key={
                      report.id
                    }
                  >
                    <td>
                      {
                        report.name
                      }
                    </td>

                    <td>
                      <span
                        className={
                          report.type ===
                          "PDF"
                            ? "pdf-badge"
                            : "csv-badge"
                        }
                      >
                        {
                          report.type
                        }
                      </span>
                    </td>

                    <td>
                      {
                        report.date
                      }
                    </td>

                    <td>
                      {
                        report.size
                      }
                    </td>

                    <td>

                      <button
                        className="download-btn"
                        onClick={() =>
                          downloadReport(
                            report.name
                          )
                        }
                      >
                        <FaDownload />
                      </button>

                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      <div className="export-actions">

        <button className="pdf-btn">
          <FaFilePdf />
          Export PDF
        </button>

        <button className="csv-btn">
          <FaFileCsv />
          Export CSV
        </button>

      </div>

    </div>
  );
};

export default Reports;