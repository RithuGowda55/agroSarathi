from pymongo import MongoClient  
from config import Config  
  
def get_db():  
    uri = Config.MONGO_URI  
    client = MongoClient(uri)  
    db = client[Config.DB_NAME]  
    try:  
        db.command("ping")  
        print("DEBUG: Successfully connected to MongoDB")  
    except Exception as e:  
        print(f"DEBUG: MongoDB connection failed: {e}")  
    return db  