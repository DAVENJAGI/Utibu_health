#!usr/bin/python3
"""This is a class containing the user  details"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table, Integer, Float
from sqlalchemy.orm import relationship
from sqlalchemy.schema import PrimaryKeyConstraint
from models.user import User

class Reading(BaseModel, Base):
    """Represents patient reading details"""
    if models.storage_type == "db":
        __tablename__ = 'patient_vitals_readings'
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
        resting_heart_rate = Column(Integer, nullable=True, default=0)
        blood_sugar_level = Column(Float, nullable=True, default=0)
        systolic_blood_pressure = Column(Integer, nullable=True, default=0)
        diastolic_blood_pressure = Column(Integer, nullable=True, default=0)

