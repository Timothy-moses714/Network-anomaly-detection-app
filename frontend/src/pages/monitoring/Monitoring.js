import { useMemo, useState } from "react";

const Monitoring = () => {
  const [search, setSearch] =
    useState("");

  const [protocol, setProtocol] =
    useState("all");

  const [trafficData] = useState([
    {
      id: 1,
      sourceIP: "192.168.1.10",
      destinationIP: "8.8.8.8",
      protocol: "TCP",
      packets: 1200,
      status: "Normal",
    },

    {
      id: 2,
      sourceIP: "172.16.0.5",
      destinationIP: "10.0.0.2",
      protocol: "UDP",
      packets: 5500,
      status: "Anomaly",
    },

    {
      id: 3,
      sourceIP: "192.168.1.50",
      destinationIP: "8.8.4.4",
      protocol: "ICMP",
      packets: 750,
      status: "Normal",
    },

    {
      id: 4,
      sourceIP: "10.10.10.10",
      destinationIP: "192.168.0.100",
      protocol: "TCP",
      packets: 9200,
      status: "Anomaly",
    },
  ]);

  const filteredTraffic =
    useMemo(() => {
      return trafficData.filter(
        (item) => {
          const matchesSearch =
            item.sourceIP
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            item.destinationIP
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesProtocol =
            protocol === "all"
              ? true
              : item.protocol ===
                protocol;

          return (
            matchesSearch &&
            matchesProtocol
          );
        }
      );
    }, [
      search,
      protocol,
      trafficData,
    ]);

  return (
    <div>

      <div className="page-header">
        <div>
          <h1>
            Network Monitoring
          </h1>

          <p>
            Real-time traffic
            analysis
          </p>
        </div>

        <div className="filter-group">

          <input
            type="text"
            placeholder="Search IP..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="search-input"
          />

          <select
            value={protocol}
            onChange={(e) =>
              setProtocol(
                e.target.value
              )
            }
            className="protocol-filter"
          >
            <option value="all">
              All Protocols
            </option>

            <option value="TCP">
              TCP
            </option>

            <option value="UDP">
              UDP
            </option>

            <option value="ICMP">
              ICMP
            </option>

          </select>

        </div>
      </div>

      <div className="monitor-stats">

        <div className="mini-card">
          <h3>
            Total Traffic
          </h3>

          <h2>16,650</h2>
        </div>

        <div className="mini-card">
          <h3>
            Active Devices
          </h3>

          <h2>356</h2>
        </div>

        <div className="mini-card">
          <h3>
            Anomalies
          </h3>

          <h2>2</h2>
        </div>

        <div className="mini-card">
          <h3>
            Protocols
          </h3>

          <h2>3</h2>
        </div>

      </div>

      <div className="table-container">

        <table className="traffic-table">

          <thead>
            <tr>
              <th>
                Source IP
              </th>

              <th>
                Destination IP
              </th>

              <th>
                Protocol
              </th>

              <th>
                Packets
              </th>

              <th>
                Status
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredTraffic.map(
              (traffic) => (
                <tr
                  key={
                    traffic.id
                  }
                >
                  <td>
                    {
                      traffic.sourceIP
                    }
                  </td>

                  <td>
                    {
                      traffic.destinationIP
                    }
                  </td>

                  <td>
                    {
                      traffic.protocol
                    }
                  </td>

                  <td>
                    {
                      traffic.packets
                    }
                  </td>

                  <td>

                    <span
                      className={
                        traffic.status ===
                        "Anomaly"
                          ? "badge-danger"
                          : "badge-success"
                      }
                    >
                      {
                        traffic.status
                      }
                    </span>

                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Monitoring;