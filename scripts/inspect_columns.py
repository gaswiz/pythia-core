import pandas as pd

# Load the dataset
df = pd.read_csv("data/marketing_campaign_dataset.csv")

# Print the actual column names
print("Detected column names:")
print(df.columns.tolist())
