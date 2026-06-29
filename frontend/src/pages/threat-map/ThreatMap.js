import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const ThreatMap = () => {
  const threats = [
    {
      id: 1,
      country: "United States",
      lat: 37.0902,
      lng: -95.7129,
      attacks: 145,
      severity: "High",
    },

    {
      id: 2,
      country: "China",
      lat: 35.8617,
      lng: 104.1954,
      attacks: 312,
      severity: "Critical",
    },

    {
      id: 3,
      country: "Germany",
      lat: 51.1657,
      lng: 10.4515,
      attacks: 74,
      severity: "Medium",
    },

    {
      id: 4,
      country: "Brazil",
      lat: -14.235,
      lng: -51.9253,
      attacks: 96,
      severity: "High",
    },
  ];

  const getColor = (
    severity
  ) => {
    switch (severity) {
      case "Critical":
        return "#dc2626";

      case "High":
        return "#ea580c";

      case "Medium":
        return "#ca8a04";

      default:
        return "#16a34a";
    }
  };

  return (
    <div>

      <div className="page-header">
        <div>
          <h1>
            Global Threat Map
          </h1>

          <p>
            Real-time cyber attack
            visualization
          </p>
        </div>
      </div>

      <div className="threat-stats">

        <div className="mini-card">
          <h3>
            Total Attacks
          </h3>

          <h2>627</h2>
        </div>

        <div className="mini-card">
          <h3>
            Countries
          </h3>

          <h2>42</h2>
        </div>

        <div className="mini-card">
          <h3>
            Critical Threats
          </h3>

          <h2>16</h2>
        </div>

        <div className="mini-card">
          <h3>
            Live Events
          </h3>

          <h2>89</h2>
        </div>

      </div>

      <div className="map-card">

        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={true}
          className="threat-map"
        >

          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {threats.map(
            (threat) => (
              <CircleMarker
                key={threat.id}
                center={[
                  threat.lat,
                  threat.lng,
                ]}
                radius={15}
                pathOptions={{
                  color:
                    getColor(
                      threat.severity
                    ),
                  fillColor:
                    getColor(
                      threat.severity
                    ),
                  fillOpacity: 0.8,
                }}
              >
                <Popup>

                  <h4>
                    {
                      threat.country
                    }
                  </h4>

                  <p>
                    Attacks:
                    {
                      threat.attacks
                    }
                  </p>

                  <p>
                    Severity:
                    {
                      threat.severity
                    }
                  </p>

                </Popup>
              </CircleMarker>
            )
          )}

        </MapContainer>

      </div>

    </div>
  );
};

export default ThreatMap;