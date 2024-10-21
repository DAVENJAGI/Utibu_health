#!usr/bin/python3
"""This is a class containing the department details"""
from models.base_model import BaseModel, Base
import models
from os import getenv
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Table, Boolean
from sqlalchemy.orm import relationship
from models.hospital import hospital_departments

class Department(BaseModel, Base):
    """Represents department details"""
    if models.storage_type == 'db':
        __tablename__ = 'departments'
        name = Column(String(128), nullable=False)
        description = Column(String(1024), nullable=False)
#        doctors =  relationship("Doctor", back_populates="departments", overlaps="doctors")
        hospitals = relationship("Hospital", secondary=hospital_departments, back_populates="departments")
