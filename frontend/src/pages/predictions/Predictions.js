import { useState } from "react";

const Predictions = () => {
  const [prediction] =
    useState({
      attackProbability:
        "87%",
      threatLevel:
        "High",
      recommendation:
        "Increase firewall monitoring and block suspicious IPs.",
    });

  return (
    <div>

      <div className="page-header">
        <div>
          <h1>
             Threat Prediction
          </h1>

          <p>
            Machine learning
            threat forecasting
          </p>
        </div>
      </div>

      <div className="prediction-grid">

        <div className="prediction-card">

          <h3>
            Attack Probability
          </h3>

          <h1>
            {
              prediction.attackProbability
            }
          </h1>

        </div>

        <div className="prediction-card">

          <h3>
            Threat Level
          </h3>

          <h1>
            {
              prediction.threatLevel
            }
          </h1>

        </div>

      </div>

      <div className="prediction-details">

        <h3>
           Recommendation
        </h3>

        <p>
          {
            prediction.recommendation
          }
        </p>

      </div>

    </div>
  );
};

export default Predictions;