from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import numpy as np

app = FastAPI(
    title="NetGuard ML Service",
    description="Network anomaly detection using Isolation Forest",
    version="1.0.0"
)

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load both artifacts at startup — fails loudly if either is missing or empty
try:
    model = joblib.load("model.pkl")
    scaler = joblib.load("scaler.pkl")
except Exception as e:
    raise RuntimeError(
        f"Failed to load model/scaler: {e}. "
        "Run train.py first to generate model.pkl and scaler.pkl."
    )


class TrafficInput(BaseModel):
    packets: int = Field(..., gt=0, description="Number of packets")
    bytes_transferred: int = Field(..., gt=0, description="Number of bytes transferred")
    duration: float = Field(..., gt=0, description="Duration in seconds")


class PredictionOutput(BaseModel):
    prediction: str
    score: float
    confidence: str


@app.get("/")
def root():
    return {"status": "running", "service": "NetGuard ML Service"}


@app.get("/health")
def health():
    return {"status": "healthy", "model_loaded": model is not None}


@app.post("/predict", response_model=PredictionOutput)
def predict(data: TrafficInput):
    try:
        # Build DataFrame with the same column names used during training
        sample = pd.DataFrame([{
            "packets": data.packets,
            "bytes": data.bytes_transferred,
            "duration": data.duration,
        }])

        # Scale the input the same way the training data was scaled
        sample_scaled = scaler.transform(sample)

        prediction = model.predict(sample_scaled)
        score = model.decision_function(sample_scaled)

        raw_score = float(score[0])
        label = "Normal" if prediction[0] == 1 else "Anomaly"

        # Map score to a human-readable confidence level
        if raw_score > 0.05:
            confidence = "High"
        elif raw_score > 0:
            confidence = "Medium"
        elif raw_score > -0.05:
            confidence = "Low"
        else:
            confidence = "High"   # strongly anomalous

        return PredictionOutput(
            prediction=label,
            score=round(raw_score, 6),
            confidence=confidence,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.post("/predict/batch")
def predict_batch(samples: list[TrafficInput]):
    if not samples:
        raise HTTPException(status_code=400, detail="No samples provided")
    if len(samples) > 1000:
        raise HTTPException(status_code=400, detail="Max 1000 samples per batch")

    try:
        df = pd.DataFrame([{
            "packets": s.packets,
            "bytes": s.bytes_transferred,
            "duration": s.duration,
        } for s in samples])

        scaled = scaler.transform(df)
        predictions = model.predict(scaled)
        scores = model.decision_function(scaled)

        return {
            "results": [
                {
                    "index": i,
                    "prediction": "Normal" if pred == 1 else "Anomaly",
                    "score": round(float(sc), 6),
                }
                for i, (pred, sc) in enumerate(zip(predictions, scores))
            ],
            "total": len(samples),
            "anomalies": int((predictions == -1).sum()),
            "normals": int((predictions == 1).sum()),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch prediction failed: {str(e)}")
