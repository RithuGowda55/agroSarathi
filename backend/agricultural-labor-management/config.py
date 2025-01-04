import os  
from dotenv import load_dotenv  
  
load_dotenv()  
  
class Config:  
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key_here')  
  
    MONGODB_USER = os.getenv('MONGODB_USER')  
    MONGODB_PASS = os.getenv('MONGODB_PASS')  
    MONGODB_CLUSTER_URL = os.getenv('MONGODB_CLUSTER_URL')  
  
    MONGO_URI = f"mongodb+srv://{MONGODB_USER}:{MONGODB_PASS}@{MONGODB_CLUSTER_URL}/?retryWrites=true&w=majority"  
  
    DB_NAME = os.getenv('DB_NAME', 'agrosarathi') 