#!usr/bin/python3
"""This is a class containing the user  details"""
from models.base_model import BaseModel, Base
import models
from os import getenv
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Table
from sqlalchemy.orm import relationship



class Doctor(BaseModel, Base):
    """Represents user details"""
    if models.storage_type == 'db':
        __tablename__ = 'doctors'
        email = Column(String(128), unique=True, nullable=False)
        password = Column(String(128), nullable=False)
        first_name = Column(String(128), nullable=False)
        last_name = Column(String(128), nullable=False)
        license_no = Column(String(128), unique=True, nullable=False)
        availability_time = Column(String(128), nullable=True)
        hospital_id = Column(String(60), ForeignKey('hospitals.id', ondelete="CASCADE"), nullable=False)
        patients =  relationship("User", back_populates="doctors", overlaps="users")
  


    else:
        hospital_id = ""
        email = ""
        password = ""
        first_name = ""
        last_name = ""
        license_no = ""
        availability_time = ""
        users_id = ""
