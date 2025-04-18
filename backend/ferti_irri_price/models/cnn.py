import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import plot_model

# 1. Load your trained model
model = load_model('./plantdisease.keras')

# 2. Generate Dummy Image Data (assuming model expects 128x128 RGB images)
num_samples = 100
img_height, img_width, channels = 128, 128, 3

X_dummy = np.random.rand(num_samples, img_height, img_width, channels).astype(np.float32)

# 3. Make Predictions
y_pred = model.predict(X_dummy)

# 4. Plot Predictions
plt.figure(figsize=(8, 6))
plt.plot(y_pred, marker='o', linestyle='', label='Predicted Values')
plt.title('Predictions on Dummy Image Data')
plt.xlabel('Sample Index')
plt.ylabel('Predicted Output')
plt.legend()
plt.grid(True)
plt.show()

# 5. Optional: Visualize model architecture as an image
plot_model(model, show_shapes=True, to_file='model_architecture.png')
print("Model architecture saved as 'model_architecture.png'")
