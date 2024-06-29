import os
from dotenv import load_dotenv

load_dotenv()

os.environ["MISTRAL_API_KEY"] = os.getenv("MISTRAL_API_KEY")
os.environ["PINECONE_API_KEY"] = os.getenv("PINECONE_API_KEY")
PINECONE_API_KEY_ACCOUNT_2 = os.getenv("PINECONE_API_KEY_ACCOUNT_2")
PINECONE_API_KEY_ASHU = os.getenv("PINECONE_API_KEY_ASHU")
os.environ["HF_TOKEN"] = os.getenv("HF_TOKEN")
MONGO_KEY = os.getenv("MONGO_CONNECTION_STRING")