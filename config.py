import os

class Config:
    SECRET_KEY = os.urandom(24)  # This generates a new random key each time the app starts
    DEBUG = True
    CACHE_TYPE = 'SimpleCache'
    CACHE_DEFAULT_TIMEOUT = 300