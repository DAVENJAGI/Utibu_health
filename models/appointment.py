#!usr/bin/python3
"""This is a class containing the user  details"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from models.doctor import Doctor
from models.hospital import Hospital
from models.user import User


class Appointment(BaseModel, Base):
    """Represents user details"""
    if models.storage_type == "db":
        __tablename__ = 'appointment'
        description = Column(String(256), nullable=False)
        time = Column(String(128), nullable=False)
        date = Column(String(128), nullable=False)
        doctor_id = Column(String(60), ForeignKey('doctors.id'), nullable=False)
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
        hospital_id = Column(String(60), ForeignKey('hospitals.id'), nullable=False)

        user = relationship("User", backref="appointment") 
        doctor = relationship("Doctor", backref="appointment")
        hospital = relationship("Hospital", backref="appointment")

    else:
        doctor_id = ""
        hospital_id = ""
        user_id = ""
        description = ""
        time = ""
        date = ""
