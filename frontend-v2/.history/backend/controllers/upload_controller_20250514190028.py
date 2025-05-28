# backend/controllers/upload_controller.py

import pandas as pd
from backend.utils.db import get_db

def process_upload(file):
    df = pd.read_csv(file)
    df.columns = df.columns.str.strip()  # Strip extra spaces

    # Basic preprocessing
    df.dropna(inplace=True)
    df['Acquisition_Cost'] = df['Acquisition_Cost'].replace(r'[\$,]', '', regex=True).astype(float)

    # Derived features
    df['Cost_Per_Click'] = df['Acquisition_Cost'] / df['Clicks'].replace(0, 1)
    df['Impressions_Per_Day'] = df['Impressions'] / df['Duration'].replace(0, 1)

    # Store in MongoDB
    db = get_db()
    db.clean_campaigns.insert_many(df.to_dict(orient='records'))

    return {"message": "File uploaded and processed successfully"}
