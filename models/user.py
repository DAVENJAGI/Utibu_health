#!usr/bin/python3
"""This is a class containing the user  details"""
from models.base_model import BaseModel, Base
import models
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """Represents user details"""
    if models.storage_type == 'db':
        __tablename__ = 'users'
        email = Column(String(128), unique=True, nullable=False)
        password = Column(String(128), nullable=False)
        first_name = Column(String(128), nullable=False)
        last_name = Column(String(128), nullable=False)
        date_of_birth = Column(String(128), nullable=False)
        doctor_id = Column(String(64), ForeignKey("doctors.id"), nullable=False)
        doctor = relationship("Doctor", backref="users")
        disease_id = Column(String(64), nullable=True)

    else:
        email = ""
        password = ""
        first_name = ""
        last_name = ""
        date_of_birth = ""
        disease_id = ""
        doctor_id = ""
