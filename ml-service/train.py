import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib

# Load the actual training data from CSV
df = pd.read_csv("sample_data.csv")

print(f"Loaded {len(df)} rows from sample_data.csv")
print(df.describe())

# Fit a scaler so predictions use the same scale as training
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df)

# Tune contamination to match the proportion of anomalies in the data
# The CSV has 20 rows; rows with packets > 500 or bytes > 50000 are clear outliers (~5 rows = 25%)
contamination = 0.25

model = IsolationForest(
    contamination=contamination,
    n_estimators=200,
    random_state=42
)
model.fit(X_scaled)

# Save both model and scaler — app.py needs both
joblib.dump(model, "model.pkl")
joblib.dump(scaler, "scaler.pkl")

# Quick validation on training data
predictions = model.predict(X_scaled)
scores = model.decision_function(X_scaled)
normal_count = (predictions == 1).sum()
anomaly_count = (predictions == -1).sum()

print(f"\nTraining complete.")
print(f"  Normal samples : {normal_count}")
print(f"  Anomaly samples: {anomaly_count}")
print(f"  Contamination  : {contamination}")
print(f"\nSample predictions:")
for i, row in df.iterrows():
    label = "Normal" if predictions[i] == 1 else "Anomaly"
    print(f"  packets={row['packets']:5}, bytes={row['bytes']:7}, duration={row['duration']:4} -> {label} (score={scores[i]:.4f})")
