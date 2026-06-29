const RecentAlerts = () => {
  const alerts = [
    {
      id: 1,
      title:
        "DDoS Attack Detected",
      severity:
        "Critical",
    },
    {
      id: 2,
      title: "Port Scan",
      severity: "Medium",
    },
    {
      id: 3,
      title:
        "Suspicious Login",
      severity: "High",
    },
  ];

  return (
    <div className="widget-card">
      <h3>
        Recent Alerts
      </h3>

      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="alert-item"
        >
          <span>
            {alert.title}
          </span>

          <span
            className={`severity ${alert.severity.toLowerCase()}`}
          >
            {alert.severity}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RecentAlerts;