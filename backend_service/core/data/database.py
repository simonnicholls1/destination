import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from backend_service.config import settings

import logging

logger = logging.getLogger(__name__)

SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}'
print('DB DETAILS:' + SQLALCHEMY_DATABASE_URL)
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db_sql_url():
    return SQLALCHEMY_DATABASE_URL

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
