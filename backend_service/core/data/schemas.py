from pydantic import BaseModel, EmailStr
from datetime import datetime, date
from typing import List, Optional

from pydantic.types import conint


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None


class Confirmed(BaseModel):
    api_status: str
    confirmed: bool
    message: str


class PostBase(BaseModel):
    title: str
    content: str


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int

    created_at: datetime
    owner_id: int

    class Config:
        orm_mode = True


class UserOut(BaseModel):
    id: int
    email: EmailStr
    registered_on: datetime

    class Config:
        orm_mode = True


class UserCreated(BaseModel):
    user: UserOut
    confirmation_url: str
    token: Token


class UserReConfirm(BaseModel):
    email: str
    confirmation_url: str
    api_status: str
    message: str


class UserCreate(BaseModel):
    first_name: str
    second_name: str
    first_line_address: str
    second_line_address: str
    city: str
    country_code: str
    post_code: str
    date_of_birth: date
    email: EmailStr
    password: str


class PostOut(BaseModel):
    id: int
    title: str
    content: str
    owner: UserOut

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Accommodation(BaseModel):
    id: int
    name: str
    address: str
    city: str
    country: str
    country_code: str
    post_code: str
    latitude: float
    longitude: float
    accom_type_id: int
    booking_url: str
    photo_url: str
    url: str
    date_added: date
    date_updated: date
    active: bool


class AccommodationBooking(BaseModel):
    booking_id: int
    name: str
    address: str
    city: str
    country: str
    country_code: str
    post_code: str
    latitude: float
    longitude: float
    accom_type: int
    booking_url: str
    photo_url: str
    url: str
    booking_rating: float
    user_rating: float
