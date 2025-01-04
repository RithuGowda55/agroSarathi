from pymongo import MongoClient  
from config import Config  
  
def get_db():  
    # Connect to MongoDB using credentials from the config file  
    uri = Config.MONGO_URI  
    client = MongoClient(uri)  
    db = client[Config.DB_NAME]  # Database name is 'agrosarathi'  
    try:  
        # Check if the database connection is alive  
        db.command("ping")  
        print("DEBUG: Successfully connected to MongoDB")  
    except Exception as e:  
        print(f"DEBUG: MongoDB connection failed: {e}")  
    return db  