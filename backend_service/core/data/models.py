import datetime
from dataclasses import dataclass

from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP, BOOLEAN

from core.data.database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    user_id = Column(Integer, ForeignKey(
        "users.id", ondelete="CASCADE"), nullable=False)

    owner = relationship("User")


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String(50), nullable=False)
    second_name = Column(String(80), nullable=False)
    first_line_address = Column(String(100), nullable=False)
    second_line_address = Column(String(100), nullable=False)
    city = Column(String(40), nullable=False)
    country_code = Column(String(3), nullable=False)
    post_code = Column(String(10), nullable=False)
    date_of_birth = Column(TIMESTAMP(timezone=True), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(15), nullable=False)
    registered_on = Column(TIMESTAMP(timezone=True), nullable=False, server_default='now()', default=datetime.datetime.utcnow())
    confirmed = Column(BOOLEAN, nullable=False, server_default='f', default=False)
    admin_flag = Column(BOOLEAN, nullable=False, server_default='f', default=False)


class Accommodation(Base):
    __tablename__ = "accomodation"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(300), nullable=False)
    address = Column(String(300), nullable=False)
    city = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    country_code = Column(String(3), nullable=False)
    post_code = Column(String(20), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False, unique=True)
    accom_type_id = Column(Integer, nullable=False)
    booking_url = Column(String(800), nullable=True)
    photo_url = Column(String(800), nullable=True)
    url = Column(String(800), nullable=True)
    date_added = Column(TIMESTAMP(timezone=True), nullable=False, server_default='now()', default=datetime.datetime.utcnow())
    date_updated = Column(TIMESTAMP(timezone=True), nullable=True)
    active = Column(BOOLEAN, nullable=False, server_default='t', default=True)

