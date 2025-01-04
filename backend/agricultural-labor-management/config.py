import os  
from dotenv import load_dotenv  
  
# Load environment variables from `.env` file  
load_dotenv()  
  
class Config:  
    # Flask secret key for session management  
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key_here')  
  
    # MongoDB environment variables  
    MONGODB_USER = os.getenv('MONGODB_USER')  
    MONGODB_PASS = os.getenv('MONGODB_PASS')  
    MONGODB_CLUSTER_URL = os.getenv('MONGODB_CLUSTER_URL')  
  
    # Full MongoDB connection URI  
    MONGO_URI = f"mongodb+srv://{MONGODB_USER}:{MONGODB_PASS}@{MONGODB_CLUSTER_URL}/?retryWrites=true&w=majority"  
  
    # Database Name  
    DB_NAME = os.getenv('DB_NAME', 'agrosarathi')  # Default database name is 'agrosarathi'  