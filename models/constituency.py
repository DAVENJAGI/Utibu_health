#!/usr/bin/python3
""" holds class constituency"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Constituency(BaseModel, Base):
    """Representation of constituency class """ 
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

