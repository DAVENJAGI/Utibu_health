#!usr/bin/python3
"""This is a class containing the user  details"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Table
from sqlalchemy.orm import relationship


class Hospital(BaseModel, Base):
    """Represents user details"""
    if models.storage_type == 'db':
        __tablename__ = 'hospitals'
        town_id = Column(String(60), ForeignKey('wards.id'), nullable=False)
        email = Column(String(128), unique=True, nullable=False)
        name = Column(String(128), nullable=False)
        longitude = Column(Float, nullable=True)
        latitude = Column(Float, nullable=True)

    else:
        town_id = ""
        email = ""
        name = ""
        longitude = 0.0
        latitude = 0.0
