import pandas as pd

df = pd.read_csv("fixed_campaigns.csv")

print("\n🔍 First 3 rows:")
print(df.head(3))

print("\n🧠 Column types:")
print(df.dtypes)

print("\n❌ NaN count per column:")
print(df.isna().sum())

print("\n🧪 Sample values from each required field:")
for col in ["Acquisition_Cost", "Impressions", "Clicks", "Conversion_Rate", "Duration"]:
    print(f"- {col}: {df[col].unique()[:5]}")
