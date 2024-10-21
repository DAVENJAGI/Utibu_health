#!usr/bin/python3
"""This is a class containing the doctor  details"""
from models.base_model import BaseModel, Base
import models
from os import getenv
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Table, Boolean
from sqlalchemy.orm import relationship



class Doctor(BaseModel, Base):
    """Represents doctor details"""
    if models.storage_type == 'db':
        __tablename__ = 'doctors'
        email = Column(String(128), unique=True, nullable=False)
        password = Column(String(128), nullable=False)
        first_name = Column(String(128), nullable=False)
        last_name = Column(String(128), nullable=False)
        license_no = Column(String(128), unique=True, nullable=False)
        availability_time = Column(String(128), nullable=True)
        hospital_id = Column(String(60), ForeignKey('hospitals.id', ondelete="CASCADE"), nullable=False)
        appointments = relationship("Appointment", backref="doctors")
        orders = relationship("Order", backref="doctors")
        patients =  relationship("User", back_populates="doctors", overlaps="users")
        status = Column(String(64), nullable=True)
        telephone_no = Column(String(13), nullable=True)
        specialization = Column(String(128), nullable=False)
        profile_bio = Column(String(256), nullable=True)
        certification = Column(String(256), nullable=True)
        availability = Column(Boolean, default=True)

  


    else:
        hospital_id = ""
        email = ""
        password = ""
        first_name = ""
        last_name = ""
        license_no = ""
        availability_time = ""
        users_id = ""
