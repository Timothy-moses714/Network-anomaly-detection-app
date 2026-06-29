from fastapi import FastAPI

from pydantic import BaseModel

import joblib

import pandas as pd

app = FastAPI()

model = joblib.load("model.pkl")

class Traffic(BaseModel):

    packets:int

    bytes:int

    duration:float

@app.post("/predict")

def predict(data:Traffic):

    sample = pd.DataFrame([{

        "packets":data.packets,

        "bytes":data.bytes,

        "duration":data.duration

    }])

    prediction = model.predict(sample)

    score = model.decision_function(sample)

    return {

        "prediction":"Normal" if prediction[0]==1 else "Anomaly",

        "score":float(score[0])

    }