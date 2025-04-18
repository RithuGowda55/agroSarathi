import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset
df1 = pd.read_csv('./price.csv')

# Drop rows with missing values in target columns
df1 = df1.dropna(subset=['Min_x0020_Price', 'Max_x0020_Price', 'Modal_x0020_Price'])

# Preprocess data
X = df1[['State', 'District', 'Market', 'Commodity', 'Variety', 'Grade']]
y = df1[['Min_x0020_Price', 'Max_x0020_Price', 'Modal_x0020_Price']]

# One-hot encode categorical features
X_encoded = pd.get_dummies(X, columns=['State', 'District', 'Market', 'Commodity', 'Variety', 'Grade'])

# Standardize the features only
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_encoded)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluate metrics
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"R² Score: {r2:.2f}")
print(f"MAE: {mae:.2f}")
print(f"MSE: {mse:.2f}")

# --------------------- PLOTS ----------------------

# 1. Actual vs Predicted (For Modal Price)
plt.figure(figsize=(6, 6))
plt.scatter(y_test['Modal_x0020_Price'], y_pred[:, 2], color='blue', alpha=0.5)
plt.plot([y_test['Modal_x0020_Price'].min(), y_test['Modal_x0020_Price'].max()],
         [y_test['Modal_x0020_Price'].min(), y_test['Modal_x0020_Price'].max()], 'r--')
plt.xlabel('Actual Modal Price')
plt.ylabel('Predicted Modal Price')
plt.title('Actual vs Predicted (Modal Price)')
plt.tight_layout()
plt.savefig('actual_vs_predicted.png')
plt.close()

# 2. Residuals Plot (For Modal Price)
residuals = y_test['Modal_x0020_Price'] - y_pred[:, 2]
plt.figure(figsize=(6, 4))
sns.histplot(residuals, kde=True)
plt.xlabel('Residuals')
plt.title('Residuals Distribution (Modal Price)')
plt.tight_layout()
plt.savefig('residuals_histogram.png')
plt.close()

# 3. Feature Importance
importances = model.feature_importances_
feature_names = X_encoded.columns

feat_imp_df = pd.Series(importances, index=feature_names).sort_values(ascending=True)

plt.figure(figsize=(8, 10))
feat_imp_df.tail(20).plot(kind='barh', color='teal')  # Top 20
plt.title('Top 20 Feature Importances')
plt.xlabel('Importance Score')
plt.tight_layout()
plt.savefig('feature_importance.png')
plt.close()

# --------------------- SAVE MODELS ----------------------
joblib.dump(model, 'price_predicted.pkl')
joblib.dump(scaler, 'scaler_price.pkl')
joblib.dump(X_encoded.columns, 'price_model_columns.pkl')

print("Graphs saved as: 'actual_vs_predicted.png', 'residuals_histogram.png', 'feature_importance.png'")
