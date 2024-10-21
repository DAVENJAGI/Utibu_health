#!usr/bin/python3
"""This is a class containing the medication details"""
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
import models

class Medication(BaseModel, Base):
    """Represents medication details"""
    if models.storage_type == "db":
        __tablename__ = 'medication'
        name = Column(String(128), nullable=False)
        description = Column(String(256), nullable=False)
        dosage = Column(String(128), nullable=False)
        in_stock = Column(String(128), nullable=False)       
        medication_price = Column(Integer, nullable=False)
    
    else:
        name = ""
        description = ""
        dosage = ""
        in_stock = bool
