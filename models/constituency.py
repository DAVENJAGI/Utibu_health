#!/usr/bin/python3
""" holds class City"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Constituency(BaseModel, Base):
    """Representation of city """ 
    if models.storage_type == "db":
        __tablename__ = 'constituencies'
        county_id = Column(String(60), ForeignKey('counties.id'), nullable=False)
        constituency_name = Column(String(128), nullable=False)
        wards = relationship("Town", backref="constituency")
    else:
        constituency_name =""
        county_id = ""

    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)

