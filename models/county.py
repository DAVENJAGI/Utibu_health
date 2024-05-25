#!/usr/bin/python3
""" holds class State"""
import models
from models.base_model import BaseModel, Base
from models.town import Town
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship


class County(BaseModel, Base):
    """Representation of state """
    
    if models.storage_type == "db":
        __tablename__ = 'counties'
        name = Column(String(128), unique=True, nullable=False)
        town = relationship("Town", backref="county")
        county_code = Column(String(64), unique=True, nullable=False)
    else:
        name = ""
        county_code = ""

    def __init__(self, *args, **kwargs):
        """initializes state"""
        super().__init__(*args, **kwargs)

    if models.storage_type != "db":
        @property
        def towns(self):
            """getter for list of city instances related to the state"""
            town_list = []
            all_towns = models.storage.all(Town)
            for town in all_towns.values():
                if town.county_id == self.id:
                    town_list.append(town)
            return town_list
