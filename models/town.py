#!/usr/bin/python3
""" holds class City"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Town(BaseModel, Base):
    """Representation of city """ 
    if models.storage_type == "db":
        __tablename__ = 'towns'
        county_id = Column(String(60), ForeignKey('counties.id'), nullable=False)
        name = Column(String(128), nullable=False)
        hospital = relationship("Hospital", backref="town")
    else:
        county_id = ""
        name = ""

    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)

