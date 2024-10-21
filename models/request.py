#!usr/bin/python3
"""This is a class containing the request details
it is responsible for storing every single request 
object created apis
"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.schema import PrimaryKeyConstraint
from models.doctor import Doctor
from models.hospital import Hospital
from models.user import User
from models.medication import Medication


class Request(BaseModel, Base):
    """Represents server request details"""
    if models.storage_type == "db":
        __tablename__ = 'requests'
#        date_created = Column(DateTime, nullable=False, default=datetime.utcnow)
