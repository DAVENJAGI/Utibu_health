#!usr/bin/python3
"""This is a class containing the user  details"""
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
import models

class Disease(BaseModel, Base):
    """Represents user details"""

    if models.storage_type == 'db':
        __tablename__ = 'diseases'
        name = Column(String(128), nullable=False)
        description = Column(String(256), nullable=False)
        medication_id = Column(String(60), ForeignKey('medication.id'), nullable=False)
        medication = relationship("Medication", backref="diseases")
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
        user = relationship("User", backref="diseases")


    else:
        name = ""
        description = ""
        medication_id = ""
