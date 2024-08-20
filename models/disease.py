#!usr/bin/python3
"""This is a class containing the user  details"""
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship
import models


if models.storage_type == 'db':
    disease_meds = Table('disease_medication', Base.metadata,
                          Column('disease_id', String(60),
                                 ForeignKey('diseases.id'), nullable=False),
                          Column('medication_id', String(60),
                                 ForeignKey('medication.id'), nullable=False)
                         )


class Disease(BaseModel, Base):
    """Represents user details"""

    if models.storage_type == 'db':
        __tablename__ = 'diseases'
        name = Column(String(128), nullable=False)
        description = Column(String(256), nullable=False)
        medication_id = Column(String(60), ForeignKey('medication.id'), nullable=False)
        medication = relationship("Medication", secondary="disease_medication", backref="user_disease")
#        user = relationship("User", backref="user_disease")


    else:
        name = ""
        description = ""
        medication_id = ""
