# models.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report

def train_model():
    # Load the dataset
    data = pd.read_csv('../../data/Fertilizer Prediction.csv')

    # Define features (X) and target (y)
    X = data[['Temparature', 'Moisture', 'Soil Type', 'Crop Type', 'Nitrogen', 'Potassium', 'Phosphorous']]
    y = data['Fertilizer Name']
    
    # Convert categorical variables into dummy/one-hot encoded variables
    X = pd.get_dummies(X, drop_first=True)  # This will automatically convert 'Soil Type' and 'Crop Type'
    
    # Split the data into training and testing sets (80% train, 20% test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize the Random Forest model
    model = RandomForestClassifier(n_estimators=100, random_state=42)

    # Train the model
    model.fit(X_train, y_train)

    # Save the trained model to a file
    joblib.dump(model, 'fertilizer_model.pkl')

    # Print accuracy on the test set
    accuracy = model.score(X_test, y_test)
    print(f"Model trained with accuracy: {accuracy:.2f}")

    # ================== GRAPH SECTION =================== #

    # Predictions
    y_pred = model.predict(X_test)

    # Confusion Matrix
    cm = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=model.classes_, yticklabels=model.classes_)
    plt.title('Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.tight_layout()
    plt.savefig('fertilizer_confusion_matrix.png')
    plt.close()

    # Feature Importance
    importances = model.feature_importances_
    feature_names = X.columns
    feat_df = pd.DataFrame({'Feature': feature_names, 'Importance': importances})
    feat_df = feat_df.sort_values(by='Importance', ascending=False)

    plt.figure(figsize=(8, 5))
    sns.barplot(x='Importance', y='Feature', data=feat_df, palette='viridis')
    plt.title('Feature Importance - Random Forest')
    plt.tight_layout()
    plt.savefig('fertilizer_feature_importance.png')
    plt.close()

    # Print classification report
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

if __name__ == "__main__":
    train_model()
