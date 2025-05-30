import pandas as pd

# Load original full dataset
df = pd.read_csv("../data/marketing_campaign_dataset.csv")

# Keep only the required columns
df_fixed = df[["Acquisition_Cost", "Impressions", "Clicks", "Conversion_Rate", "Duration"]]

# Save to the correct backend folder
df_fixed.to_csv("fixed_campaigns.csv", index=False)

print("✅ fixed_campaigns.csv created successfully.")
