from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, classification_report, roc_curve, auc
import joblib
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df2 = pd.read_csv('../../data/irrigationdata.csv')

# Define all possible categories for 'CropType'
all_crop_types = ['coffee', 'garden flowers', 'maize', 'groundnuts', 'paddy', 'potato','pulse','sugarcane','wheat']

# Prepare inputs
X = df2[['CropType', 'CropDays', 'SoilMoisture', 'temperature', 'Humidity']]
y = df2['Irrigation']  # Binary target

# One-hot encode CropType
X_encoded = pd.get_dummies(X, columns=['CropType'])
for crop in all_crop_types:
    if f'CropType_{crop}' not in X_encoded.columns:
        X_encoded[f'CropType_{crop}'] = 0

# Scale the data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_encoded)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression(max_iter=500, random_state=42)
model.fit(X_train, y_train)

# Evaluate model
accuracy = model.score(X_test, y_test)
print(f"Accuracy: {accuracy:.2f}")

# ---------------------- PLOTS -----------------------

# Predict probabilities for ROC
y_pred_proba = model.predict_proba(X_test)[:, 1]
y_pred = model.predict(X_test)

# 1. Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(5, 4))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.tight_layout()
plt.savefig('confusion_matrix_irrigation.png')
plt.close()

# 2. ROC Curve & AUC
fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
roc_auc = auc(fpr, tpr)

plt.figure(figsize=(5, 4))
plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC curve (AUC = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve')
plt.legend(loc="lower right")
plt.tight_layout()
plt.savefig('roc_curve_irrigation.png')
plt.close()

# 3. Classification Report
report = classification_report(y_test, y_pred)
print("Classification Report:\n", report)

# ---------------------- SAVE -----------------------
joblib.dump(model, 'irrigation_logistic_model.joblib')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(X_encoded.columns.tolist(), 'model_columns_irrigation.pkl')

print("Saved plots: 'confusion_matrix_irrigation.png' & 'roc_curve_irrigation.png'")

# 4. Feature Importance (Logistic Regression Coefficients)

# Get feature names & coefficients
feature_names = X_encoded.columns.tolist()
coefficients = model.coef_[0]

# Create DataFrame for easy plotting
coef_df = pd.DataFrame({
    'Feature': feature_names,
    'Coefficient': coefficients
}).sort_values(by='Coefficient', key=abs, ascending=False)  # Sort by absolute value

plt.figure(figsize=(8, 5))
sns.barplot(x='Coefficient', y='Feature', data=coef_df, palette='viridis')
plt.title('Feature Importance (Logistic Regression Coefficients)')
plt.tight_layout()
plt.savefig('feature_importance_irrigation.png')
plt.close()

print("Feature importance plot saved as 'feature_importance_irrigation.png'")
