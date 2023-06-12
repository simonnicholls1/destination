import datetime

from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP, BOOLEAN, ARRAY

from backend_service.core.data.database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
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
    registered_on = Column(TIMESTAMP(timezone=True), nullable=False, server_default='now()',
                           default=datetime.datetime.utcnow())
    confirmed = Column(BOOLEAN, nullable=False, server_default='f', default=False)
    admin_flag = Column(BOOLEAN, nullable=False, server_default='f', default=False)


class Accommodation(Base):
    __tablename__ = "accommodation"
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    name = Column(String(300), nullable=False)
    address = Column(String(300), nullable=False)
    city = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    country_code = Column(String(3), nullable=False)
    post_code = Column(String(20), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    accom_type_id = Column(Integer, nullable=False)
    booking_url = Column(String(800), nullable=True)
    photo_url = Column(String(800), nullable=True)
    url = Column(String(800), nullable=True)
    date_added = Column(TIMESTAMP(timezone=True), nullable=False, server_default='now()',
                        default=datetime.datetime.utcnow())
    date_updated = Column(TIMESTAMP(timezone=True), nullable=True)
    active = Column(BOOLEAN, nullable=False, server_default='t', default=True)


class AccommodationId(Base):
    __tablename__ = "accommodation_id"
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    name = Column(String(50), nullable=False)


class AccommodationIdMapping(Base):
    __tablename__ = "accommodation_id_mapping"
    accommodation_id = Column(Integer, ForeignKey(
        "accommodation.id", ondelete="CASCADE"), primary_key=True, nullable=False)
    external_id = Column(Integer, primary_key=True, nullable=False)
    external_id_type = Column(Integer, ForeignKey(
        "accommodation_type.type_id", ondelete="CASCADE"), primary_key=True, nullable=False)


class AccommodationSurfFilters(Base):
    __tablename__ = "accommodation_surf_filters"
    accommodation_id = Column(Integer, ForeignKey(
        "accommodation.id", ondelete="CASCADE"), primary_key=True, nullable=False)
    surf_lessons = Column(BOOLEAN, nullable=False, server_default='f', default=False)
    surf_rental = Column(BOOLEAN, nullable=False, server_default='f', default=False)
    yoga = Column(BOOLEAN, nullable=False, server_default='f', default=False)
    less_1km_surf = Column(BOOLEAN, nullable=False, server_default='f', default=False)
    co_working = Column(BOOLEAN, nullable=False, server_default='f', default=False)
    co2Compensated = Column(BOOLEAN, nullable=False, server_default='f', default=False)
    surfBreakAccess = Column(String(30), nullable=False)


class AccomodationType(Base):
    __tablename__ = "accommodation_type"
    type_id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    type = Column(String(30), nullable=False)


class Destination(Base):
    __tablename__ = "destination"
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    name = Column(String(30), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    date_added = Column(TIMESTAMP(timezone=True), nullable=False, server_default='now()',
                        default=datetime.datetime.utcnow())
    date_updated = Column(TIMESTAMP(timezone=True), nullable=True)
    active = Column(BOOLEAN, nullable=False, server_default='t', default=True)


class DestinationSurfDetails(Base):
    __tablename__ = "destination_surf_details"
    destination_id = Column(Integer, ForeignKey(
        "destination.id", ondelete="CASCADE"), primary_key=True, nullable=False)
    description = Column(String(500), nullable=False)
    beginner_months = Column(ARRAY(Integer), nullable=False)
    intermediate_months = Column(ARRAY(Integer), nullable=False)
    expert_months = Column(ARRAY(Integer), nullable=False)
    swell_colour = Column(ARRAY(String), nullable=False)
    water_temp = Column(ARRAY(String), nullable=False)
    weather = Column(ARRAY(String), nullable=False)


class Beach(Base):
    __tablename__ = "beach"
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    name = Column(String(30), nullable=False)
    destination_id = Column(Integer, ForeignKey(
        "destination.id", ondelete="CASCADE"), primary_key=True, nullable=False)
    address = Column(String(300), nullable=False)
    city = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    country_code = Column(String(3), nullable=False)
    post_code = Column(String(20), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    date_added = Column(TIMESTAMP(timezone=True), nullable=False, server_default='now()',
                        default=datetime.datetime.utcnow())
    date_updated = Column(TIMESTAMP(timezone=True), nullable=True)
    active = Column(BOOLEAN, nullable=False, server_default='t', default=True)


class Post(Base):
    __tablename__ = "post"
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id = Column(Integer, ForeignKey(
        "users.id", ondelete="CASCADE"), primary_key=True, nullable=False)
    title = Column(String(200), nullable=False)
    post_text = Column(String(500), nullable=False)
    image_url = Column(String(200), nullable=True)
    date_added = Column(TIMESTAMP(timezone=True), nullable=False, server_default='now()',
                        default=datetime.datetime.utcnow())
    date_updated = Column(TIMESTAMP(timezone=True), nullable=True)
