import pandas as pd

from sklearn.ensemble import IsolationForest

import joblib

# Sample dataset
df = pd.DataFrame({
    "packets":[120,300,500,900,1500,80],
    "bytes":[4000,6000,10000,30000,80000,2000],
    "duration":[2,3,5,10,20,1]
})

model = IsolationForest(
    contamination=0.1,
    random_state=42
)

model.fit(df)

joblib.dump(model,"model.pkl")

print("Model trained successfully.")